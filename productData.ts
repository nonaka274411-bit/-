
export interface Product {
  category: string;
  line: string;
  name: string;
  size: string;
  description: string;
  image: string;
}

export const KERASTASE_PRODUCTS: Product[] = [
  // ダメージケア
  { category: "ダメージケア", line: "FORCE (フォルス)", name: "バン ド フォルス N", size: "250mL, 500mL", description: "弱くなった髪を補修し、健康的な髪へ", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800" },
  { category: "ダメージケア", line: "EXTENTIONISTE (エクステンショニスト)", name: "バン エクステンショニスト", size: "250mL, 500mL", description: "傷んだ髪を補強・補修。頭皮をやわらかく", image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=800" },
  { category: "ダメージケア", line: "THÉRAPISTE (セラピュート)", name: "バン セラピュート", size: "250mL", description: "傷ついた髪を補修し、やさしく包み込む", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=800" },
  { category: "ダメージケア", line: "FORCE (フォルス)", name: "ソワン ド フォルス N", size: "200g", description: "弱くなった髪を補修し、指どおりのよいなめらかな髪へ", image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=800" },
  { category: "ダメージケア", line: "EXTENTIONISTE (エクステンショニスト)", name: "フォンダン エクステンショニスト", size: "200mL", description: "傷んだ髪を補強・補修。毛先までなめらかな質感へ", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800" },
  { category: "ダメージケア", line: "FORCE (フォルス)", name: "マスク ド フォルス", size: "200g", description: "弱くなった髪を補修し、しなやかで健康的な髪へ", image: "https://images.unsplash.com/photo-1590439472301-3826aa76d494?q=80&w=800" },
  { category: "ダメージケア", line: "THÉRAPISTE (セラピュート)", name: "マスク セラピュート", size: "200g", description: "傷ついた髪を補修し、しなやかで艶のあるなめらかな髪へ", image: "https://images.unsplash.com/photo-1527799822367-a05eb5747737?q=80&w=800" },
  { category: "ダメージケア", line: "FORCE (フォルス)", name: "シモン テルミック", size: "150g", description: "ドライヤー等の熱の力を利用し、髪を補修。しなやかな質感へ", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800" },
  { category: "ダメージケア", line: "THÉRAPISTE (セラピュート)", name: "セラム セラピュート", size: "30mL", description: "毛先用洗い流さないヘアトリートメント。しっとりなめらかな質感へ", image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800" },
  // エイジングケア
  { category: "エイジングケア", line: "CHRONOLOGISTE (クロノロジスト)", name: "バン クロノロジスト R", size: "250mL", description: "頭皮・毛髪をケアし健康的な印象の美しいツヤを与える", image: "https://images.unsplash.com/photo-1531315630201-bb15abeb1653?q=80&w=800" },
  { category: "エイジングケア", line: "CHRONOLOGISTE (クロノロジスト)", name: "マスク クロノロジスト R", size: "200mL", description: "眠っている髪の美しさを引き出す", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800" },
  { category: "エイジングケア", line: "CHRONOLOGISTE (クロノロジスト)", name: "ユイル クロノロジスト N", size: "30mL, 75mL", description: "美髪の最高峰。全方位ケアでさらなる美の高みへ", image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=800" },
  // 弱り髪ケア (ジェネシス)
  { category: "弱り髪ケア", line: "GENESIS (ジェネシス)", name: "バン イドラ フォーティファイ", size: "250mL", description: "弱くなった髪を補修し、健康的な髪へ", image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800" },
  { category: "弱り髪ケア", line: "GENESIS (ジェネシス)", name: "セラム フォーティファイ", size: "90mL", description: "頭皮に活力感を与え健やかに導く", image: "https://images.unsplash.com/photo-1500336624523-d727130c3328?q=80&w=800" },
  // くせ毛・まとまりケア
  { category: "くせ毛・まとまりケア", line: "OLÉO-RELAX (オレオ リラックス)", name: "バン オレオ リラックス", size: "250mL", description: "くせを抑え、まとまりやすい髪へ", image: "https://images.unsplash.com/photo-1626015336043-41f238805f7a?q=80&w=800" },
  { category: "くせ毛・まとまりケア", line: "OLÉO-RELAX (オレオ リラックス)", name: "フルイド オレオリラックス R", size: "75mL", description: "24時間くせ広がらない", image: "https://images.unsplash.com/photo-1552046122-03184de85e08?q=80&w=800" },
  // カラーケア
  { category: "カラーケア", line: "CHROMA ABSOLU (クロマ アブソリュ)", name: "バン クロマ プロテクト", size: "250mL", description: "カラーヘアを補修しツヤ、ハリコシを与える", image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=800" },
  { category: "カラーケア", line: "CHROMA ABSOLU (クロマ アブソリュ)", name: "セラム クロマ プロテクト", size: "150mL", description: "熱から髪を守り艶のある髪へ", image: "https://images.unsplash.com/photo-1611082216913-90d56c703b0d?q=80&w=800" },
  // パサつきケア
  { category: "パサつきケア", line: "NUTRITIVE (ニュートリティブ)", name: "バン サテン R", size: "250mL", description: "軽い仕上がりに導くモイスチャーシャンプー", image: "https://images.unsplash.com/photo-1559599141-3814837a2846?q=80&w=800" },
  { category: "パサつきケア", line: "NUTRITIVE (ニュートリティブ)", name: "マジック ナイト セラム R", size: "90mL", description: "夜用ヘア美容液。翌朝スタイルを創りやすい髪へ", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800" }
];
