
import React, { useState } from 'react';
import { QuizStep, UserProfile, DiagnosisResult } from './types';
import { getHairDiagnosis } from './geminiService';
import Splash from './components/Splash';
import QuestionCard from './components/QuestionCard';
import ResultsView from './components/ResultsView';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  const [step, setStep] = useState<QuizStep>(QuizStep.START);
  const [profile, setProfile] = useState<UserProfile>({
    hairType: '',
    scalpType: '',
    frizzWave: '',
    damageLevel: '',
    agingCare: '',
    idealFinish: '',
    carePriority: ''
  });
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const updateProfile = (key: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleStart = () => setStep(QuizStep.Q1_HAIR_TYPE);

  const completeDiagnosis = async () => {
    setStep(QuizStep.LOADING);
    try {
      const diagnosis = await getHairDiagnosis(profile);
      setResult(diagnosis);
      setStep(QuizStep.RESULTS);
    } catch (error) {
      console.error("Diagnosis failed", error);
      // Fallback data
      setResult({
        summary: "あなたの髪は複数の要因が重なっています。基本の保湿に加え、ダメージ補修と頭皮ケアを組み合わせた特別なレシピを提案します。",
        onePointAdvice: "トリートメントは毛先から塗布し、目の粗いコームでとかすことで浸透率が劇的に上がります。",
        products: [
          {
            name: "バン クロノロジスト R",
            line: "CHRONOLOGISTE",
            description: "頭皮・毛髪をケアし健康的な印象の美しいツヤを与える",
            howToUse: "頭皮全体に行き渡らせるようにマッサージしながら洗います。",
            imageHint: ""
          },
          {
            name: "マスク クロノロジスト R",
            line: "CHRONOLOGISTE",
            description: "眠っている髪の美しさを引き出す",
            howToUse: "毛先を中心に塗布し、5〜10分放置して成分を浸透させます。",
            imageHint: ""
          },
          {
            name: "ユイル クロノロジスト N",
            line: "CHRONOLOGISTE",
            description: "美髪の最高峰。全方位ケアでさらなる美の高みへ",
            howToUse: "ドライ前とドライ後、少量を毛先に馴染ませます。",
            imageHint: ""
          }
        ]
      });
      setStep(QuizStep.RESULTS);
    }
  };

  const reset = () => {
    setStep(QuizStep.START);
    setProfile({
      hairType: '',
      scalpType: '',
      frizzWave: '',
      damageLevel: '',
      agingCare: '',
      idealFinish: '',
      carePriority: ''
    });
    setResult(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-800 font-sans selection:bg-gray-100">
      <main className="max-w-xl mx-auto min-h-screen flex flex-col">
        {step === QuizStep.START && <Splash onStart={handleStart} />}
        
        {/* Q1: 髪質 */}
        {step === QuizStep.Q1_HAIR_TYPE && (
          <QuestionCard
            title="Q1. 本来の髪質は？"
            options={[
              "細い・柔らかい（猫っ毛）",
              "普通",
              "太い・硬い"
            ]}
            onSelect={(val) => { updateProfile('hairType', val); setStep(QuizStep.Q2_SCALP_TYPE); }}
          />
        )}

        {/* Q2: 頭皮 */}
        {step === QuizStep.Q2_SCALP_TYPE && (
          <QuestionCard
            title="Q2. 頭皮の状態は？"
            options={[
              "ベタつきやすい・ニオイが気になる",
              "乾燥している・フケが出る",
              "敏感で荒れやすい・赤みがある",
              "特にトラブルはない"
            ]}
            onSelect={(val) => { updateProfile('scalpType', val); setStep(QuizStep.Q3_FRIZZ_WAVE); }}
          />
        )}

        {/* Q3: くせ・広がり */}
        {step === QuizStep.Q3_FRIZZ_WAVE && (
          <QuestionCard
            title="Q3. くせや広がりは？"
            options={[
              "直毛・ストンとしている",
              "うねる・まとまりにくい",
              "湿気で広がる・パサつく",
              "パーマや縮毛矯正をかけている"
            ]}
            onSelect={(val) => { updateProfile('frizzWave', val); setStep(QuizStep.Q4_DAMAGE_LEVEL); }}
          />
        )}

        {/* Q4: ダメージレベル */}
        {step === QuizStep.Q4_DAMAGE_LEVEL && (
          <QuestionCard
            title="Q4. 髪のダメージレベルは？"
            options={[
              "カラーやパーマはしていない（健康毛）",
              "定期的にカラーをしている",
              "毎日のアイロン・コテの使用頻度が高い",
              "ブリーチやハイライトを繰り返している"
            ]}
            onSelect={(val) => { updateProfile('damageLevel', val); setStep(QuizStep.Q5_AGING_CARE); }}
          />
        )}

        {/* Q5: エイジング */}
        {step === QuizStep.Q5_AGING_CARE && (
          <QuestionCard
            title="Q5. 年齢による変化は感じますか？"
            options={[
              "特に感じない",
              "抜け毛が増えた・分け目が気になる",
              "髪が細くなった・ボリュームが出ない",
              "白髪染めによるパサつきが気になる"
            ]}
            onSelect={(val) => { updateProfile('agingCare', val); setStep(QuizStep.Q6_IDEAL_FINISH); }}
          />
        )}

        {/* Q6: 理想の仕上がり */}
        {step === QuizStep.Q6_IDEAL_FINISH && (
          <QuestionCard
            title="Q6. 理想の仕上がりは？"
            options={[
              "サラサラと指通りの良い、軽い仕上がり",
              "しっとりと重みのある、まとまる仕上がり",
              "ツヤとなめらかさを重視した仕上がり",
              "根元からふんわりとした、ハリ・コシのある仕上がり"
            ]}
            onSelect={(val) => { updateProfile('idealFinish', val); setStep(QuizStep.Q7_PRIORITY); }}
          />
        )}

        {/* Q7: 最優先事項 */}
        {step === QuizStep.Q7_PRIORITY && (
          <QuestionCard
            title="Q7. 今、最も優先したいケアは？"
            options={[
              "徹底的なダメージ補修",
              "頭皮環境の改善（スカルプケア）",
              "くせ毛のコントロール・湿気対策",
              "ヘアカラーの色持ち・ツヤの維持"
            ]}
            onSelect={(val) => { updateProfile('carePriority', val); completeDiagnosis(); }}
          />
        )}

        {step === QuizStep.LOADING && <LoadingScreen />}

        {step === QuizStep.RESULTS && result && (
          <ResultsView result={result} onReset={reset} />
        )}
      </main>
    </div>
  );
};

export default App;
