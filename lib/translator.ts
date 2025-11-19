import translations from './translations/accessibility-ko.json';
import type { Violation, Translation } from './types';

export function translateViolation(violation: Violation): Violation & {
  koreanDescription?: string;
  koreanSolution?: string;
  wcag?: string;
  codeExample?: {
    before: string;
    after: string;
  };
} {
  const translation = translations[violation.id as keyof typeof translations] as Translation | undefined;

  return {
    ...violation,
    koreanDescription: translation?.description || violation.description,
    koreanSolution: translation?.solution || violation.help,
    wcag: translation?.wcag || '',
    codeExample: translation?.codeExample,
  };
}

export function translateViolations(violations: Violation[]) {
  return violations.map(translateViolation);
}