import { NextRequest, NextResponse } from 'next/server';
import { analyzeUrl } from '@/lib/analyzer';
import { calculateScore, getTotalIssues } from '@/lib/scoring';
import { translateViolations } from '@/lib/translator';

export async function POST(request: NextRequest) {
  try {
    // 요청 파싱
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL이 필요합니다.' },
        { status: 400 }
      );
    }

    // URL 유효성 검증
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: '유효하지 않은 URL입니다.' },
        { status: 400 }
      );
    }

    // 접근성 분석 실행
    const { violations, screenshot, elementPositions } = await analyzeUrl(url);

    // 한국어 번역 적용
    const translatedViolations = translateViolations(violations);

    // 점수 계산
    const score = calculateScore(violations);
    const totalIssues = getTotalIssues(violations);

    // 결과 직접 반환 (데이터베이스 저장 안함)
    return NextResponse.json({
      url,
      score,
      totalIssues,
      violations: translatedViolations,
      screenshot,
      elementPositions,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '분석 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
