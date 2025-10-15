'use client';

import { useState, useEffect } from 'react';

export default function CowTickleApp() {
  const [isTickled, setIsTickled] = useState(false);
  const [mooCount, setMooCount] = useState(0);
  const [showMoo, setShowMoo] = useState(false);
  const [cowExpression, setCowExpression] = useState('😊');

  const expressions = ['😊', '😄', '🤣', '😆', '🥰', '😋'];
  const mooSounds = ['Moo!', 'Mooo!', 'Moooo!', 'MOO!', 'Moo moo!', 'MOOOOO!'];

  const tickleCow = () => {
    setIsTickled(true);
    setMooCount(prev => prev + 1);
    setShowMoo(true);
    
    // Random happy expression
    const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
    setCowExpression(randomExpression);

    // Play moo sound effect (visual feedback)
    setTimeout(() => {
      setShowMoo(false);
    }, 1500);

    // Reset tickle animation
    setTimeout(() => {
      setIsTickled(false);
      setCowExpression('😊');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-green-200 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          🐄 Tickle the Cow! 🐄
        </h1>
        <p className="text-lg text-green-700">
          Click on the cow to tickle it and hear it moo!
        </p>
        <div className="mt-4 text-xl font-semibold text-green-800">
          Moos: {mooCount}
        </div>
      </div>

      <div className="relative">
        {/* Moo speech bubble */}
        {showMoo && (
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-lg border-2 border-gray-300 animate-bounce">
            <div className="text-2xl font-bold text-green-800">
              {mooSounds[Math.floor(Math.random() * mooSounds.length)]}
            </div>
            <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white"></div>
          </div>
        )}

        {/* The Cow */}
        <div 
          onClick={tickleCow}
          className={`cursor-pointer select-none transition-all duration-300 hover:scale-105 ${
            isTickled ? 'animate-pulse scale-110' : ''
          }`}
        >
          <div className="text-center">
            {/* Cow body */}
            <div className="relative">
              <div className="text-8xl mb-4">🐄</div>
              {/* Cow face overlay */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-4xl">
                {cowExpression}
              </div>
            </div>
          </div>
        </div>

        {/* Tickle effects */}
        {isTickled && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 text-2xl animate-ping">✨</div>
            <div className="absolute top-0 right-0 text-2xl animate-ping animation-delay-100">⭐</div>
            <div className="absolute bottom-0 left-0 text-2xl animate-ping animation-delay-200">💫</div>
            <div className="absolute bottom-0 right-0 text-2xl animate-ping animation-delay-300">✨</div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <p className="text-green-700 mb-4">
          The cow loves being tickled! Keep clicking for more moos! 🎉
        </p>
        
        {mooCount > 0 && (
          <div className="bg-white/50 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="font-bold text-green-800 mb-2">Cow Status:</h3>
            <div className="text-green-700">
              {mooCount < 5 && "The cow is getting happy! 😊"}
              {mooCount >= 5 && mooCount < 10 && "The cow is very happy! 😄"}
              {mooCount >= 10 && mooCount < 20 && "The cow is laughing with joy! 🤣"}
              {mooCount >= 20 && mooCount < 50 && "The cow is absolutely delighted! 🥰"}
              {mooCount >= 50 && "The cow is in tickle heaven! 🌟"}
            </div>
          </div>
        )}
      </div>

      {/* Reset button */}
      {mooCount > 0 && (
        <button
          onClick={() => {
            setMooCount(0);
            setCowExpression('😊');
          }}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200"
        >
          Reset Moo Counter
        </button>
      )}
    </div>
  );
}

