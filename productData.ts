
import { ProductData, ProductType } from './types';

// ラインごとのテーマカラー定義
const LINE_COLORS: Record<string, string> = {
  "CHRONOLOGISTE": "#111111", // 黒
  "GENESIS": "#F472B6", // ピンク
  "BLOND ABSOLU": "#A78BFA", // 紫
  "FORCE": "#4ADE80", // ライトグリーン
  "EXTENTIONISTE": "#059669", // 濃いグリーン
  "THÉRAPISTE": "#047857", // 深緑
  "NUTRITIVE": "#FDBA74", // オレンジホワイト
  "OLÉO-RELAX": "#F97316", // 濃いオレンジ
  "FLUIDEALISTE": "#FCA5A5", // サーモンピンク
  "SPÉCIFIQUE": "#9CA3AF", // シルバー/グレー
  "DENSIFIQUE": "#EAB308", // ゴールドベージュ
  "PREMIÉRE": "#E5E7EB", // シルバーホワイト
  "CHROMA ABSOLU": "#FB7185", // ローズピンク
  "HUILE SUBLIME": "#FACC15", // イエローゴールド
};

// 商品名からボトルタイプを判定するヘルパー
const determineType = (name: string): ProductType => {
  if (name.includes("バン")) return 'shampoo';
  if (name.includes("マスク")) return 'treatment-jar';
  if (name.includes("フォンダン") || name.includes("レ ヴィタル") || name.includes("ソワン") || name.includes("テルミック")) return 'treatment-tube';
  if (name.includes("ユイル") || name.includes("セラム")) return 'oil';
  if (name.includes("ムース") || name.includes("フルイディシーム")) return 'spray';
  return 'shampoo'; // デフォルト
};

// ライン名から色を判定するヘルパー
const determineColor = (line: string): string => {
  // ライン名の一部が含まれていればその色を返す
  for (const key of Object.keys(LINE_COLORS)) {
    if (line.includes(key.split(' ')[0])) { // "CHROMA ABSOLU" -> "CHROMA"で判定
      return LINE_COLORS[key];
    }
  }
  return "#333333"; // デフォルト黒
};

// 生データ（画像URLなし）
const RAW_PRODUCTS = [
  // --- DAMAGE CARE ---
  { category: "ダメージケア", line: "FORCE (フォルス)", name: "バン ド フォルス N", size: "250mL", description: "弱くなった髪を補修し、健康的な髪へ" },
  { category: "ダメージケア", line: "FORCE (フォルス)", name: "ソワン ド フォルス N", size: "200g", description: "弱くなった髪を補修し、指どおりのよいなめらかな髪へ" },
  { category: "ダメージケア", line: "FORCE (フォルス)", name: "マスク ド フォルス", size: "200g", description: "弱くなった髪を補修し、しなやかで健康的な髪へ" },
  { category: "ダメージケア", line: "FORCE (フォルス)", name: "シモン テルミック", size: "150g", description: "ドライヤー等の熱の力を利用し、髪を補修" },
  
  { category: "ダメージケア", line: "EXTENTIONISTE (エクステンショニスト)", name: "バン エクステンショニスト", size: "250mL", description: "傷んだ髪を補強・補修。頭皮をやわらかく" },
  { category: "ダメージケア", line: "EXTENTIONISTE (エクステンショニスト)", name: "フォンダン エクステンショニスト", size: "200mL", description: "傷んだ髪を補強・補修。毛先までなめらかな質感へ" },
  { category: "ダメージケア", line: "EXTENTIONISTE (エクステンショニスト)", name: "マスク エクステンショニスト", size: "200mL", description: "傷んだ髪を補強・補修。ノーシャンプー設計" },
  { category: "ダメージケア", line: "EXTENTIONISTE (エクステンショニスト)", name: "エクステンショニスト テルミック", size: "150g", description: "枝毛や切れ毛の気になる髪を補修" },
  { category: "ダメージケア", line: "EXTENTIONISTE (エクステンショニスト)", name: "セラム エクステンショニスト", size: "50mL", description: "頭皮と髪を補強・補修するスカルプ＆ヘアセラム" },

  { category: "ダメージケア", line: "THÉRAPISTE (セラピュート)", name: "バン セラピュート", size: "250mL", description: "傷ついた髪を補修し、やさしく包み込む" },
  { category: "ダメージケア", line: "THÉRAPISTE (セラピュート)", name: "マスク セラピュート", size: "200g", description: "傷ついた髪を補修し、しなやかで艶のあるなめらかな髪へ" },
  { category: "ダメージケア", line: "THÉRAPISTE (セラピュート)", name: "セラム セラピュート", size: "30mL", description: "毛先用洗い流さないヘアトリートメント" },

  // --- AGING CARE ---
  { category: "エイジングケア", line: "CHRONOLOGISTE (クロノロジスト)", name: "バン クロノロジスト R", size: "250mL", description: "頭皮・毛髪をケアし健康的な印象の美しいツヤを与える" },
  { category: "エイジングケア", line: "CHRONOLOGISTE (クロノロジスト)", name: "マスク クロノロジスト R", size: "200mL", description: "眠っている髪の美しさを引き出す" },
  { category: "エイジングケア", line: "CHRONOLOGISTE (クロノロジスト)", name: "ユイル クロノロジスト N", size: "100mL", description: "美髪の最高峰。全方位ケアで、時を超えてさらなる美の高みへ" },
  { category: "エイジングケア", line: "CHRONOLOGISTE (クロノロジスト)", name: "クロノロジスト テルミック", size: "150mL", description: "健康的な印象で素髪のような質感へ導く" },

  // --- WEAK HAIR / FALL ---
  { category: "弱り髪ケア", line: "GENESIS (ジェネシス)", name: "バン イドラ フォーティファイ", size: "250mL", description: "弱くなった髪を補修し、健康的な髪へ" },
  { category: "弱り髪ケア", line: "GENESIS (ジェネシス)", name: "バン ニュートリ フォーティファイ", size: "250mL", description: "傷んだ髪を補強・補修。頭皮をやわらかく" },
  { category: "弱り髪ケア", line: "GENESIS (ジェネシス)", name: "フォンダン リインフォーサー", size: "200mL", description: "傷んだ髪を補強・補修。美しい髪へ" },
  { category: "弱り髪ケア", line: "GENESIS (ジェネシス)", name: "マスク リコンスティチュアント", size: "200mL", description: "うるおいあるやわらかな頭皮に導く" },
  { category: "弱り髪ケア", line: "GENESIS (ジェネシス)", name: "セラム フォーティファイ", size: "90mL", description: "頭皮に活力感を与え健やかに導く" },
  { category: "弱り髪ケア", line: "GENESIS (ジェネシス)", name: "ディフェンス テルミック", size: "150mL", description: "熱から髪を守り、サラサラでツヤのある髪へ" },

  // --- VOLUME / DENSITY ---
  { category: "エイジングケア", line: "DENSIFIQUE (デンシフィック)", name: "バン デンシフィック", size: "250mL", description: "うるおいを保ち、弾力のあるしなやかな質感へ" },
  { category: "エイジングケア", line: "DENSIFIQUE (デンシフィック)", name: "フォンダン デンシフィック", size: "200g", description: "ハリ・コシ、軽いボリューム感" },
  { category: "エイジングケア", line: "DENSIFIQUE (デンシフィック)", name: "マスク デンシフィック", size: "200g", description: "髪に密度感を与え、しなやかな質感へ" },
  { category: "エイジングケア", line: "DENSIFIQUE (デンシフィック)", name: "ムース デンシフィック", size: "150g", description: "スタイル自在でなめらかな質感へ導く" },

  // --- SCALP CARE ---
  { category: "スカルプケア", line: "SPÉCIFIQUE (スペシフィック)", name: "バン ディバレント R", size: "250mL", description: "頭皮をケアしすっきりと洗い上げる" },
  { category: "スカルプケア", line: "SPÉCIFIQUE (スペシフィック)", name: "クレイ ディバレント", size: "250mL", description: "頭皮のディープクレンジング" },
  { category: "スカルプケア", line: "SPÉCIFIQUE (スペシフィック)", name: "マスク リイドラタント", size: "200mL", description: "頭皮と髪を保湿しツヤのある軽やかな質感へ" },
  { category: "スカルプケア", line: "SPÉCIFIQUE (スペシフィック)", name: "セラム ポテンシャリスト", size: "90mL", description: "バランスを崩しがちな頭皮に。美肌菌に着想" },

  // --- DRY HAIR ---
  { category: "パサつきケア", line: "NUTRITIVE (ニュートリティブ)", name: "バン サテン R", size: "250mL", description: "軽い仕上がりに導くモイスチャーシャンプー" },
  { category: "パサつきケア", line: "NUTRITIVE (ニュートリティブ)", name: "バン サテン リッシュ", size: "250mL", description: "しっとりとした仕上がりに導く" },
  { category: "パサつきケア", line: "NUTRITIVE (ニュートリティブ)", name: "レ ヴィタル R", size: "200mL", description: "保湿感を与え指通りのよい髪へ導く" },
  { category: "パサつきケア", line: "NUTRITIVE (ニュートリティブ)", name: "マスク アンタンス リッシュ", size: "200mL", description: "保湿感を与え指通りのよい髪に導く" },
  { category: "パサつきケア", line: "NUTRITIVE (ニュートリティブ)", name: "ネクター テルミック R", size: "150mL", description: "ヒートプロテクション設計。保湿感と指通り" },
  { category: "パサつきケア", line: "NUTRITIVE (ニュートリティブ)", name: "マジック ナイト セラム R", size: "90mL", description: "夜用ヘア美容液。なめらかでまとまりのある髪へ" },

  // --- FRIZZY HAIR ---
  { category: "くせ毛ケア", line: "OLÉO-RELAX (オレオ リラックス)", name: "バン オレオ リラックス", size: "250mL", description: "くせを抑え、絡まりにくくやわらかな髪へ" },
  { category: "くせ毛ケア", line: "OLÉO-RELAX (オレオ リラックス)", name: "マスク オレオ リラックス", size: "200mL", description: "くせ毛の不均一性に着目。まとまる髪へ" },
  { category: "くせ毛ケア", line: "OLÉO-RELAX (オレオ リラックス)", name: "フルイド オレオリラックス R", size: "100mL", description: "湿度80%でも24時間くせ広がらない" },
  
  { category: "くせ毛ケア", line: "FLUIDEALISTE (フルイダリスト)", name: "バン フルイダリスト 1", size: "250mL", description: "絡みやもつれを防ぎ、なめらかで柔らかい髪へ" },
  { category: "くせ毛ケア", line: "FLUIDEALISTE (フルイダリスト)", name: "フォンダン フルイダリスト", size: "200g", description: "髪表面を均一に整え、なめらかでまとまりのある仕上がりへ" },
  { category: "くせ毛ケア", line: "FLUIDEALISTE (フルイダリスト)", name: "フルイディシーム", size: "150mL", description: "髪表面を均一に整え、なめらかで弾む動きのある髪へ" },

  // --- COLOR CARE ---
  { category: "カラーケア", line: "CHROMA ABSOLU (クロマ アブソリュ)", name: "バン クロマ プロテクト", size: "250mL", description: "カラーヘアを補修しツヤ、ハリコシを与え軽やかな質感へ" },
  { category: "カラーケア", line: "CHROMA ABSOLU (クロマ アブソリュ)", name: "バンリッシュ クロマ プロテクト", size: "250mL", description: "カラーヘアを補修しツヤ、ハリコシを与えまとまりのある質感へ" },
  { category: "カラーケア", line: "CHROMA ABSOLU (クロマ アブソリュ)", name: "フォンダン シカクロマ", size: "200mL", description: "カラーヘアの内部を補修、保湿しなめらかな質感へ" },
  { category: "カラーケア", line: "CHROMA ABSOLU (クロマ アブソリュ)", name: "マスク クロマ フィラー", size: "200mL", description: "カラーヘアを補修、コーティングし艶やかな髪へ" },
  { category: "カラーケア", line: "CHROMA ABSOLU (クロマ アブソリュ)", name: "ソワン クロマ グロス", size: "210mL", description: "カラーヘアの内部を補修、保湿しまとまりのある質感へ" },

  // --- BLOND CARE ---
  { category: "ハイトーン", line: "BLOND ABSOLU (ブロンド アブソリュ)", name: "バン ルミエール", size: "250mL", description: "ハイトーンカラーヘアを補修し、軽さと潤いを与える" },
  { category: "ハイトーン", line: "BLOND ABSOLU (ブロンド アブソリュ)", name: "バン ブロンドアブソリュ", size: "250mL", description: "ハイトーンカラーヘアの黄味・オレンジ味を補正" },
  { category: "ハイトーン", line: "BLOND ABSOLU (ブロンド アブソリュ)", name: "ソワン シカフラッシュ", size: "250mL", description: "ハイトーンカラーヘアを補修し、軽さを与える" },
  { category: "ハイトーン", line: "BLOND ABSOLU (ブロンド アブソリュ)", name: "マスク ブロンドアブソリュ", size: "200mL", description: "ハイトーンカラーヘアの黄味・オレンジ味を補正。ツヤと潤い" },
  { category: "ハイトーン", line: "BLOND ABSOLU (ブロンド アブソリュ)", name: "ユイル シカエクストリーム R", size: "100mL", description: "ブリーチ後の髪を寝ている間に補修" },
  { category: "ハイトーン", line: "BLOND ABSOLU (ブロンド アブソリュ)", name: "セラム シカニュイ", size: "90mL", description: "ブリーチ、ハイトーンカラー後の髪を寝ている間に補修" },

  // --- REPAIR ---
  { category: "ダメージケア", line: "PREMIÉRE (プレミエール)", name: "バン デカルシファイ", size: "250mL", description: "髪をやさしい感触で洗い上げる成分を採用" },
  { category: "ダメージケア", line: "PREMIÉRE (プレミエール)", name: "フォンダン フルイド リペア", size: "200mL", description: "髪の表面をケアし切れ毛を防ぐ" },
  { category: "ダメージケア", line: "PREMIÉRE (プレミエール)", name: "ユイル ルミエール リペア", size: "30mL", description: "輝きを失ったダメージヘアにツヤを" },

  // --- OIL ---
  { category: "艶ケア", line: "HUILE SUBLIME (ユイル スブリム)", name: "ユイル スブリム R", size: "100mL", description: "見とれるような輝き続く、贅沢な艶髪へ" }
];

export const KERASTASE_PRODUCTS: ProductData[] = RAW_PRODUCTS.map(p => ({
  ...p,
  type: determineType(p.name),
  color: determineColor(p.line)
}));
