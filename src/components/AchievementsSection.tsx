import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import type { Achievement } from '../lib/supabase';
import { format } from 'date-fns';

const categoryColors: Record<string, string> = {
  'Award': '#D4AF37',
  'Competition': '#970000',
  'Individual Award': '#D4AF37',
  'Institutional Award': '#636363',
  'Performance Award': '#970000',
  'Civic Award': '#D4AF37',
};

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

function AchievementCard({ achievement, index }: AchievementCardProps) {
  const [cardRef, cardInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Confetti particles on hover */}
      {hovered && (
        <div className="absolute -top-2 left-0 right-0 pointer-events-none overflow-hidden h-20 z-20">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                background: i % 2 === 0 ? '#D4AF37' : '#970000',
              }}
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: -60, opacity: 0, x: (Math.random() - 0.5) * 30 }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          ))}
        </div>
      )}

      <div className={`theatre-card relative overflow-hidden transition-all duration-500 ${
        hovered ? 'border-[#D4AF37]/70 shadow-[0_0_30px_rgba(212,175,55,0.2)]' : ''
      }`}>
        {/* Category badge */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className="font-cinzel text-[10px] tracking-widest uppercase px-2 py-1 border"
            style={{
              color: categoryColors[achievement.category] || '#D4AF37',
              borderColor: (categoryColors[achievement.category] || '#D4AF37') + '50',
              background: 'rgba(0,0,0,0.8)',
            }}
          >
            {achievement.category}
          </span>
        </div>

        {/* Achievement image */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={achievement.image_url}
            alt={achievement.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          {/* Gold sparkle effect */}
          <motion.div
            className="absolute inset-0"
            animate={hovered ? { opacity: [0, 0.15, 0] } : { opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.4) 0%, transparent 70%)' }}
          />

          {/* Trophy icon */}
          <div className="absolute bottom-4 left-4">
            <div className="w-10 h-10 rounded-full bg-[#970000] border-2 border-[#D4AF37] flex items-center justify-center"
              style={{ boxShadow: hovered ? '0 0 15px rgba(212,175,55,0.5)' : 'none' }}>
              <span className="text-lg">🏆</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {/* Date stamp */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-[#D4AF37]" />
            <span className="font-cinzel text-[#D4AF37] text-xs tracking-widest">
              {format(new Date(achievement.date_achieved), 'MMMM dd, yyyy')}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-playfair text-white font-bold text-lg leading-tight mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
            {achievement.title}
          </h3>

          {/* Description */}
          <p className="font-cormorant text-white/65 text-base leading-relaxed mb-4 line-clamp-3">
            {achievement.description}
          </p>

          {/* Gold divider */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent mb-4" />

          {/* Quote/Message */}
          {achievement.message && (
            <div className="relative pl-4 border-l border-[#D4AF37]/40">
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none" className="absolute -top-1 -left-1 opacity-30">
                <path d="M0 10 Q1.5 3 7 1.5 Q5.5 7 7 10 Q3.5 10 0 10 Z" fill="#D4AF37"/>
                <path d="M10 10 Q11.5 3 17 1.5 Q15.5 7 17 10 Q13.5 10 10 10 Z" fill="#D4AF37"/>
              </svg>
              <p className="font-fell italic text-white/50 text-sm leading-relaxed">
                {achievement.message}
              </p>
            </div>
          )}
        </div>

        {/* Bottom gold border */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

        {/* Award ribbon decoration */}
        <div className="absolute top-0 left-0 w-0 h-0"
          style={{
            borderTop: '40px solid rgba(151,0,0,0.6)',
            borderRight: '40px solid transparent',
          }}
        />
        <div className="absolute top-0 left-0 flex items-start">
          <span className="text-[10px] text-white/80 ml-1 mt-1">✦</span>
        </div>
      </div>
    </motion.div>
  );
}

interface Props {
  achievements: Achievement[];
}

export default function AchievementsSection({ achievements }: Props) {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="achievements" className="relative py-24 bg-gradient-to-b from-[#050000] to-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      {/* Art deco background pattern */}
      <div className="absolute inset-0 opacity-3 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 bottom-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(212,175,55,0.02) 35px, rgba(212,175,55,0.02) 70px),
              repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(212,175,55,0.02) 35px, rgba(212,175,55,0.02) 70px)
            `,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-cinzel text-[#D4AF37] text-xs tracking-[0.5em] uppercase mb-4 block">
            — Recognition & Honors —
          </span>
          <h2 className="font-cinzel font-bold text-4xl sm:text-5xl lg:text-6xl text-[#970000] mb-4"
            style={{ textShadow: '0 0 30px rgba(151,0,0,0.3)' }}>
            Achievements & Awards
          </h2>
          <p className="font-playfair italic text-white/60 text-xl max-w-2xl mx-auto mb-8">
            A constellation of triumphs illuminating the heights CDE has reached
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-24 sm:w-40 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
              <path d="M16 2 L19 11 L29 11 L21 17 L24 26 L16 20 L8 26 L11 17 L3 11 L13 11 Z" fill="#D4AF37"/>
            </svg>
            <div className="h-[1px] w-24 sm:w-40 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {achievements.map((achievement, index) => (
            <AchievementCard key={achievement.id} achievement={achievement} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
