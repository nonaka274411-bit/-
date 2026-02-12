
export enum QuizStep {
  START = 'START',
  Q1_HAIR_TYPE = 'Q1_HAIR_TYPE',       // 髪質（太さ・硬さ）
  Q2_SCALP_TYPE = 'Q2_SCALP_TYPE',     // 頭皮の状態
  Q3_FRIZZ_WAVE = 'Q3_FRIZZ_WAVE',     // くせ・広がり
  Q4_DAMAGE_LEVEL = 'Q4_DAMAGE_LEVEL', // ダメージレベル
  Q5_AGING_CARE = 'Q5_AGING_CARE',     // エイジング悩み
  Q6_IDEAL_FINISH = 'Q6_IDEAL_FINISH', // 理想の仕上がり
  Q7_PRIORITY = 'Q7_PRIORITY',         // 最優先したいケア
  LOADING = 'LOADING',
  RESULTS = 'RESULTS'
}

export interface UserProfile {
  hairType: string;
  scalpType: string;
  frizzWave: string;
  damageLevel: string;
  agingCare: string;
  idealFinish: string;
  carePriority: string;
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

export type ProductType = 'shampoo' | 'treatment-jar' | 'treatment-tube' | 'oil' | 'spray';

export interface ProductData {
  category: string;
  line: string;
  name: string;
  size: string;
  description: string;
  type: ProductType; // アイコン形状決定用
  color: string;     // アイコン色決定用
}
