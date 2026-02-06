
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, DiagnosisResult } from "./types";
import { KERASTASE_PRODUCTS } from "./productData";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getHairDiagnosis(profile: UserProfile): Promise<DiagnosisResult> {
  const productCatalogStr = KERASTASE_PRODUCTS.map(p => `- ${p.name} (ライン: ${p.line}, カテゴリ: ${p.category})`).join('\n');

  const prompt = `
    あなたはケラスターゼの最高峰ヘアエステティシャンです。以下のカタログにある製品から、ユーザーに最適な3ステップのリチュアルを提案してください。

    【製品カタログ】
    ${productCatalogStr}

    【ユーザープロフィール】
    - 髪質: ${profile.hairType}
    - 頭皮: ${profile.scalpCondition}
    - 悩み: ${profile.mainConcern}
    - 生活: ${profile.lifestyle}

    【指示】
    1. カタログから「バン(シャンプー)」「マスク/フォンダン/レヴィタル(トリートメント)」「セラム/オイル/フルイド/テルミック(洗い流さないトリートメント)」を各1つずつ、計3つ正確に選んでください。
    2. 選んだ理由を簡潔に、上品な日本語で説明してください。
    3. 最後に、ユーザーのライフスタイルに合わせた「美髪を保つためのプロのワンポイントアドバイス」を1つ提供してください。
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: "診断結果の全体的な総評" },
          onePointAdvice: { type: Type.STRING, description: "プロのワンポイントアドバイス" },
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
