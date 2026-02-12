
export enum QuizStep {
  START = 'START',
  HAIR_TYPE = 'HAIR_TYPE',
  HAIR_VOLUME = 'HAIR_VOLUME',
  SCALP_CONDITION = 'SCALP_CONDITION',
  HAIR_HISTORY = 'HAIR_HISTORY',
  MAIN_CONCERN = 'MAIN_CONCERN',
  AGE_GROUP = 'AGE_GROUP',
  DESIRED_FINISH = 'DESIRED_FINISH',
  LIFESTYLE = 'LIFESTYLE',
  LOADING = 'LOADING',
  RESULTS = 'RESULTS'
}

export interface UserProfile {
  hairType: string;
  hairVolume: string;
  scalpCondition: string;
  hairHistory: string;
  mainConcern: string;
  ageGroup: string;
  desiredFinish: string;
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

export interface ProductData {
  category: string;
  line: string;
  name: string;
  size: string;
  description: string;
  image: string;
}

export type ProductType = 'shampoo' | 'treatment-jar' | 'treatment-tube' | 'oil' | 'spray';
