
import { ProductData } from './types';

// Series Colors
const COLORS = {
  CHRONOLOGISTE: '#1a1a1a', // Black
  GENESIS: '#f4a6b6', // Pink
  BLOND_ABSOLU: '#bfaee3', // Purple
  RESISTANCE: '#4aa096', // Green/Teal
  NUTRITIVE: '#f28b50', // Orange/White
  OLEO_RELAX: '#ff7f50', // Bright Orange
  FLUIDEALISTE: '#fbcce7', // Light Pink
  DENSIFIQUE: '#d4c4a8', // Beige/Gold
  SPECIFIQUE: '#9cd6ce', // Light Green
  CHROMA_ABSOLU: '#e06b83', // Rose
  PREMIERE: '#dcdcdc', // Silver (Accent Red)
  ELIXIR: '#eeb846', // Gold
  STYLING: '#555555',
};

export const KERASTASE_PRODUCTS: ProductData[] = [
  // --- DAMAGE CARE (RESISTANCE / FORCE / EXTENTIONISTE / THERAPISTE) ---
  { category: "ダメージケア", line: "FORCE", name: "バン ド フォルス N", size: "250mL", description: "弱くなった髪を補修し、健康的な髪へ", type: 'shampoo', color: COLORS.RESISTANCE },
  { category: "ダメージケア", line: "FORCE", name: "ソワン ド フォルス N", size: "200g", description: "弱くなった髪を補修し、指どおりのよいなめらかな髪へ", type: 'treatment-tube', color: COLORS.RESISTANCE },
  { category: "ダメージケア", line: "FORCE", name: "マスク ド フォルス", size: "200g", description: "弱くなった髪を補修し、しなやかで健康的な髪へ", type: 'treatment-jar', color: COLORS.RESISTANCE },
  { category: "ダメージケア", line: "FORCE", name: "シモン テルミック", size: "150g", description: "ドライヤー等の熱の力を利用し、髪を補修", type: 'treatment-tube', color: COLORS.RESISTANCE },
  
  { category: "ダメージケア", line: "EXTENTIONISTE", name: "バン エクステンショニスト", size: "250mL", description: "傷んだ髪を補強・補修。頭皮をやわらかく", type: 'shampoo', color: COLORS.RESISTANCE },
  { category: "ダメージケア", line: "EXTENTIONISTE", name: "フォンダン エクステンショニスト", size: "200mL", description: "傷んだ髪を補強・補修。毛先までなめらかな質感へ", type: 'treatment-tube', color: COLORS.RESISTANCE },
  { category: "ダメージケア", line: "EXTENTIONISTE", name: "マスク エクステンショニスト", size: "200mL", description: "傷んだ髪を補強・補修。ノーシャンプー設計", type: 'treatment-jar', color: COLORS.RESISTANCE },
  { category: "ダメージケア", line: "EXTENTIONISTE", name: "エクステンショニスト テルミック", size: "150g", description: "枝毛や切れ毛の気になる髪を補修", type: 'treatment-tube', color: COLORS.RESISTANCE },
  { category: "ダメージケア", line: "EXTENTIONISTE", name: "セラム エクステンショニスト", size: "50mL", description: "頭皮と髪を補強・補修するスカルプ＆ヘアセラム", type: 'oil', color: COLORS.RESISTANCE },

  { category: "ダメージケア", line: "THÉRAPISTE", name: "バン セラピュート", size: "250mL", description: "傷ついた髪を補修し、やさしく包み込む", type: 'shampoo', color: COLORS.RESISTANCE },
  { category: "ダメージケア", line: "THÉRAPISTE", name: "マスク セラピュート", size: "200g", description: "傷ついた髪を補修し、しなやかで艶のあるなめらかな髪へ", type: 'treatment-jar', color: COLORS.RESISTANCE },
  { category: "ダメージケア", line: "THÉRAPISTE", name: "セラム セラピュート", size: "30mL", description: "毛先用洗い流さないヘアトリートメント", type: 'oil', color: COLORS.RESISTANCE },

  // --- AGING CARE (CHRONOLOGISTE) ---
  { category: "エイジングケア", line: "CHRONOLOGISTE", name: "バン クロノロジスト R", size: "250mL", description: "頭皮・毛髪をケアし健康的な印象の美しいツヤを与える", type: 'shampoo', color: COLORS.CHRONOLOGISTE },
  { category: "エイジングケア", line: "CHRONOLOGISTE", name: "マスク クロノロジスト R", size: "200mL", description: "眠っている髪の美しさを引き出す", type: 'treatment-jar', color: COLORS.CHRONOLOGISTE },
  { category: "エイジングケア", line: "CHRONOLOGISTE", name: "ユイル クロノロジスト N", size: "100mL", description: "美髪の最高峰。全方位ケアで、時を超えてさらなる美の高みへ", type: 'oil', color: COLORS.CHRONOLOGISTE },
  { category: "エイジングケア", line: "CHRONOLOGISTE", name: "クロノロジスト テルミック", size: "150mL", description: "健康的な印象で素髪のような質感へ導く", type: 'oil', color: COLORS.CHRONOLOGISTE },

  // --- WEAK HAIR / FALL (GENESIS) ---
  { category: "弱り髪ケア", line: "GENESIS", name: "バン イドラ フォーティファイ", size: "250mL", description: "弱くなった髪を補修し、健康的な髪へ", type: 'shampoo', color: COLORS.GENESIS },
  { category: "弱り髪ケア", line: "GENESIS", name: "バン ニュートリ フォーティファイ", size: "250mL", description: "傷んだ髪を補強・補修。頭皮をやわらかく", type: 'shampoo', color: COLORS.GENESIS },
  { category: "弱り髪ケア", line: "GENESIS", name: "フォンダン リインフォーサー", size: "200mL", description: "傷んだ髪を補強・補修。美しい髪へ", type: 'treatment-tube', color: COLORS.GENESIS },
  { category: "弱り髪ケア", line: "GENESIS", name: "マスク リコンスティチュアント", size: "200mL", description: "うるおいあるやわらかな頭皮に導く", type: 'treatment-jar', color: COLORS.GENESIS },
  { category: "弱り髪ケア", line: "GENESIS", name: "セラム フォーティファイ", size: "90mL", description: "頭皮に活力感を与え健やかに導く", type: 'oil', color: COLORS.GENESIS },
  { category: "弱り髪ケア", line: "GENESIS", name: "ディフェンス テルミック", size: "150mL", description: "熱から髪を守り、サラサラでツヤのある髪へ", type: 'spray', color: COLORS.GENESIS },

  // --- VOLUME / DENSITY (DENSIFIQUE) ---
  { category: "エイジングケア", line: "DENSIFIQUE", name: "バン デンシフィック", size: "250mL", description: "うるおいを保ち、弾力のあるしなやかな質感へ", type: 'shampoo', color: COLORS.DENSIFIQUE },
  { category: "エイジングケア", line: "DENSIFIQUE", name: "フォンダン デンシフィック", size: "200g", description: "ハリ・コシ、軽いボリューム感", type: 'treatment-tube', color: COLORS.DENSIFIQUE },
  { category: "エイジングケア", line: "DENSIFIQUE", name: "マスク デンシフィック", size: "200g", description: "髪に密度感を与え、しなやかな質感へ", type: 'treatment-jar', color: COLORS.DENSIFIQUE },
  { category: "エイジングケア", line: "DENSIFIQUE", name: "ムース デンシフィック", size: "150g", description: "スタイル自在でなめらかな質感へ導く", type: 'mousse', color: COLORS.DENSIFIQUE },

  // --- SCALP CARE (SPECIFIQUE) ---
  { category: "スカルプケア", line: "SPÉCIFIQUE", name: "バン ディバレント R", size: "250mL", description: "頭皮をケアしすっきりと洗い上げる", type: 'shampoo', color: COLORS.SPECIFIQUE },
  { category: "スカルプケア", line: "SPÉCIFIQUE", name: "クレイ ディバレント", size: "250mL", description: "頭皮のディープクレンジング", type: 'treatment-jar', color: COLORS.SPECIFIQUE },
  { category: "スカルプケア", line: "SPÉCIFIQUE", name: "マスク リイドラタント", size: "200mL", description: "頭皮と髪を保湿しツヤのある軽やかな質感へ", type: 'treatment-jar', color: COLORS.SPECIFIQUE },
  { category: "スカルプケア", line: "SPÉCIFIQUE", name: "セラム ポテンシャリスト", size: "90mL", description: "バランスを崩しがちな頭皮に。美肌菌に着想", type: 'oil', color: COLORS.SPECIFIQUE },

  // --- DRY HAIR (NUTRITIVE) ---
  { category: "パサつきケア", line: "NUTRITIVE", name: "バン サテン R", size: "250mL", description: "軽い仕上がりに導くモイスチャーシャンプー", type: 'shampoo', color: COLORS.NUTRITIVE },
  { category: "パサつきケア", line: "NUTRITIVE", name: "バン サテン リッシュ", size: "250mL", description: "しっとりとした仕上がりに導く", type: 'shampoo', color: COLORS.NUTRITIVE },
  { category: "パサつきケア", line: "NUTRITIVE", name: "レ ヴィタル R", size: "200mL", description: "保湿感を与え指通りのよい髪へ導く", type: 'treatment-tube', color: COLORS.NUTRITIVE },
  { category: "パサつきケア", line: "NUTRITIVE", name: "マスク アンタンス リッシュ", size: "200mL", description: "保湿感を与え指通りのよい髪に導く", type: 'treatment-jar', color: COLORS.NUTRITIVE },
  { category: "パサつきケア", line: "NUTRITIVE", name: "ネクター テルミック R", size: "150mL", description: "ヒートプロテクション設計。保湿感と指通り", type: 'treatment-tube', color: COLORS.NUTRITIVE },
  { category: "パサつきケア", line: "NUTRITIVE", name: "マジック ナイト セラム R", size: "90mL", description: "夜用ヘア美容液。なめらかでまとまりのある髪へ", type: 'oil', color: COLORS.NUTRITIVE },

  // --- FRIZZY HAIR (OLEO RELAX / FLUIDEALISTE) ---
  { category: "くせ毛ケア", line: "OLÉO-RELAX", name: "バン オレオ リラックス", size: "250mL", description: "くせを抑え、絡まりにくくやわらかな髪へ", type: 'shampoo', color: COLORS.OLEO_RELAX },
  { category: "くせ毛ケア", line: "OLÉO-RELAX", name: "マスク オレオ リラックス", size: "200mL", description: "くせ毛の不均一性に着目。まとまる髪へ", type: 'treatment-jar', color: COLORS.OLEO_RELAX },
  { category: "くせ毛ケア", line: "OLÉO-RELAX", name: "フルイド オレオリラックス R", size: "100mL", description: "湿度80%でも24時間くせ広がらない", type: 'oil', color: COLORS.OLEO_RELAX },
  
  { category: "くせ毛ケア", line: "FLUIDEALISTE", name: "バン フルイダリスト 1", size: "250mL", description: "絡みやもつれを防ぎ、なめらかで柔らかい髪へ", type: 'shampoo', color: COLORS.FLUIDEALISTE },
  { category: "くせ毛ケア", line: "FLUIDEALISTE", name: "フォンダン フルイダリスト", size: "200g", description: "髪表面を均一に整え、なめらかでまとまりのある仕上がりへ", type: 'treatment-tube', color: COLORS.FLUIDEALISTE },
  { category: "くせ毛ケア", line: "FLUIDEALISTE", name: "フルイディシーム", size: "150mL", description: "髪表面を均一に整え、なめらかで弾む動きのある髪へ", type: 'spray', color: COLORS.FLUIDEALISTE },

  // --- COLOR CARE (CHROMA ABSOLU) ---
  { category: "カラーケア", line: "CHROMA ABSOLU", name: "バン クロマ プロテクト", size: "250mL", description: "カラーヘアを補修しツヤ、ハリコシを与え軽やかな質感へ", type: 'shampoo', color: COLORS.CHROMA_ABSOLU },
  { category: "カラーケア", line: "CHROMA ABSOLU", name: "バンリッシュ クロマ プロテクト", size: "250mL", description: "カラーヘアを補修しツヤ、ハリコシを与えまとまりのある質感へ", type: 'shampoo', color: COLORS.CHROMA_ABSOLU },
  { category: "カラーケア", line: "CHROMA ABSOLU", name: "フォンダン シカクロマ", size: "200mL", description: "カラーヘアの内部を補修、保湿しなめらかな質感へ", type: 'treatment-tube', color: COLORS.CHROMA_ABSOLU },
  { category: "カラーケア", line: "CHROMA ABSOLU", name: "マスク クロマ フィラー", size: "200mL", description: "カラーヘアを補修、コーティングし艶やかな髪へ", type: 'treatment-jar', color: COLORS.CHROMA_ABSOLU },
  { category: "カラーケア", line: "CHROMA ABSOLU", name: "ソワン クロマ グロス", size: "210mL", description: "カラーヘアの内部を補修、保湿しまとまりのある質感へ", type: 'oil', color: COLORS.CHROMA_ABSOLU },

  // --- BLOND CARE (BLOND ABSOLU) ---
  { category: "ハイトーン", line: "BLOND ABSOLU", name: "バン ルミエール", size: "250mL", description: "ハイトーンカラーヘアを補修し、軽さと潤いを与える", type: 'shampoo', color: COLORS.BLOND_ABSOLU },
  { category: "ハイトーン", line: "BLOND ABSOLU", name: "バン ブロンドアブソリュ", size: "250mL", description: "ハイトーンカラーヘアの黄味・オレンジ味を補正", type: 'shampoo', color: COLORS.BLOND_ABSOLU },
  { category: "ハイトーン", line: "BLOND ABSOLU", name: "ソワン シカフラッシュ", size: "250mL", description: "ハイトーンカラーヘアを補修し、軽さを与える", type: 'treatment-tube', color: COLORS.BLOND_ABSOLU },
  { category: "ハイトーン", line: "BLOND ABSOLU", name: "ユイル シカエクストリーム R", size: "100mL", description: "ブリーチ後の髪を寝ている間に補修", type: 'oil', color: COLORS.BLOND_ABSOLU },

  // --- REPAIR (PREMIERE) ---
  { category: "ダメージケア", line: "PREMIÉRE", name: "バン デカルシファイ", size: "250mL", description: "髪をやさしい感触で洗い上げる成分を採用", type: 'shampoo', color: COLORS.PREMIERE },
  { category: "ダメージケア", line: "PREMIÉRE", name: "フォンダン フルイド リペア", size: "200mL", description: "髪の表面をケアし切れ毛を防ぐ", type: 'treatment-tube', color: COLORS.PREMIERE },
  { category: "ダメージケア", line: "PREMIÉRE", name: "ユイル ルミエール リペア", size: "30mL", description: "輝きを失ったダメージヘアにツヤを", type: 'oil', color: COLORS.PREMIERE },

  // --- OIL (ELIXIR) ---
  { category: "艶ケア", line: "HUILE SUBLIME", name: "ユイル スブリム R", size: "100mL", description: "見とれるような輝き続く、贅沢な艶髪へ", type: 'oil', color: COLORS.ELIXIR }
];
