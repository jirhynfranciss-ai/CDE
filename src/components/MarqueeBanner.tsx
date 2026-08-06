import { motion } from 'framer-motion';

const items = [
  '✦ CIRCULO DE ENTABLADO',
  '✦ USTP THEATRE ARTS',
  '✦ CDO\'S PREMIER STAGE',
  '✦ WHERE STORIES COME ALIVE',
  '✦ EST. AT USTP CDO',
  '✦ AWARD-WINNING THEATRE',
];

export default function MarqueeBanner() {
  const doubled = [...items, ...items];

  return (
    <div className="relative bg-[#970000] border-y border-[#D4AF37]/30 overflow-hidden py-3">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#970000] via-transparent to-[#970000] z-10 pointer-events-none" />

      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="font-cinzel text-[#D4AF37] text-xs tracking-[0.4em] flex-shrink-0">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
