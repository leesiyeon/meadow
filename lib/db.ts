import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';
import type { AnalysisResult, Violation } from './types';

// PostgreSQL 연결 풀
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/accesscheck',
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }
  return pool;
}

// 테이블 초기화
export async function initDatabase() {
  const client = getPool();

  await client.query(`
    CREATE TABLE IF NOT EXISTS analyses (
      id VARCHAR(255) PRIMARY KEY,
      url TEXT NOT NULL,
      score INTEGER NOT NULL,
      total_issues INTEGER NOT NULL,
      violations JSONB NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 24시간 이상 된 레코드 자동 삭제를 위한 인덱스
  await client.query(`
    CREATE INDEX IF NOT EXISTS idx_analyses_created_at
    ON analyses(created_at)
  `);
}

// 분석 결과 저장
export async function saveAnalysis(
  url: string,
  score: number,
  totalIssues: number,
  violations: Violation[]
): Promise<string> {
  const client = getPool();
  const id = uuidv4();

  await client.query(
    `INSERT INTO analyses (id, url, score, total_issues, violations, created_at)
     VALUES ($1, $2, $3, $4, $5, NOW())`,
    [id, url, score, totalIssues, JSON.stringify(violations)]
  );

  return id;
}

// 분석 결과 조회
export async function getAnalysis(id: string): Promise<AnalysisResult | null> {
  const client = getPool();

  const result = await client.query(
    'SELECT * FROM analyses WHERE id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];
  return {
    id: row.id,
    url: row.url,
    score: row.score,
    totalIssues: row.total_issues,
    violations: row.violations,
    createdAt: row.created_at,
  };
}

// 24시간 이상 된 레코드 삭제
export async function cleanupOldAnalyses() {
  const client = getPool();

  await client.query(
    `DELETE FROM analyses WHERE created_at < NOW() - INTERVAL '24 hours'`
  );
}

// Rate limiting을 위한 IP별 요청 카운트
export async function checkRateLimit(ip: string): Promise<boolean> {
  const client = getPool();

  // rate_limits 테이블이 없으면 생성
  await client.query(`
    CREATE TABLE IF NOT EXISTS rate_limits (
      ip VARCHAR(45) PRIMARY KEY,
      request_count INTEGER NOT NULL,
      window_start TIMESTAMP NOT NULL
    )
  `);

  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10', 10);
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '3600000', 10);

  const result = await client.query(
    'SELECT request_count, window_start FROM rate_limits WHERE ip = $1',
    [ip]
  );

  if (result.rows.length === 0) {
    // 처음 요청하는 IP
    await client.query(
      'INSERT INTO rate_limits (ip, request_count, window_start) VALUES ($1, 1, NOW())',
      [ip]
    );
    return true;
  }

  const { request_count, window_start } = result.rows[0];
  const windowAge = Date.now() - new Date(window_start).getTime();

  if (windowAge > windowMs) {
    // 새로운 윈도우 시작
    await client.query(
      'UPDATE rate_limits SET request_count = 1, window_start = NOW() WHERE ip = $1',
      [ip]
    );
    return true;
  }

  if (request_count >= maxRequests) {
    return false;
  }

  // 카운트 증가
  await client.query(
    'UPDATE rate_limits SET request_count = request_count + 1 WHERE ip = $1',
    [ip]
  );
  return true;
}
