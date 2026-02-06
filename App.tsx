
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
    scalpCondition: '',
    mainConcern: '',
    lifestyle: ''
  });
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const updateProfile = (key: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleStart = () => setStep(QuizStep.HAIR_TYPE);

  const completeDiagnosis = async () => {
    setStep(QuizStep.LOADING);
    try {
      const diagnosis = await getHairDiagnosis(profile);
      setResult(diagnosis);
      setStep(QuizStep.RESULTS);
    } catch (error) {
      console.error("Diagnosis failed", error);
      // Fallback
      setResult({
        summary: "至高の輝きを求めるあなたの髪には、ケラスターゼ最高峰のクロノロジストを中心としたリチュアルが最適です。",
        onePointAdvice: "週に一度は、トリートメントを塗布した後に温かい蒸しタオルで5分間パックすることで、成分がより深くまで浸透します。",
        products: [
          {
            name: "バン クロノロジスト R",
            line: "CHRONOLOGISTE",
            description: "頭皮・毛髪をケアし健康的な印象の美しいツヤを与える",
            howToUse: "地肌からしっかり濡らし、円を描くようにマッサージしながら洗い上げてください。",
            imageHint: ""
          },
          {
            name: "マスク クロノロジスト R",
            line: "CHRONOLOGISTE",
            description: "眠っている髪の美しさを引き出す",
            howToUse: "毛先を中心に馴染ませ、指の間を通して浸透させます。5分置いてからすすいでください。",
            imageHint: ""
          },
          {
            name: "ユイル クロノロジスト N",
            line: "CHRONOLOGISTE",
            description: "美髪の最高峰。全方位ケアで、時を超えてさらなる美の高みへ",
            howToUse: "タオルドライした髪に、1〜2プッシュを手に広げ、中間から毛先に馴染ませます。",
            imageHint: ""
          }
        ]
      });
      setStep(QuizStep.RESULTS);
    }
  };

  const reset = () => {
    setStep(QuizStep.START);
    setProfile({ hairType: '', scalpCondition: '', mainConcern: '', lifestyle: '' });
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen max-w-md mx-auto relative bg-white overflow-y-auto">
      {/* Decorative Aura */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#fdfaf3] rounded-full blur-3xl opacity-60" />
      </div>

      <main className="relative z-10 flex flex-col min-h-screen px-6">
        {step === QuizStep.START && <Splash onStart={handleStart} />}
        
        {step === QuizStep.HAIR_TYPE && (
          <QuestionCard
            title="Hair Type & Texture"
            options={["細くて柔らかい", "普通・健康的", "硬くて太い", "くせ毛・うねり"]}
            onSelect={(val) => { updateProfile('hairType', val); setStep(QuizStep.SCALP_CONDITION); }}
          />
        )}

        {step === QuizStep.SCALP_CONDITION && (
          <QuestionCard
            title="Scalp Condition"
            options={["健康的・バランスが良い", "ベタつき・皮脂が気になる", "乾燥・カサつき", "敏感・赤み"]}
            onSelect={(val) => { updateProfile('scalpCondition', val); setStep(QuizStep.MAIN_CONCERN); }}
          />
        )}

        {step === QuizStep.MAIN_CONCERN && (
          <QuestionCard
            title="Primary Concern"
            options={["ダメージ・枝毛・切れ毛", "カラー後の退色と乾燥", "ボリュームとハリ・コシ", "ひどいパサつき"]}
            onSelect={(val) => { updateProfile('mainConcern', val); setStep(QuizStep.LIFESTYLE); }}
          />
        )}

        {step === QuizStep.LIFESTYLE && (
          <QuestionCard
            title="Your Lifestyle"
            options={["アイロン・コテを常用", "紫外線や外気に触れる", "多忙によるストレス", "スポーツ・ジム"]}
            onSelect={(val) => { updateProfile('lifestyle', val); completeDiagnosis(); }}
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
