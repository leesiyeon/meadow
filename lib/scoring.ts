import type { Violation } from './types';

const IMPACT_WEIGHTS = {
  critical: 10,
  serious: 5,
  moderate: 3,
  minor: 1,
};

export function calculateScore(violations: Violation[]): number {
  let penalty = 0;

  violations.forEach((violation) => {
    const weight = IMPACT_WEIGHTS[violation.impact] || 1;
    penalty += weight * violation.nodes.length;
  });

  // 로그 스케일 적용: penalty가 커질수록 점수 감소폭이 줄어듦
  // 페널티가 0이면 100점, 50이면 약 37점, 100이면 약 14점
  const score = Math.round(100 * Math.exp(-penalty / 50));
  return Math.max(0, Math.min(100, score));
}

export function getTotalIssues(violations: Violation[]): number {
  return violations.reduce((total, v) => total + v.nodes.length, 0);
}

export function getIssuesByImpact(violations: Violation[]) {
  const counts = {
    critical: 0,
    serious: 0,
    moderate: 0,
    minor: 0,
  };

  violations.forEach((violation) => {
    counts[violation.impact] += violation.nodes.length;
  });

  return counts;
}