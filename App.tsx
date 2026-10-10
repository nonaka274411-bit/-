import React, { useState, useEffect, useRef } from 'react';
import { QuizStep, UserProfile, DiagnosisResult } from './types';
import { getHairDiagnosis } from './geminiService';
import ThreeScene, { BOTTLE_CATALOG } from './components/ThreeScene';
import Splash from './components/Splash';
import QuestionCard from './components/QuestionCard';
import ResultsView from './components/ResultsView';
import LoadingScreen from './components/LoadingScreen';
import OpeningAnimation from './components/OpeningAnimation';
import { X, Sparkles, Move3d } from 'lucide-react';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [step, setStep] = useState<QuizStep>(QuizStep.START);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [activeBottleIndex, setActiveBottleIndex] = useState(2); // Chronologiste center default
  const [show3DFullscreenViewer, setShow3DFullscreenViewer] = useState(false);

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

  const containerRef = useRef<HTMLDivElement>(null);

  // Synchronize window/container scroll with 3D camera
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, scrollY / maxScroll));
      setScrollOffset(ratio);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const updateProfile = (key: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleStart = () => {
    setStep(QuizStep.Q1_HAIR_TYPE);
    setActiveBottleIndex(0); // Focus on first bottle for Q1
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completeDiagnosis = async () => {
    setStep(QuizStep.LOADING);
    window.scrollTo(0, 0);

    try {
      const diagnosis = await getHairDiagnosis(profile);
      setResult(diagnosis);
    } catch (error) {
      console.error('Diagnosis failed, using salon prescribed fallback', error);
      // High-end salon fallback ritual
      setResult({
        summary: "あなたの髪質傾向に基づき、毛髪内部の集中補修と頭皮のエイジングケアを両立するケラスターゼ最高峰「クロノロジスト」と「ユイル スブリム」のハイブリッドリチュアルをご提案します。",
        onePointAdvice: "トリートメント塗布後は指の腹で毛先に向かって10回優しくなめすことで、成分がキューティクルの深層まで浸透し、サロン帰りのツヤが持続します。",
        products: [
          {
            name: "バン クロノロジスト R",
            line: "CHRONOLOGISTE",
            description: "頭皮と髪を同時にケアし、生まれたてのようなハリとツヤを与える最高峰シャンプー。",
            howToUse: "頭皮をマッサージするように洗った後、1〜2分置いて泡パックしてから洗い流します。",
            imageHint: ""
          },
          {
            name: "マスク クロノロジスト R",
            line: "CHRONOLOGISTE",
            description: "ヒアルロン酸・アビシン・ビタミンE配合。頭皮と毛髪の複合悩みを全方位ケア。",
            howToUse: "シャンプー後、軽く水気を取り、頭皮から毛先まで馴染ませて5〜10分放置します。",
            imageHint: ""
          },
          {
            name: "ユイル クロノロジスト N",
            line: "CHRONOLOGISTE",
            description: "美髪の最高峰。全方位ケアで時を超えたツヤとなめらかさを髪に与えるオイル。",
            howToUse: "タオルドライ後の濡れた髪に1〜2プッシュ塗布し、ドライヤーで乾かします。",
            imageHint: ""
          }
        ]
      });
    } finally {
      setStep(QuizStep.RESULTS);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
    }
  };

  const reset = () => {
    setStep(QuizStep.START);
    setActiveBottleIndex(2);
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
    <div ref={containerRef} className="relative min-h-screen w-full bg-[#070709] text-slate-100 font-sans selection:bg-amber-400/30 selection:text-white overflow-x-hidden">
      
      {/* 1. Opening Cinematic Animation Overlay */}
      {showIntro && <OpeningAnimation onComplete={handleIntroComplete} />}

      {/* 2. Persistent 3D WebGL Background Canvas (Interactive & Synchronized) */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <ThreeScene
          step={step}
          scrollOffset={scrollOffset}
          activeProductIndex={activeBottleIndex}
          isInteractive={true}
          onBottleClick={(idx) => setActiveBottleIndex(idx)}
        />
        
        {/* Subtle Luxury Gradient Scrim for readable text overlays */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#070709]/80 via-transparent to-[#070709]/60" />
      </div>

      {/* 3. Main Application Flow (Layered Over 3D Scene) */}
      <main className="relative z-10 w-full min-h-screen flex flex-col justify-between">
        
        {step === QuizStep.START && (
          <Splash
            onStart={handleStart}
            activeBottleIndex={activeBottleIndex}
            onSelectBottle={(idx) => setActiveBottleIndex(idx)}
            onOpen3DViewer={() => setShow3DFullscreenViewer(true)}
          />
        )}

        {step === QuizStep.Q1_HAIR_TYPE && (
          <QuestionCard
            stepNumber={1}
            totalSteps={7}
            title="本来の髪質（太さ・硬さ）は？"
            subtitle="毛髪のコルテックス密度に合わせて土台となるシャンプーを診断します"
            options={["細い・柔らかい（猫っ毛）", "普通", "太い・硬い・剛毛"]}
            selectedOption={profile.hairType}
            onSelect={(val) => {
              updateProfile('hairType', val);
              setActiveBottleIndex(1); // Shift 3D camera to Chroma
              setStep(QuizStep.Q2_SCALP_TYPE);
            }}
            onBack={() => setStep(QuizStep.START)}
          />
        )}

        {step === QuizStep.Q2_SCALP_TYPE && (
          <QuestionCard
            stepNumber={2}
            totalSteps={7}
            title="頭皮のコンディションは？"
            subtitle="健康な美髪を育むためのスカルプケア処方を割り出します"
            options={[
              "ベタつきやすい・ニオイが気になる",
              "乾燥している・フケやかゆみがある",
              "敏感で荒れやすい・赤みがある",
              "特にトラブルはなく良好"
            ]}
            selectedOption={profile.scalpType}
            onSelect={(val) => {
              updateProfile('scalpType', val);
              setActiveBottleIndex(3); // Shift 3D camera to Elixir
              setStep(QuizStep.Q3_FRIZZ_WAVE);
            }}
            onBack={() => setStep(QuizStep.Q1_HAIR_TYPE)}
          />
        )}

        {step === QuizStep.Q3_FRIZZ_WAVE && (
          <QuestionCard
            stepNumber={3}
            totalSteps={7}
            title="くせや広がり・湿気の影響は？"
            subtitle="キューティクルの疎水性コントロールと毛流れ補正を分析"
            options={[
              "直毛・ストンとしていてボリュームが出にくい",
              "うねる・毛先がまとまりにくい",
              "雨や湿気ですぐに広がる・パサつく",
              "縮毛矯正やパーマを定期的にかけている"
            ]}
            selectedOption={profile.frizzWave}
            onSelect={(val) => {
              updateProfile('frizzWave', val);
              setActiveBottleIndex(2); // Chronologiste
              setStep(QuizStep.Q4_DAMAGE_LEVEL);
            }}
            onBack={() => setStep(QuizStep.Q2_SCALP_TYPE)}
          />
        )}

        {step === QuizStep.Q4_DAMAGE_LEVEL && (
          <QuestionCard
            stepNumber={4}
            totalSteps={7}
            title="現在の髪のダメージレベルは？"
            subtitle="ケラチン結合と内部ケラチン補修の深度を決定します"
            options={[
              "カラーやパーマはしていない（健康毛）",
              "定期的にカラー（全体染め・白髪染め）をしている",
              "毎日のヘアアイロン・コテの使用頻度が高い",
              "ブリーチやハイライトを繰り返している（ハイダメージ）"
            ]}
            selectedOption={profile.damageLevel}
            onSelect={(val) => {
              updateProfile('damageLevel', val);
              setActiveBottleIndex(0); // Blond Absolu for damage
              setStep(QuizStep.Q5_AGING_CARE);
            }}
            onBack={() => setStep(QuizStep.Q3_FRIZZ_WAVE)}
          />
        )}

        {step === QuizStep.Q5_AGING_CARE && (
          <QuestionCard
            stepNumber={5}
            totalSteps={7}
            title="年齢に伴うエイジング変化は？"
            subtitle="頭皮と髪の複合エイジングサインに合わせた成分を選定"
            options={[
              "特に感じない",
              "抜け毛が増えた・分け目の地肌が気になる",
              "髪が細くなり、根元のハリ・コシ・ボリュームが減った",
              "パサつきや白髪染めによるゴワつきが気になる"
            ]}
            selectedOption={profile.agingCare}
            onSelect={(val) => {
              updateProfile('agingCare', val);
              setActiveBottleIndex(2); // Chronologiste
              setStep(QuizStep.Q6_IDEAL_FINISH);
            }}
            onBack={() => setStep(QuizStep.Q4_DAMAGE_LEVEL)}
          />
        )}

        {step === QuizStep.Q6_IDEAL_FINISH && (
          <QuestionCard
            stepNumber={6}
            totalSteps={7}
            title="あなたが求める理想の仕上がり質感は？"
            subtitle="日々のスタイリングと手触りの好みを反映します"
            options={[
              "サラサラと軽やかで、指通りの良いシルキーな仕上がり",
              "しっとり重みがあり、毛先までまとまる濃密な仕上がり",
              "見惚れるようなツヤとなめらかさを極めた仕上がり",
              "根元からふんわりと立ち上がる、ハリ・コシのある仕上がり"
            ]}
            selectedOption={profile.idealFinish}
            onSelect={(val) => {
              updateProfile('idealFinish', val);
              setActiveBottleIndex(3); // Elixir Ultime
              setStep(QuizStep.Q7_PRIORITY);
            }}
            onBack={() => setStep(QuizStep.Q5_AGING_CARE)}
          />
        )}

        {step === QuizStep.Q7_PRIORITY && (
          <QuestionCard
            stepNumber={7}
            totalSteps={7}
            title="今、最も最優先で解決したいケアは？"
            subtitle="診断結果の集中トリートメント（最重要60%）を決定づけます"
            options={[
              "徹底的なダメージ補修（切れ毛・枝毛・パサつき改善）",
              "頭皮環境の改善（スカルプケア・抜け毛・ニオイ予防）",
              "くせ毛のコントロール・湿気対策（まとまりキープ）",
              "ヘアカラーの色持ち維持・艶めきキープ"
            ]}
            selectedOption={profile.carePriority}
            onSelect={(val) => {
              updateProfile('carePriority', val);
              completeDiagnosis();
            }}
            onBack={() => setStep(QuizStep.Q6_IDEAL_FINISH)}
          />
        )}

        {step === QuizStep.LOADING && <LoadingScreen />}

        {step === QuizStep.RESULTS && result && (
          <ResultsView
            result={result}
            onReset={reset}
            onFocusBottle={(idx) => setActiveBottleIndex(idx)}
          />
        )}
      </main>

      {/* 4. Fullscreen 3D Bottle Studio Modal */}
      {show3DFullscreenViewer && (
        <div className="fixed inset-0 z-50 bg-[#070709]/95 backdrop-blur-2xl flex flex-col p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Move3d className="w-5 h-5 text-amber-300" />
              <h3 className="font-serif-luxury text-sm tracking-widest text-white uppercase font-bold">
                KÉRASTASE 3D STUDIO INSPECTION
              </h3>
            </div>
            <button
              onClick={() => setShow3DFullscreenViewer(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 3D Canvas in Modal */}
          <div className="flex-1 relative rounded-3xl overflow-hidden border border-white/15 bg-black/50">
            <ThreeScene
              step={QuizStep.RESULTS}
              activeProductIndex={activeBottleIndex}
              isInteractive={true}
              compactMode={true}
            />

            {/* Bottle Navigation Overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/15">
              {BOTTLE_CATALOG.map((b, idx) => (
                <button
                  key={b.id}
                  onClick={() => setActiveBottleIndex(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                    activeBottleIndex === idx
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-lg'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {b.line.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-slate-400 tracking-wider">
              画面を指でドラッグして360°回転 · ボトルの光沢とオイルテクスチャーを立体確認できます
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
