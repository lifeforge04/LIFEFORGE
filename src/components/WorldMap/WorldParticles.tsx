import React, { useMemo } from 'react';
import { WeatherType, TimeOfDay } from '../../types';

interface WorldParticlesProps {
  weather: WeatherType;
  timeOfDay: TimeOfDay;
  streak: number;
}

export const WorldParticles: React.FC<WorldParticlesProps> = ({ weather, timeOfDay, streak }) => {
  // Fireflies (active at dusk/night or with 3+ day streak or when weather is fireflies)
  const showFireflies = streak >= 3 || timeOfDay === 'night' || timeOfDay === 'dusk' || weather === 'fireflies';

  const fireflies = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${15 + (i * 3.4) % 75}%`,
      top: `${35 + ((i * 7.1) % 55)}%`,
      delay: `${(i * 0.35) % 4}s`,
      duration: `${4 + (i % 5)}s`,
      size: 3 + (i % 4),
    }));
  }, []);

  // Falling blossom petals (active in spring/blossoms weather or day)
  const showBlossoms = weather === 'blossoms' || weather === 'clear';

  const petals = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.7) % 95}%`,
      delay: `${(i * 0.6) % 8}s`,
      duration: `${7 + (i % 6)}s`,
      sway: `${20 + (i % 30)}px`,
      size: 6 + (i % 5),
    }));
  }, []);

  // Rain drops
  const showRain = weather === 'gentle_rain';
  const raindrops = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${(i * 2.6) % 100}%`,
      delay: `${(i * 0.12) % 2}s`,
      duration: `${0.8 + (i % 4) * 0.1}s`,
    }));
  }, []);

  // Aurora effect for 30+ day streak
  const showAurora = streak >= 30 && (timeOfDay === 'night' || timeOfDay === 'dusk');

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20" aria-hidden="true">
      {/* 30-day streak Celestial Aurora */}
      {showAurora && (
        <div className="absolute top-0 inset-x-0 h-72 opacity-60 mix-blend-screen overflow-hidden">
          <div
            className="w-full h-full animate-pulse"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, rgba(52, 211, 153, 0.45) 0%, rgba(59, 130, 246, 0.35) 40%, rgba(168, 85, 247, 0.25) 70%, transparent 100%)',
              filter: 'blur(30px)',
            }}
          />
        </div>
      )}

      {/* Floating Fireflies */}
      {showFireflies &&
        fireflies.map((f) => (
          <div
            key={`ff-${f.id}`}
            className="absolute rounded-full bg-amber-300 shadow-[0_0_8px_3px_rgba(251,191,36,0.85)] animate-[float-firefly_6s_ease-in-out_infinite]"
            style={{
              left: f.left,
              top: f.top,
              width: `${f.size}px`,
              height: `${f.size}px`,
              animationDelay: f.delay,
              animationDuration: f.duration,
            }}
          />
        ))}

      {/* Falling Blossom Petals */}
      {showBlossoms &&
        petals.map((p) => (
          <div
            key={`petal-${p.id}`}
            className="absolute bg-rose-200/80 rounded-tl-full rounded-br-full shadow-sm animate-[drift-petal_9s_linear_infinite]"
            style={{
              left: p.left,
              top: '-20px',
              width: `${p.size}px`,
              height: `${p.size * 0.7}px`,
              animationDelay: p.delay,
              animationDuration: p.duration,
              transform: 'rotate(25deg)',
            }}
          />
        ))}

      {/* Gentle Rain */}
      {showRain &&
        raindrops.map((r) => (
          <div
            key={`rain-${r.id}`}
            className="absolute w-[1.5px] h-8 bg-gradient-to-b from-transparent to-cyan-300/60 animate-[rain-fall_1s_linear_infinite]"
            style={{
              left: r.left,
              top: '-40px',
              animationDelay: r.delay,
              animationDuration: r.duration,
            }}
          />
        ))}
    </div>
  );
};
