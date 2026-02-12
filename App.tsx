
import React, { useState } from 'react';
import { QuizStep, UserProfile, DiagnosisResult } from './types';
import { getHairDiagnosis } from './geminiService';
import Splash from './components/Splash';
import QuestionCard from './components/QuestionCard';
import ResultsView from './components/ResultsView';
import LoadingScreen from './components/LoadingScreen';
import OpeningAnimation from './components/OpeningAnimation';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [introFinished, setIntroFinished] = useState(false);
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

  const handleIntroComplete = () => {
    setIntroFinished(true);
    // Short delay to allow Splash to start animating before unmounting intro completely if needed,
    // but typically we unmount immediately as the visual transition is done.
    setShowIntro(false);
  };

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
    <div className="min-h-screen w-full bg-white text-slate-800 font-sans selection:bg-gray-100 overflow-x-hidden">
      {/* Opening Animation Overlay */}
      {showIntro && <OpeningAnimation onComplete={handleIntroComplete} />}

      {/* Main Application Content - Always present behind the intro */}
      <main className="max-w-xl mx-auto min-h-screen flex flex-col">
        {step === QuizStep.START && <Splash onStart={handleStart} animate={introFinished} />}
        
        {step === QuizStep.Q1_HAIR_TYPE && (
          <QuestionCard
            title="Q1. 本来の髪質は？"
            options={["細い・柔らかい（猫っ毛）", "普通", "太い・硬い"]}
            onSelect={(val) => { updateProfile('hairType', val); setStep(QuizStep.Q2_SCALP_TYPE); }}
          />
        )}

        {step === QuizStep.Q2_SCALP_TYPE && (
          <QuestionCard
            title="Q2. 頭皮の状態は？"
            options={["ベタつきやすい・ニオイが気になる", "乾燥している・フケが出る", "敏感で荒れやすい・赤みがある", "特にトラブルはない"]}
            onSelect={(val) => { updateProfile('scalpType', val); setStep(QuizStep.Q3_FRIZZ_WAVE); }}
          />
        )}

        {step === QuizStep.Q3_FRIZZ_WAVE && (
          <QuestionCard
            title="Q3. くせや広がりは？"
            options={["直毛・ストンとしている", "うねる・まとまりにくい", "湿気で広がる・パサつく", "パーマや縮毛矯正をかけている"]}
            onSelect={(val) => { updateProfile('frizzWave', val); setStep(QuizStep.Q4_DAMAGE_LEVEL); }}
          />
        )}

        {step === QuizStep.Q4_DAMAGE_LEVEL && (
          <QuestionCard
            title="Q4. 髪のダメージレベルは？"
            options={["カラーやパーマはしていない（健康毛）", "定期的にカラーをしている", "毎日のアイロン・コテの使用頻度が高い", "ブリーチやハイライトを繰り返している"]}
            onSelect={(val) => { updateProfile('damageLevel', val); setStep(QuizStep.Q5_AGING_CARE); }}
          />
        )}

        {step === QuizStep.Q5_AGING_CARE && (
          <QuestionCard
            title="Q5. 年齢による変化は感じますか？"
            options={["特に感じない", "抜け毛が増えた・分け目が気になる", "髪が細くなった・ボリュームが出ない", "白髪染めによるパサつきが気になる"]}
            onSelect={(val) => { updateProfile('agingCare', val); setStep(QuizStep.Q6_IDEAL_FINISH); }}
          />
        )}

        {step === QuizStep.Q6_IDEAL_FINISH && (
          <QuestionCard
            title="Q6. 理想の仕上がりは？"
            options={["サラサラと指通りの良い、軽い仕上がり", "しっとりと重みのある、まとまる仕上がり", "ツヤとなめらかさを重視した仕上がり", "根元からふんわりとした、ハリ・コシのある仕上がり"]}
            onSelect={(val) => { updateProfile('idealFinish', val); setStep(QuizStep.Q7_PRIORITY); }}
          />
        )}

        {step === QuizStep.Q7_PRIORITY && (
          <QuestionCard
            title="Q7. 今、最も優先したいケアは？"
            options={["徹底的なダメージ補修", "頭皮環境の改善（スカルプケア）", "くせ毛のコントロール・湿気対策", "ヘアカラーの色持ち・ツヤの維持"]}
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
