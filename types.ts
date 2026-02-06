
export enum QuizStep {
  START = 'START',
  HAIR_TYPE = 'HAIR_TYPE',
  SCALP_CONDITION = 'SCALP_CONDITION',
  MAIN_CONCERN = 'MAIN_CONCERN',
  LIFESTYLE = 'LIFESTYLE',
  LOADING = 'LOADING',
  RESULTS = 'RESULTS'
}

export interface UserProfile {
  hairType: string;
  scalpCondition: string;
  mainConcern: string;
  lifestyle: string;
}

export interface ProductRecommendation {
  name: string;
  line: string;
  description: string;
  howToUse: string;
  imageHint: string;
}

export interface DiagnosisResult {
  summary: string;
  onePointAdvice: string;
  products: ProductRecommendation[];
}
