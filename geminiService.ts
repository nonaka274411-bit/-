import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, DiagnosisResult } from "./types";
import { KERASTASE_PRODUCTS } from "./productData";

export async function getHairDiagnosis(profile: UserProfile): Promise<DiagnosisResult> {
  // Initialize inside the function to avoid top-level execution issues
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const productCatalogStr = KERASTASE_PRODUCTS.map(p => `- ${p.name} (ライン: ${p.line}, カテゴリ: ${p.category})`).join('\n');

  const prompt = `
    あなたはケラスターゼのトップヘアスタイリストです。
    ユーザーのカルテに基づき、最も効果的でパーソナライズされた「3ステップケア（シャンプー、トリートメント、アウトバス）」を処方してください。

    【重要なルール: ミックス提案の推奨】
    **決して「同じシリーズ（ライン）で揃えること」を正解としないでください。**
    プロの診断とは、例えば「頭皮はオイリー（スペシフィック）だが、毛先はブリーチダメージがある（シカエクストリーム）」といった複合的な悩みに対応することです。
    ユーザーの悩みが複数ある場合、異なるシリーズを組み合わせる（クロスセリング）提案を積極的に行ってください。

    【ユーザーカルテ】
    - 髪質: ${profile.hairType}
    - 髪の量: ${profile.hairVolume}
    - 頭皮の状態: ${profile.scalpCondition}
    - 施術履歴: ${profile.hairHistory}
    - 現在の最大の悩み: ${profile.mainConcern}
    - 年代: ${profile.ageGroup}
    - 理想の仕上がり: ${profile.desiredFinish}
    - スタイリング習慣: ${profile.lifestyle}

    【製品リスト】
    ${productCatalogStr}

    【出力構成】
    1. プロダクト1: シャンプー (Bain)
    2. プロダクト2: 集中トリートメント (Masque/Fondant) ※ダメージレベルに合わせて選択
    3. プロダクト3: 洗い流さないトリートメント (Oil/Serum/Thermique) ※仕上がり質感や熱ダメージ対策に合わせて選択

    【出力スキーマ】
    - summary: なぜこの組み合わせ（ミックス）にしたのか、プロ視点での論理的な解説（100文字程度）。
    - onePointAdvice: 明日から使える具体的なプロのテクニック（例: 塗布の仕方、ドライヤーの当て方など）。
    - products: 選定した3つの製品詳細。imageHintは空で良い。
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: "今回の組み合わせの意図（ミックス提案の理由）" },
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