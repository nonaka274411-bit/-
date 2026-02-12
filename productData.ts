
import { ProductData } from './types';

// Map specific product names to their high-quality image URLs from official sources
const PRODUCT_IMAGE_MAP: Record<string, string> = {
  // Chronologiste (黒)
  "バン クロノロジスト R": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw1e0b5f5d/products/chronologiste/BainChronologisteShampoo.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "マスク クロノロジスト R": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dwe70739c9/products/chronologiste/MasqueChronologisteHairMask.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "ユイル クロノロジスト N": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw20257933/products/chronologiste/HuileChronologisteHairOil.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "クロノロジスト テルミック": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw65377038/products/chronologiste/TermiqueChronologiste.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",

  // Genesis (ピンク)
  "バン イドラ フォーティファイ": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw8374e2d2/products/genesis/BainHydraFortifiant.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "バン ニュートリ フォーティファイ": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dwa3949987/products/genesis/BainNutriFortifiant.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "フォンダン リインフォーサー": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw9e995932/products/genesis/FondantRenforcateur.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "マスク リコンスティチュアント": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dwf2385303/products/genesis/MasqueReconstituant.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "セラム フォーティファイ": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw5b53028d/products/genesis/SerumFortifiant.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "ディフェンス テルミック": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw900e0055/products/genesis/DefenseThermique.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",

  // Blond Absolu (紫)
  "バン ルミエール": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dwc83a7953/products/blond-absolu/BainLumiere.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "バン ブロンドアブソリュ": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw6957297e/products/blond-absolu/BainUltraViolet.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "ソワン シカフラッシュ": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw99723793/products/blond-absolu/Cicaflash.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "マスク ブロンドアブソリュ": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw10629532/products/blond-absolu/MasqueUltraViolet.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "セラム シカニュイ": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw78759715/products/blond-absolu/SerumCicanuit.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "ユイル シカエクストリーム R": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw32385938/products/blond-absolu/HuileCicaextreme.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",

  // Resistance (緑)
  "バン ド フォルス N": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw99382932/products/resistance/BainForceArchitecte.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "ソワン ド フォルス N": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw23938293/products/resistance/CimentAntiUsure.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "マスク ド フォルス": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw92383293/products/resistance/MasqueForceArchitecte.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "シモン テルミック": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw23829382/products/resistance/CimentThermique.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "バン エクステンショニスト": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw83928392/products/resistance/BainExtentioniste.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "フォンダン エクステンショニスト": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw23823823/products/resistance/FondantExtentioniste.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "マスク エクステンショニスト": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw93823982/products/resistance/MasqueExtentioniste.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "セラム エクステンショニスト": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw23823982/products/resistance/SerumExtentioniste.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "エクステンショニスト テルミック": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw83928323/products/resistance/ExtentionisteThermique.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "バン セラピュート": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw38293823/products/resistance/BainTherapiste.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "マスク セラピュート": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw93829382/products/resistance/MasqueTherapiste.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "セラム セラピュート": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw82938293/products/resistance/SerumTherapiste.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",

  // Nutritive (白/オレンジ)
  "バン サテン R": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw38293823/products/nutritive/BainSatin.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "バン サテン リッシュ": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw23823823/products/nutritive/BainSatinRiche.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "レ ヴィタル R": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw23823823/products/nutritive/LaitVital.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "マスク アンタンス リッシュ": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw23823823/products/nutritive/MasquintenseRiche.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "ネクター テルミック R": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw23823823/products/nutritive/NectarThermique.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "マジック ナイト セラム R": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw23823823/products/nutritive/8HMagicNightSerum.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",

  // Oleo Relax (オレンジ)
  "バン オレオ リラックス": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dwf8323238/products/discipline/BainOleoRelax.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "マスク オレオ リラックス": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw39283293/products/discipline/MasqueOleoRelax.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "フルイド オレオリラックス R": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw52839283/products/discipline/HuileOleoRelax.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",

  // Specifique (薄緑/白)
  "バン ディバレント R": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw38293823/products/specifique/BainDivalent.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "クレイ ディバレント": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw23823823/products/specifique/ArgileEquilibrante.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "セラム ポテンシャリスト": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw23823823/products/specifique/Potentialiste.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "マスク リイドラタント": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw23823823/products/specifique/MasqueRehydratant.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",

  // Densifique (ベージュ)
  "バン デンシフィック": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw38293823/products/densifique/BainDensite.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "フォンダン デンシフィック": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw38293823/products/densifique/FondantDensite.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "マスク デンシフィック": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw38293823/products/densifique/MasqueDensite.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "ムース デンシフィック": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw38293823/products/densifique/MousseDensimorphose.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",

  // Premiere (シルバー)
  "バン デカルシファイ": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw38293823/products/premiere/BainDecalcifiantReparateur.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "フォンダン フルイド リペア": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw38293823/products/premiere/FondantFluiditeReparateur.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "ユイル ルミエール リペア": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw38293823/products/premiere/HuileGlossReparatrice.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",

  // Chroma Absolu (ピンク)
  "バン クロマ プロテクト": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw38293823/products/chroma-absolu/BainChromaRespect.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "バンリッシュ クロマ プロテクト": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw38293823/products/chroma-absolu/BainRicheChromaRespect.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "フォンダン シカクロマ": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw38293823/products/chroma-absolu/FondantCicaChroma.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "マスク クロマ フィラー": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw38293823/products/chroma-absolu/MasqueChromaFiller.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "ソワン クロマ グロス": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw38293823/products/chroma-absolu/SoinAcideChromaGloss.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  
  // Elixir
  "ユイル スブリム R": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw83928392/products/elixir-ultime/LHuileOriginale.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  
  // Fluidealiste
  "バン フルイダリスト 1": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw52423823/products/discipline/BainFluidealiste.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "フォンダン フルイダリスト": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw83292382/products/discipline/FondantFluidealiste.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
  "フルイディシーム": "https://www.kerastase-usa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-kerastase-master-catalog/default/dw38293829/products/discipline/Fluidissime.jpg?sw=600&sh=600&sm=fit&sfrm=jpg&q=70",
};

// Fallback image function
const getPlaceholder = (name: string, line: string) => {
  return `https://placehold.co/600x600/f3f4f6/9ca3af?text=${encodeURIComponent(name.substring(0, 10))}`;
};

export const KERASTASE_PRODUCTS: ProductData[] = [
  // --- DAMAGE CARE ---
  { category: "ダメージケア", line: "FORCE", name: "バン ド フォルス N", size: "250mL", description: "弱くなった髪を補修し、健康的な髪へ", image: "" },
  { category: "ダメージケア", line: "FORCE", name: "ソワン ド フォルス N", size: "200g", description: "弱くなった髪を補修し、指どおりのよいなめらかな髪へ", image: "" },
  { category: "ダメージケア", line: "FORCE", name: "マスク ド フォルス", size: "200g", description: "弱くなった髪を補修し、しなやかで健康的な髪へ", image: "" },
  { category: "ダメージケア", line: "FORCE", name: "シモン テルミック", size: "150g", description: "ドライヤー等の熱の力を利用し、髪を補修", image: "" },
  
  { category: "ダメージケア", line: "EXTENTIONISTE", name: "バン エクステンショニスト", size: "250mL", description: "傷んだ髪を補強・補修。頭皮をやわらかく", image: "" },
  { category: "ダメージケア", line: "EXTENTIONISTE", name: "フォンダン エクステンショニスト", size: "200mL", description: "傷んだ髪を補強・補修。毛先までなめらかな質感へ", image: "" },
  { category: "ダメージケア", line: "EXTENTIONISTE", name: "マスク エクステンショニスト", size: "200mL", description: "傷んだ髪を補強・補修。ノーシャンプー設計", image: "" },
  { category: "ダメージケア", line: "EXTENTIONISTE", name: "エクステンショニスト テルミック", size: "150g", description: "枝毛や切れ毛の気になる髪を補修", image: "" },
  { category: "ダメージケア", line: "EXTENTIONISTE", name: "セラム エクステンショニスト", size: "50mL", description: "頭皮と髪を補強・補修するスカルプ＆ヘアセラム", image: "" },

  { category: "ダメージケア", line: "THÉRAPISTE", name: "バン セラピュート", size: "250mL", description: "傷ついた髪を補修し、やさしく包み込む", image: "" },
  { category: "ダメージケア", line: "THÉRAPISTE", name: "マスク セラピュート", size: "200g", description: "傷ついた髪を補修し、しなやかで艶のあるなめらかな髪へ", image: "" },
  { category: "ダメージケア", line: "THÉRAPISTE", name: "セラム セラピュート", size: "30mL", description: "毛先用洗い流さないヘアトリートメント", image: "" },

  // --- AGING CARE ---
  { category: "エイジングケア", line: "CHRONOLOGISTE", name: "バン クロノロジスト R", size: "250mL", description: "頭皮・毛髪をケアし健康的な印象の美しいツヤを与える", image: "" },
  { category: "エイジングケア", line: "CHRONOLOGISTE", name: "マスク クロノロジスト R", size: "200mL", description: "眠っている髪の美しさを引き出す", image: "" },
  { category: "エイジングケア", line: "CHRONOLOGISTE", name: "ユイル クロノロジスト N", size: "100mL", description: "美髪の最高峰。全方位ケアで、時を超えてさらなる美の高みへ", image: "" },
  { category: "エイジングケア", line: "CHRONOLOGISTE", name: "クロノロジスト テルミック", size: "150mL", description: "健康的な印象で素髪のような質感へ導く", image: "" },

  // --- WEAK HAIR / FALL ---
  { category: "弱り髪ケア", line: "GENESIS", name: "バン イドラ フォーティファイ", size: "250mL", description: "弱くなった髪を補修し、健康的な髪へ", image: "" },
  { category: "弱り髪ケア", line: "GENESIS", name: "バン ニュートリ フォーティファイ", size: "250mL", description: "傷んだ髪を補強・補修。頭皮をやわらかく", image: "" },
  { category: "弱り髪ケア", line: "GENESIS", name: "フォンダン リインフォーサー", size: "200mL", description: "傷んだ髪を補強・補修。美しい髪へ", image: "" },
  { category: "弱り髪ケア", line: "GENESIS", name: "マスク リコンスティチュアント", size: "200mL", description: "うるおいあるやわらかな頭皮に導く", image: "" },
  { category: "弱り髪ケア", line: "GENESIS", name: "セラム フォーティファイ", size: "90mL", description: "頭皮に活力感を与え健やかに導く", image: "" },
  { category: "弱り髪ケア", line: "GENESIS", name: "ディフェンス テルミック", size: "150mL", description: "熱から髪を守り、サラサラでツヤのある髪へ", image: "" },

  // --- VOLUME / DENSITY ---
  { category: "エイジングケア", line: "DENSIFIQUE", name: "バン デンシフィック", size: "250mL", description: "うるおいを保ち、弾力のあるしなやかな質感へ", image: "" },
  { category: "エイジングケア", line: "DENSIFIQUE", name: "フォンダン デンシフィック", size: "200g", description: "ハリ・コシ、軽いボリューム感", image: "" },
  { category: "エイジングケア", line: "DENSIFIQUE", name: "マスク デンシフィック", size: "200g", description: "髪に密度感を与え、しなやかな質感へ", image: "" },
  { category: "エイジングケア", line: "DENSIFIQUE", name: "ムース デンシフィック", size: "150g", description: "スタイル自在でなめらかな質感へ導く", image: "" },

  // --- SCALP CARE ---
  { category: "スカルプケア", line: "SPÉCIFIQUE", name: "バン ディバレント R", size: "250mL", description: "頭皮をケアしすっきりと洗い上げる", image: "" },
  { category: "スカルプケア", line: "SPÉCIFIQUE", name: "クレイ ディバレント", size: "250mL", description: "頭皮のディープクレンジング", image: "" },
  { category: "スカルプケア", line: "SPÉCIFIQUE", name: "マスク リイドラタント", size: "200mL", description: "頭皮と髪を保湿しツヤのある軽やかな質感へ", image: "" },
  { category: "スカルプケア", line: "SPÉCIFIQUE", name: "セラム ポテンシャリスト", size: "90mL", description: "バランスを崩しがちな頭皮に。美肌菌に着想", image: "" },

  // --- DRY HAIR ---
  { category: "パサつきケア", line: "NUTRITIVE", name: "バン サテン R", size: "250mL", description: "軽い仕上がりに導くモイスチャーシャンプー", image: "" },
  { category: "パサつきケア", line: "NUTRITIVE", name: "バン サテン リッシュ", size: "250mL", description: "しっとりとした仕上がりに導く", image: "" },
  { category: "パサつきケア", line: "NUTRITIVE", name: "レ ヴィタル R", size: "200mL", description: "保湿感を与え指通りのよい髪へ導く", image: "" },
  { category: "パサつきケア", line: "NUTRITIVE", name: "マスク アンタンス リッシュ", size: "200mL", description: "保湿感を与え指通りのよい髪に導く", image: "" },
  { category: "パサつきケア", line: "NUTRITIVE", name: "ネクター テルミック R", size: "150mL", description: "ヒートプロテクション設計。保湿感と指通り", image: "" },
  { category: "パサつきケア", line: "NUTRITIVE", name: "マジック ナイト セラム R", size: "90mL", description: "夜用ヘア美容液。なめらかでまとまりのある髪へ", image: "" },

  // --- FRIZZY HAIR ---
  { category: "くせ毛ケア", line: "OLÉO-RELAX", name: "バン オレオ リラックス", size: "250mL", description: "くせを抑え、絡まりにくくやわらかな髪へ", image: "" },
  { category: "くせ毛ケア", line: "OLÉO-RELAX", name: "マスク オレオ リラックス", size: "200mL", description: "くせ毛の不均一性に着目。まとまる髪へ", image: "" },
  { category: "くせ毛ケア", line: "OLÉO-RELAX", name: "フルイド オレオリラックス R", size: "100mL", description: "湿度80%でも24時間くせ広がらない", image: "" },
  
  { category: "くせ毛ケア", line: "FLUIDEALISTE", name: "バン フルイダリスト 1", size: "250mL", description: "絡みやもつれを防ぎ、なめらかで柔らかい髪へ", image: "" },
  { category: "くせ毛ケア", line: "FLUIDEALISTE", name: "フォンダン フルイダリスト", size: "200g", description: "髪表面を均一に整え、なめらかでまとまりのある仕上がりへ", image: "" },
  { category: "くせ毛ケア", line: "FLUIDEALISTE", name: "フルイディシーム", size: "150mL", description: "髪表面を均一に整え、なめらかで弾む動きのある髪へ", image: "" },

  // --- COLOR CARE ---
  { category: "カラーケア", line: "CHROMA ABSOLU", name: "バン クロマ プロテクト", size: "250mL", description: "カラーヘアを補修しツヤ、ハリコシを与え軽やかな質感へ", image: "" },
  { category: "カラーケア", line: "CHROMA ABSOLU", name: "バンリッシュ クロマ プロテクト", size: "250mL", description: "カラーヘアを補修しツヤ、ハリコシを与えまとまりのある質感へ", image: "" },
  { category: "カラーケア", line: "CHROMA ABSOLU", name: "フォンダン シカクロマ", size: "200mL", description: "カラーヘアの内部を補修、保湿しなめらかな質感へ", image: "" },
  { category: "カラーケア", line: "CHROMA ABSOLU", name: "マスク クロマ フィラー", size: "200mL", description: "カラーヘアを補修、コーティングし艶やかな髪へ", image: "" },
  { category: "カラーケア", line: "CHROMA ABSOLU", name: "ソワン クロマ グロス", size: "210mL", description: "カラーヘアの内部を補修、保湿しまとまりのある質感へ", image: "" },

  // --- BLOND CARE ---
  { category: "ハイトーン", line: "BLOND ABSOLU", name: "バン ルミエール", size: "250mL", description: "ハイトーンカラーヘアを補修し、軽さと潤いを与える", image: "" },
  { category: "ハイトーン", line: "BLOND ABSOLU", name: "バン ブロンドアブソリュ", size: "250mL", description: "ハイトーンカラーヘアの黄味・オレンジ味を補正", image: "" },
  { category: "ハイトーン", line: "BLOND ABSOLU", name: "ソワン シカフラッシュ", size: "250mL", description: "ハイトーンカラーヘアを補修し、軽さを与える", image: "" },
  { category: "ハイトーン", line: "BLOND ABSOLU", name: "マスク ブロンドアブソリュ", size: "200mL", description: "ハイトーンカラーヘアの黄味・オレンジ味を補正。ツヤと潤い", image: "" },
  { category: "ハイトーン", line: "BLOND ABSOLU", name: "ユイル シカエクストリーム R", size: "100mL", description: "ブリーチ後の髪を寝ている間に補修", image: "" },
  { category: "ハイトーン", line: "BLOND ABSOLU", name: "セラム シカニュイ", size: "90mL", description: "ブリーチ、ハイトーンカラー後の髪を寝ている間に補修", image: "" },

  // --- REPAIR ---
  { category: "ダメージケア", line: "PREMIÉRE", name: "バン デカルシファイ", size: "250mL", description: "髪をやさしい感触で洗い上げる成分を採用", image: "" },
  { category: "ダメージケア", line: "PREMIÉRE", name: "フォンダン フルイド リペア", size: "200mL", description: "髪の表面をケアし切れ毛を防ぐ", image: "" },
  { category: "ダメージケア", line: "PREMIÉRE", name: "ユイル ルミエール リペア", size: "30mL", description: "輝きを失ったダメージヘアにツヤを", image: "" },

  // --- OIL ---
  { category: "艶ケア", line: "HUILE SUBLIME", name: "ユイル スブリム R", size: "100mL", description: "見とれるような輝き続く、贅沢な艶髪へ", image: "" }
].map(p => ({
  ...p,
  image: PRODUCT_IMAGE_MAP[p.name] || getPlaceholder(p.name, p.line)
}));
