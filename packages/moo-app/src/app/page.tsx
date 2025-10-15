'use client';

import { useState, useEffect } from 'react';

export default function CowTickleApp() {
  const [isTickling, setIsTickling] = useState(false);
  const [mooCount, setMooCount] = useState(0);
  const [cowExpression, setCowExpression] = useState('😊');
  const [showMoo, setShowMoo] = useState(false);
  const [tickleSpots, setTickleSpots] = useState<Array<{id: number, x: number, y: number}>>([]);

  const cowExpressions = ['😊', '😄', '🤣', '😆', '😂'];
  const mooSounds = ['Moo!', 'MOOO!', 'Moooo!', 'MOO MOO!', 'MOOOOO!'];

  const handleTickle = (event: React.MouseEvent) => {
    setIsTickling(true);
    setMooCount(prev => prev + 1);
    setShowMoo(true);
    
    // Change cow expression randomly
    const randomExpression = cowExpressions[Math.floor(Math.random() * cowExpressions.length)];
    setCowExpression(randomExpression);

    // Add tickle effect at click position
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newTickleSpot = {
      id: Date.now(),
      x: x,
      y: y
    };
    
    setTickleSpots(prev => [...prev, newTickleSpot]);

    // Reset states after animation
    setTimeout(() => {
      setIsTickling(false);
      setShowMoo(false);
      setCowExpression('😊');
    }, 1000);

    // Remove tickle spot after animation
    setTimeout(() => {
      setTickleSpots(prev => prev.filter(spot => spot.id !== newTickleSpot.id));
    }, 2000);
  };

  const resetCounter = () => {
    setMooCount(0);
    setTickleSpots([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-green-200 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold text-green-800 mb-4 drop-shadow-lg">
          🐄 Tickle the Cow! 🐄
        </h1>
        <p className="text-2xl text-green-700 mb-4">
          Click anywhere on the cow to tickle it and make it moo!
        </p>
        <div className="text-xl text-green-600">
          Moo Count: <span className="font-bold text-3xl text-green-800">{mooCount}</span>
        </div>
      </div>

      <div className="relative">
        {/* Cow Body */}
        <div 
          className={`relative cursor-pointer transition-all duration-300 ${
            isTickling ? 'animate-bounce scale-110' : 'hover:scale-105'
          }`}
          onClick={handleTickle}
        >
          {/* Main cow body */}
          <div className="text-[200px] select-none relative">
            🐄
          </div>
          
          {/* Cow face expression overlay */}
          <div className={`absolute top-8 left-16 text-6xl transition-all duration-300 ${
            isTickling ? 'animate-pulse' : ''
          }`}>
            {cowExpression}
          </div>

          {/* Moo text */}
          {showMoo && (
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="bg-white rounded-full px-6 py-3 shadow-lg border-4 border-green-500">
                <span className="text-3xl font-bold text-green-800">
                  {mooSounds[Math.floor(Math.random() * mooSounds.length)]}
                </span>
              </div>
              {/* Speech bubble tail */}
              <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent border-t-white mx-auto -mt-1"></div>
            </div>
          )}

          {/* Tickle effects */}
          {tickleSpots.map(spot => (
            <div
              key={spot.id}
              className="absolute pointer-events-none animate-ping"
              style={{
                left: spot.x - 15,
                top: spot.y - 15,
              }}
            >
              <div className="text-3xl">✨</div>
            </div>
          ))}
        </div>

        {/* Floating hearts when tickling */}
        {isTickling && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce text-4xl"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 3) * 20}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                💖
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fun facts and controls */}
      <div className="mt-8 text-center">
        <div className="bg-white/80 rounded-lg p-6 shadow-lg max-w-md">
          <h3 className="text-xl font-bold text-green-800 mb-3">Fun Cow Facts! 🌟</h3>
          <p className="text-green-700 mb-4">
            {mooCount === 0 && "Cows are very social animals and love attention!"}
            {mooCount > 0 && mooCount < 5 && "This cow is starting to enjoy the tickles!"}
            {mooCount >= 5 && mooCount < 10 && "Wow! This cow is having so much fun!"}
            {mooCount >= 10 && mooCount < 20 && "You're making this cow super happy! 🎉"}
            {mooCount >= 20 && "This is the happiest cow in the world! 🌟"}
          </p>
          
          {mooCount > 0 && (
            <button
              onClick={resetCounter}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200 shadow-lg"
            >
              Reset Moo Counter
            </button>
          )}
        </div>
      </div>

      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-6xl opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {['🌸', '🌼', '🦋', '🌿'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>
    </div>
  );
}

