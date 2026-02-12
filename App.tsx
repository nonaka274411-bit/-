
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
    hairVolume: '',
    scalpCondition: '',
    hairHistory: '',
    mainConcern: '',
    ageGroup: '',
    desiredFinish: '',
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
      // Fallback data
      setResult({
        summary: "複合的なケアが必要です。まずは保湿バランスを整え、外部ストレスから髪を守るルーティンを確立しましょう。",
        onePointAdvice: "トリートメントは、コームを使って髪一本一本に行き渡らせることで、浸透率が格段にアップします。",
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
      hairVolume: '',
      scalpCondition: '',
      hairHistory: '',
      mainConcern: '',
      ageGroup: '',
      desiredFinish: '',
      lifestyle: ''
    });
    setResult(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-800 font-sans selection:bg-gray-100">
      <main className="max-w-xl mx-auto min-h-screen flex flex-col">
        {step === QuizStep.START && <Splash onStart={handleStart} />}
        
        {step === QuizStep.HAIR_TYPE && (
          <QuestionCard
            title="髪質・太さ"
            options={["細くて柔らかい", "普通", "硬くて太い", "くせ毛・うねり"]}
            onSelect={(val) => { updateProfile('hairType', val); setStep(QuizStep.HAIR_VOLUME); }}
          />
        )}

        {step === QuizStep.HAIR_VOLUME && (
          <QuestionCard
            title="髪の毛の量"
            options={["少ない・薄い", "普通", "多い・広がる", "部分的に気になる"]}
            onSelect={(val) => { updateProfile('hairVolume', val); setStep(QuizStep.SCALP_CONDITION); }}
          />
        )}

        {step === QuizStep.SCALP_CONDITION && (
          <QuestionCard
            title="頭皮の状態"
            options={["乾燥・カサつき", "ノーマル（健康的）", "ベタつき・ニオイ", "敏感・赤み・かゆみ"]}
            onSelect={(val) => { updateProfile('scalpCondition', val); setStep(QuizStep.HAIR_HISTORY); }}
          />
        )}

        {step === QuizStep.HAIR_HISTORY && (
          <QuestionCard
            title="施術履歴"
            options={["カラー・パーマなし", "定期的なカラー", "ブリーチ・ハイトーン", "縮毛矯正・パーマ"]}
            onSelect={(val) => { updateProfile('hairHistory', val); setStep(QuizStep.MAIN_CONCERN); }}
          />
        )}

        {step === QuizStep.MAIN_CONCERN && (
          <QuestionCard
            title="現在の最大の悩み"
            options={["ダメージ・切れ毛", "パサつき・乾燥", "ボリュームが出ない", "カラーの色持ち"]}
            onSelect={(val) => { updateProfile('mainConcern', val); setStep(QuizStep.AGE_GROUP); }}
          />
        )}

        {step === QuizStep.AGE_GROUP && (
          <QuestionCard
            title="年代"
            options={["20代以下", "30代", "40代", "50代以上"]}
            onSelect={(val) => { updateProfile('ageGroup', val); setStep(QuizStep.DESIRED_FINISH); }}
          />
        )}

        {step === QuizStep.DESIRED_FINISH && (
          <QuestionCard
            title="理想の仕上がり"
            options={["しっとり・まとまり", "サラサラ・指通り", "ハリコシ・ボリューム", "ツヤ・なめらかさ"]}
            onSelect={(val) => { updateProfile('desiredFinish', val); setStep(QuizStep.LIFESTYLE); }}
          />
        )}

        {step === QuizStep.LIFESTYLE && (
          <QuestionCard
            title="普段のスタイリング"
            options={["毎日アイロン・コテを使用", "ドライヤーのみ", "スタイリング剤を多用", "自然乾燥が多い"]}
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
