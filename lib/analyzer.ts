import { chromium } from 'playwright-core';
import chromiumPkg from '@sparticuz/chromium';
import * as axe from 'axe-core';
import * as fs from 'fs';
import * as path from 'path';
import type { Violation } from './types';

export async function analyzeUrl(url: string): Promise<{
  violations: Violation[];
  screenshot: string;
  elementPositions: Array<{
    violationIndex: number;
    nodeIndex: number;
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
}> {
  // URL 유효성 검증
  try {
    new URL(url);
  } catch (error) {
    throw new Error('유효하지 않은 URL입니다');
  }

  // Serverless 환경 감지 (Vercel 또는 AWS Amplify)
  const isVercel = process.env.VERCEL === '1';
  const isAmplify = !!process.env.AWS_EXECUTION_ENV || !!process.env.AWS_REGION;
  const isProduction = isVercel || isAmplify;

  const browser = await chromium.launch({
    args: isVercel ? chromiumPkg.args : isAmplify ? [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--single-process',
    ] : [],
    executablePath: isVercel
      ? await chromiumPkg.executablePath()
      : undefined,
    headless: true,
  });

  try {
    const page = await browser.newPage();

    // 60초 타임아웃 설정 (전체 페이지 스크린샷은 시간이 오래 걸림)
    page.setDefaultTimeout(60000);

    // 페이지 로드
    await page.goto(url, {
      waitUntil: 'domcontentloaded', // networkidle 대신 domcontentloaded 사용 (더 빠름)
      timeout: 60000
    });

    // axe-core 스크립트 주입
    if (isProduction) {
      // Vercel 환경에서는 CDN 사용
      await page.addScriptTag({
        url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.0/axe.min.js'
      });
    } else {
      // 로컬 개발 환경에서는 파일에서 직접 로드
      const axePath = path.join(process.cwd(), 'node_modules', 'axe-core', 'axe.min.js');
      const axeSource = fs.readFileSync(axePath, 'utf8');
      await page.addScriptTag({ content: axeSource });
    }

    // 접근성 분석 실행
    const results = await page.evaluate(() => {
      return (window as any).axe.run({
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
        }
      });
    });

    // 문제 요소에 하이라이트 추가 및 위치 정보 수집
    const elementPositions = await page.evaluate((violations) => {
      const style = document.createElement('style');
      style.textContent = `
        .axe-violation-highlight {
          outline: 2px solid #ef4444 !important;
          outline-offset: 2px !important;
          position: relative !important;
          box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.15) !important;
        }
        .axe-violation-label {
          position: absolute !important;
          top: -8px !important;
          left: -8px !important;
          background: #ef4444 !important;
          color: white !important;
          padding: 2px 6px !important;
          border-radius: 9999px !important;
          font-size: 10px !important;
          font-weight: bold !important;
          z-index: 999999 !important;
          font-family: system-ui, -apple-system, sans-serif !important;
          line-height: 1.2 !important;
          min-width: 18px !important;
          text-align: center !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;
        }
      `;
      document.head.appendChild(style);

      const positions: any[] = [];

      violations.forEach((violation: any, violationIndex: number) => {
        violation.nodes.forEach((node: any, nodeIndex: number) => {
          try {
            const selector = node.target.join(', ');
            const elements = document.querySelectorAll(selector);
            elements.forEach((element: any, elemIndex: number) => {
              element.classList.add('axe-violation-highlight');

              // 라벨 추가 (첫 번째 요소만)
              if (elemIndex === 0) {
                const label = document.createElement('div');
                label.className = 'axe-violation-label';
                label.textContent = `${violationIndex + 1}-${nodeIndex + 1}`;

                // 부모가 relative가 아니면 relative로 설정
                const parent = element.parentElement;
                if (parent && getComputedStyle(parent).position === 'static') {
                  parent.style.position = 'relative';
                }

                element.style.position = 'relative';
                element.appendChild(label);

                // 라벨의 위치 정보 즉시 수집 (setTimeout 제거)
                const rect = label.getBoundingClientRect();
                positions.push({
                  violationIndex,
                  nodeIndex,
                  x: rect.left + window.scrollX,
                  y: rect.top + window.scrollY,
                  width: rect.width,
                  height: rect.height,
                });
              }
            });
          } catch (e) {
            console.log('Failed to highlight element:', node.target);
          }
        });
      });

      return positions;
    }, results.violations);

    // 하이라이트가 적용된 전체 페이지 스크린샷 캡처
    const screenshotBuffer = await page.screenshot({
      type: 'jpeg',
      quality: 50, // 품질 낮춤 (파일 크기 최적화 및 속도 개선)
      fullPage: true, // 전체 페이지 캡처 (스크롤 포함)
    });
    const screenshot = `data:image/jpeg;base64,${screenshotBuffer.toString('base64')}`;

    // violations를 우리 타입으로 변환 (개별 요소 스크린샷 제거로 성능 개선)
    const violations: Violation[] = results.violations.map((v: any) => ({
      id: v.id,
      impact: v.impact || 'minor',
      description: v.description,
      help: v.help,
      helpUrl: v.helpUrl,
      tags: v.tags,
      nodes: v.nodes.map((node: any) => ({
        html: node.html,
        target: node.target,
        failureSummary: node.failureSummary,
        // 개별 요소 스크린샷 제거 (성능 개선)
      }))
    }));

    await browser.close();

    return { violations, screenshot, elementPositions: elementPositions as any };
  } catch (error) {
    await browser.close();
    throw error;
  }
}