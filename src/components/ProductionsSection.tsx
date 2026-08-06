import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import type { Production } from '../lib/supabase';
import { format } from 'date-fns';

interface ProductionCardProps {
  production: Production;
  index: number;
}

function ProductionCard({ production, index }: ProductionCardProps) {
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
      <div className={`theatre-card overflow-hidden transition-all duration-500 ${
        hovered ? 'border-[#D4AF37]/60 shadow-[0_0_40px_rgba(212,175,55,0.15)]' : ''
      }`}>
        {/* Poster image */}
        <div className="relative h-72 sm:h-80 overflow-hidden">
          <img
            src={production.poster_url}
            alt={production.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay with poster-like treatment */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          {/* Vintage poster color treatment */}
          <div className={`absolute inset-0 mix-blend-multiply ${
            production.status === 'upcoming' ? 'bg-[#970000]/20' : 'bg-[#4a3000]/20'
          }`} />

          {/* Spotlight effect on hover */}
          <motion.div
            className="absolute inset-0"
            animate={hovered ? { opacity: 0.3 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ background: 'radial-gradient(circle at 50% 30%, rgba(212,175,55,0.5), transparent 60%)' }}
          />

          {/* Status badge */}
          <div className="absolute top-4 left-4">
            <div className={`px-3 py-1 border text-[10px] font-cinzel tracking-widest uppercase ${
              production.status === 'upcoming'
                ? 'bg-[#db0000]/80 border-[#db0000] text-white'
                : 'bg-black/70 border-[#D4AF37]/50 text-[#D4AF37]'
            }`}>
              {production.status === 'upcoming' ? '★ UPCOMING' : '✓ PAST SHOW'}
            </div>
          </div>

          {/* Marquee-style title at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="font-cinzel text-white font-bold text-xl leading-tight mb-2 group-hover:text-[#D4AF37] transition-colors duration-300"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              {production.title}
            </h3>
            {/* Ticket stub date */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-[#D4AF37]/60 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
              </div>
              <span className="font-cinzel text-[#D4AF37] text-xs tracking-widest">
                {format(new Date(production.production_date), 'MMMM dd, yyyy')}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <p className="font-cormorant text-white/70 text-base leading-relaxed mb-4 line-clamp-3">
            {production.description}
          </p>

          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent mb-4" />

          {/* Cast info */}
          <div className="flex items-start gap-3">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0">
              <circle cx="8" cy="5" r="3" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
              <path d="M2 15 Q2 10 8 10 Q14 10 14 15" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
            </svg>
            <p className="font-cormorant text-white/50 text-sm leading-relaxed italic line-clamp-2">
              {production.cast_info}
            </p>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-[2px] bg-gradient-to-r from-[#970000] via-[#D4AF37] to-[#970000] opacity-50" />
      </div>
    </motion.div>
  );
}

interface Props {
  productions: Production[];
}

export default function ProductionsSection({ productions }: Props) {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [filter, setFilter] = useState<'all' | 'past' | 'upcoming'>('all');

  const filtered = filter === 'all' ? productions : productions.filter(p => p.status === filter);

  return (
    <section id="productions" className="relative py-24 bg-gradient-to-b from-[#050000] to-black overflow-hidden">
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
            — On the Stage —
          </span>
          <h2 className="font-cinzel font-bold text-4xl sm:text-5xl lg:text-6xl text-[#970000] mb-4"
            style={{ textShadow: '0 0 30px rgba(151,0,0,0.3)' }}>
            Productions
          </h2>
          <p className="font-playfair italic text-white/60 text-xl max-w-2xl mx-auto mb-8">
            From classic masterpieces to bold original works — stories that live forever
          </p>

          {/* Filter badges */}
          <div className="flex flex-wrap justify-center gap-3">
            {(['all', 'upcoming', 'past'] as const).map((f) => (
              <motion.button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 font-cinzel text-xs tracking-widest uppercase border transition-all duration-300 ${
                  filter === f
                    ? 'bg-[#970000] border-[#D4AF37] text-[#D4AF37]'
                    : 'border-[#636363] text-white/60 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {f === 'all' ? '✦ All Shows' : f === 'upcoming' ? '★ Upcoming' : '✓ Past Shows'}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Productions Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8"
        >
          {filtered.map((production, index) => (
            <ProductionCard key={production.id} production={production} index={index} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">🎭</span>
            <p className="font-cormorant text-white/50 text-xl">No productions found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
