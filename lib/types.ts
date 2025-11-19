export interface AnalysisNode {
  html: string;
  target: string[];
  failureSummary?: string;
  screenshot?: string; // base64 encoded screenshot of the element
}

export interface Violation {
  id: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
  description: string;
  help: string;
  helpUrl: string;
  tags: string[];
  nodes: AnalysisNode[];
}

export interface AnalysisResult {
  id: string;
  url: string;
  score: number;
  totalIssues: number;
  violations: Violation[];
  screenshot?: string; // base64 encoded screenshot
  createdAt: Date;
}

export interface Translation {
  description: string;
  solution: string;
  wcag: string;
  codeExample?: {
    before: string;
    after: string;
  };
}