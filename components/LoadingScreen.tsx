
import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white">
      <div className="flex space-x-2 mb-6">
        <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
      <p className="text-xs tracking-widest text-gray-500 uppercase">
        Analyzing...
      </p>
    </div>
  );
};

export default LoadingScreen;
