
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, DiagnosisResult } from "./types";
import { KERASTASE_PRODUCTS } from "./productData";

export async function getHairDiagnosis(profile: UserProfile): Promise<DiagnosisResult> {
  // Security Check: Ensure API Key is available in the environment
  if (!process.env.API_KEY) {
    console.warn("API Key is missing. Please set process.env.API_KEY. Using fallback data.");
    throw new Error("API Key is not defined in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const productCatalogStr = KERASTASE_PRODUCTS.map(p => `- ${p.name} (ライン: ${p.line}, カテゴリ: ${p.category})`).join('\n');

  const prompt = `
    あなたはケラスターゼの専属トップヘアスタイリストです。
    以下の7つの詳細なユーザーカルテに基づき、最高の「3ステップケア」を処方してください。

    【絶対ルール: ミックス提案】
    **「同じシリーズ（ライン）で3点揃えること」を原則禁止します。**
    ユーザーは複合的な悩みを持っています。それぞれの悩みに特化した製品を組み合わせることで、オーダーメイドの価値を提供してください。

    【選定アルゴリズム (重要度 60:30:10)】
    以下の基準に従って厳密に選定してください。

    **1. 集中トリートメント (Masque/Fondant): 重要度 60% [決定打]**
    *   **選定基準:** 「最優先したいケア」(${profile.carePriority}) と 「ダメージレベル」(${profile.damageLevel}) に最も効果的なものを選んでください。ここが診断の要です。
    *   *例:*
        *   ブリーチ/ハイダメージ -> ブロンドアブソリュ, シカエクストリーム, セラピュート
        *   くせ毛/広がり優先 -> オレオリラックス, フルイダリスト
        *   エイジング/複合悩み -> クロノロジスト, デンシフィック

    **2. シャンプー (Bain): 重要度 30% [土台・頭皮]**
    *   **選定基準:** 「頭皮の状態」(${profile.scalpType}) と 「髪質」(${profile.hairType}) に合わせて選んでください。トリートメントとは異なるラインを選ぶことでバランスを取ります。
    *   *例:*
        *   ベタつき/頭皮トラブル -> スペシフィック
        *   細毛/ボリューム不足 -> フォルス, デンシフィック
        *   カラーケア -> クロマアブソリュ

    **3. 洗い流さないトリートメント (Oil/Serum): 重要度 10% [質感・仕上げ]**
    *   **選定基準:** 「理想の仕上がり」(${profile.idealFinish}) と 「くせ・広がり」(${profile.frizzWave}) を調整する最後の仕上げです。
    *   *例:*
        *   ツヤ重視 -> ユイル系
        *   夜ケア/まとまり -> マジックナイトセラム
        *   熱保護 -> テルミック系

    【ユーザー詳細カルテ】
    1. 髪質: ${profile.hairType}
    2. 頭皮: ${profile.scalpType}
    3. くせ: ${profile.frizzWave}
    4. ダメージ: ${profile.damageLevel}
    5. エイジング: ${profile.agingCare}
    6. 理想の仕上がり: ${profile.idealFinish}
    7. 最優先ケア: ${profile.carePriority}

    【製品リスト】
    ${productCatalogStr}

    【出力項目】
    - summary: なぜこの組み合わせなのか。「頭皮は〜〜なので〇〇を選び、毛先のダメージには〜〜が最適だからです」といった論理的な解説（120文字程度）。
    - onePointAdvice: プロならではの使用テクニックや注意点。
    - products: 選定した3製品。
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: "今回のミックス提案の意図と理由" },
          onePointAdvice: { type: Type.STRING, description: "プロからの具体的なケアアドバイス" },
          products: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                line: { type: Type.STRING },
                description: { type: Type.STRING },
                howToUse: { type: Type.STRING },
                imageHint: { type: Type.STRING }
              },
              required: ["name", "line", "description", "howToUse", "imageHint"]
            }
          }
        },
        required: ["summary", "onePointAdvice", "products"]
      }
    }
  });

  return JSON.parse(response.text);
}
