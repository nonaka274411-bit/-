
import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);
  const messages = [
    "髪の状態を解析しています",
    "最適な成分を厳選中",
    "あなただけのリチュアルを構築"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-12">
      <div className="relative">
        <div className="w-16 h-16 border-[0.5px] border-[#c5a059]/20 rounded-full animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-[#c5a059] rounded-full animate-ping" />
        </div>
      </div>
      <div className="text-center space-y-4">
        <span className="text-[8px] tracking-[0.6em] text-[#c5a059] uppercase font-bold">Refining Science</span>
        <div className="h-4 overflow-hidden">
          <p className="text-gray-400 text-[11px] font-light italic transition-opacity duration-1000 animate-in fade-in">
            {messages[msgIdx]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
