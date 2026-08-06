import { useEffect, useState } from 'react';

export default function SpotlightCursor() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9998]"
      style={{
        background: `radial-gradient(circle 300px at ${pos.x}px ${pos.y}px, rgba(212,175,55,0.04) 0%, transparent 70%)`,
      }}
    />
  );
}
