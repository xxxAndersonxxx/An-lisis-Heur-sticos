export interface HeuristicItem {
  id: number;
  numberStr: string; // "01", "02", ...
  titleSpanish: string;
  titleEnglish: string;
  summary: string;
  quote: string;
  realWorldAnalogy: string;
  keyQuestion: string;
  bestPractices: string[];
  commonViolations: string[];
  category: 'feedback' | 'language' | 'freedom' | 'standards' | 'prevention' | 'memory' | 'efficiency' | 'aesthetic' | 'recovery' | 'help';
  severityGuidelines: string;
}

export interface QuizQuestion {
  id: number;
  scenarioTitle: string;
  contextDescription: string;
  badUiSnippet: string;
  options: {
    heuristicId: number;
    title: string;
  }[];
  correctHeuristicId: number;
  explanation: string;
  recommendation: string;
}

export interface AuditRating {
  heuristicId: number;
  severity: 0 | 1 | 2 | 3 | 4; // 0=No issue, 1=Cosmetic, 2=Minor, 3=Major, 4=Catastrophe
  notes: string;
  recommendation: string;
}
