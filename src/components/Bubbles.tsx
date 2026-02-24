import { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  color1: string;
  color2: string;
}

const colorPairs = [
  ['#a855f7', '#ec4899'],
  ['#3b82f6', '#06b6d4'],
  ['#f59e0b', '#f97316'],
  ['#22c55e', '#10b981'],
  ['#8b5cf6', '#a855f7'],
];

export default function Bubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const newBubbles: Bubble[] = [];
    for (let i = 0; i < 20; i++) {
      const colors = colorPairs[Math.floor(Math.random() * colorPairs.length)];
      newBubbles.push({
        id: i,
        size: Math.random() * 80 + 30,
        left: Math.random() * 100,
        duration: Math.random() * 8 + 15,
        delay: Math.random() * 15,
        color1: colors[0],
        color2: colors[1],
      });
    }
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            bottom: -bubble.size * 2,
            background: `linear-gradient(135deg, ${bubble.color1}40, ${bubble.color2}40)`,
            filter: 'blur(30px)',
            animation: `float-up ${bubble.duration}s linear ${bubble.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-120vh) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
