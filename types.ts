
export enum AppState {
  IDLE,
  ANALYZING,
  ANALYSIS_FAILED,
  PROCESSING,
  SUCCESS,
  ERROR,
}

export enum ClothingOption {
  NONE = 'none',
  SUIT = 'suit',
  SHIRT = 'shirt',
}

export enum Country {
  USA = 'USA',
  Schengen = 'Schengen',
  Canada = 'Canada',
  China = 'China',
  UK = 'UK',
  India = 'India',
  Japan = 'Japan',
}

export enum BackgroundColor {
  OffWhite = 'OffWhite',
  LightBlue = 'LightBlue',
  LightGray = 'LightGray',
}

export interface AnalysisIssue {
    issueType: string;
    recommendation: string;
}

export interface AnalysisFeedback {
    isAcceptable: boolean;
    issues: AnalysisIssue[];
}