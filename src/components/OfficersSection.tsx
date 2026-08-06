import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import type { Officer } from '../lib/supabase';

const officerInitials = (name: string) => {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
};

const positionColors: Record<string, string> = {
  'President': '#D4AF37',
  'Vice President': '#970000',
  'Secretary': '#D4AF37',
  'Treasurer': '#D4AF37',
  'Creative Director': '#D4AF37',
  'Technical Director': '#D4AF37',
};

interface OfficerCardProps {
  officer: Officer;
  index: number;
}

function OfficerCard({ officer, index }: OfficerCardProps) {
  const [cardRef, cardInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={cardInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group text-center relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`theatre-card p-6 sm:p-8 transition-all duration-500 ${
        hovered ? 'border-[#D4AF37]/70 shadow-[0_0_40px_rgba(212,175,55,0.15)]' : ''
      }`}>
        {/* Photo frame */}
        <div className="relative mx-auto mb-6 w-32 h-32 sm:w-40 sm:h-40">
          {/* Ornate circular frame */}
          <motion.div
            className="absolute -inset-3 rounded-full border-2 border-[#D4AF37]/30"
            animate={hovered ? { borderColor: 'rgba(212,175,55,0.8)', scale: 1.05 } : { borderColor: 'rgba(212,175,55,0.3)', scale: 1 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="absolute -inset-1 rounded-full border border-[#D4AF37]/20"
            animate={hovered ? { borderColor: 'rgba(212,175,55,0.4)', rotate: 180 } : { borderColor: 'rgba(212,175,55,0.2)', rotate: 0 }}
            transition={{ duration: 2 }}
          />

          {/* Photo or initials */}
          <div className="relative w-full h-full rounded-full overflow-hidden">
            {officer.photo_url ? (
              <img
                src={officer.photo_url}
                alt={officer.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-3xl font-cinzel font-bold"
                style={{
                  background: `radial-gradient(circle at 30% 30%, rgba(151,0,0,0.8), rgba(50,0,0,0.95))`,
                  color: '#D4AF37',
                  textShadow: '0 0 10px rgba(212,175,55,0.5)',
                }}
              >
                {officerInitials(officer.name)}
              </div>
            )}

            {/* Hover spotlight */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={hovered ? { opacity: 0.3 } : { opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ background: 'radial-gradient(circle at 50% 30%, rgba(212,175,55,0.6), transparent 70%)' }}
            />
          </div>

          {/* Glow effect */}
          {hovered && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}
            />
          )}
        </div>

        {/* Name */}
        <h3 className="font-cinzel text-white font-bold text-lg sm:text-xl mb-2 leading-tight group-hover:text-[#D4AF37] transition-colors duration-300">
          {officer.name}
        </h3>

        {/* Position with gold accent underline */}
        <div className="relative inline-block mb-4">
          <span
            className="font-cinzel text-xs sm:text-sm tracking-widest uppercase"
            style={{ color: positionColors[officer.position] || '#D4AF37' }}
          >
            {officer.position}
          </span>
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{ background: positionColors[officer.position] || '#D4AF37' }}
            animate={hovered ? { scaleX: 1 } : { scaleX: 0.3 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Bio - revealed on hover */}
        <motion.div
          animate={hovered ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="font-cormorant text-white/65 text-sm leading-relaxed mb-4 px-2">
            {officer.description}
          </p>
        </motion.div>

        {/* Static short bio */}
        <p className={`font-cormorant text-white/55 text-sm leading-relaxed line-clamp-2 ${hovered ? 'hidden' : ''}`}>
          {officer.description}
        </p>

        {/* Social links */}
        {(officer.social_links?.facebook || officer.social_links?.instagram) && (
          <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-[#D4AF37]/15">
            {officer.social_links.facebook && (
              <motion.a
                href={officer.social_links.facebook}
                className="w-8 h-8 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]/60 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 text-xs"
                whileHover={{ scale: 1.1 }}
              >
                f
              </motion.a>
            )}
            {officer.social_links.instagram && (
              <motion.a
                href={officer.social_links.instagram}
                className="w-8 h-8 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]/60 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 text-xs"
                whileHover={{ scale: 1.1 }}
              >
                ◎
              </motion.a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface Props {
  officers: Officer[];
}

export default function OfficersSection({ officers }: Props) {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  // Sort: president first, then rest
  const sorted = [...officers].sort((a, b) => a.display_order - b.display_order);

  return (
    <section id="officers" className="relative py-24 bg-gradient-to-b from-black via-[#030000] to-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-cinzel text-[#D4AF37] text-xs tracking-[0.5em] uppercase mb-4 block">
            — The Cast of Leaders —
          </span>
          <h2 className="font-cinzel font-bold text-4xl sm:text-5xl lg:text-6xl text-[#970000] mb-4"
            style={{ textShadow: '0 0 30px rgba(151,0,0,0.3)' }}>
            Officers & Leadership
          </h2>
          <p className="font-playfair italic text-white/60 text-xl max-w-2xl mx-auto mb-8">
            The visionary leaders who direct CDE's story on and off the stage
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-24 sm:w-40 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
              <circle cx="14" cy="14" r="6" fill="none" stroke="#D4AF37" strokeWidth="1"/>
              <circle cx="14" cy="14" r="2" fill="#D4AF37"/>
            </svg>
            <div className="h-[1px] w-24 sm:w-40 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </motion.div>

        {/* Officers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sorted.map((officer, index) => (
            <OfficerCard key={officer.id} officer={officer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
