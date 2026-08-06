import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function MissionSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="mission" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/images/stage-bg.jpg" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95" />
      </div>

      {/* Spotlight beams */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-48 h-full opacity-5"
          style={{ background: 'conic-gradient(from 0deg at 50% 0%, transparent 20deg, rgba(212,175,55,1) 30deg, transparent 40deg)' }}
        />
        <div className="absolute top-0 right-1/3 w-48 h-full opacity-5"
          style={{ background: 'conic-gradient(from 0deg at 50% 0%, transparent 20deg, rgba(212,175,55,1) 30deg, transparent 40deg)' }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-cinzel text-[#D4AF37] text-xs tracking-[0.5em] uppercase mb-4 block">
            — Our Purpose —
          </span>
          <h2 className="font-cinzel font-bold text-4xl sm:text-5xl lg:text-6xl text-[#970000] mb-4"
            style={{ textShadow: '0 0 30px rgba(151,0,0,0.3)' }}>
            Mission & Vision
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative group"
          >
            {/* Stage curtain frame */}
            <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-b from-[#970000]/30 to-transparent" />
            <div className="absolute -top-3 left-4 right-4 h-3 bg-gradient-to-b from-[#970000]/20 to-transparent" />

            <div className="theatre-card relative p-8 sm:p-10 hover:border-[#D4AF37]/60 transition-all duration-500">
              {/* Gold corner ornaments */}
              {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-6 h-6 opacity-60`}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path d="M0 0 L24 0 L24 3 L3 3 L3 24 L0 24 Z" fill="#D4AF37"/>
                  </svg>
                </div>
              ))}

              {/* Spotlight glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%)' }}
              />

              {/* Label */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-12 bg-gradient-to-b from-[#D4AF37] to-[#970000]" />
                <div>
                  <span className="font-cinzel text-[#D4AF37] text-xs tracking-[0.4em] uppercase block">Our</span>
                  <h3 className="font-cinzel text-white font-bold text-2xl tracking-wider">MISSION</h3>
                </div>
              </div>

              {/* Theatrical quote mark */}
              <div className="mb-4">
                <svg width="40" height="32" viewBox="0 0 40 32" fill="none" className="opacity-40">
                  <path d="M0 20 Q3 6 14 3 Q11 14 14 20 Q7 20 0 20 Z" fill="#D4AF37"/>
                  <path d="M20 20 Q23 6 34 3 Q31 14 34 20 Q27 20 20 20 Z" fill="#D4AF37"/>
                </svg>
              </div>

              <p className="font-cormorant text-white/85 text-lg leading-relaxed italic">
                To cultivate the theatrical arts as a powerful medium of cultural expression, social commentary, and personal transformation — nurturing the artistic potential of every member while contributing to the vibrant cultural landscape of Mindanao and the Philippines.
              </p>

              <div className="mt-6 pt-6 border-t border-[#D4AF37]/20">
                <p className="font-cormorant text-white/70 text-base leading-relaxed">
                  We are committed to producing world-class theatre that challenges, inspires, and moves audiences while providing our members with exceptional training, mentorship, and opportunities for artistic growth.
                </p>
              </div>

              {/* Decorative bottom */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {[0,1,2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" style={{ opacity: 0.4 + i * 0.2 }} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-b from-[#970000]/30 to-transparent" />
            <div className="absolute -top-3 left-4 right-4 h-3 bg-gradient-to-b from-[#970000]/20 to-transparent" />

            <div className="theatre-card relative p-8 sm:p-10 hover:border-[#D4AF37]/60 transition-all duration-500">
              {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-6 h-6 opacity-60`}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path d="M0 0 L24 0 L24 3 L3 3 L3 24 L0 24 Z" fill="#D4AF37"/>
                  </svg>
                </div>
              ))}

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(151,0,0,0.08) 0%, transparent 70%)' }}
              />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-12 bg-gradient-to-b from-[#970000] to-[#D4AF37]" />
                <div>
                  <span className="font-cinzel text-[#D4AF37] text-xs tracking-[0.4em] uppercase block">Our</span>
                  <h3 className="font-cinzel text-white font-bold text-2xl tracking-wider">VISION</h3>
                </div>
              </div>

              <div className="mb-4">
                <svg width="40" height="32" viewBox="0 0 40 32" fill="none" className="opacity-40">
                  <path d="M0 20 Q3 6 14 3 Q11 14 14 20 Q7 20 0 20 Z" fill="#970000"/>
                  <path d="M20 20 Q23 6 34 3 Q31 14 34 20 Q27 20 20 20 Z" fill="#970000"/>
                </svg>
              </div>

              <p className="font-cormorant text-white/85 text-lg leading-relaxed italic">
                To be the most acclaimed and celebrated theatre organization in Mindanao — a beacon of artistic excellence that elevates Philippine theatre to international standards while remaining deeply rooted in our rich cultural heritage and Filipino identity.
              </p>

              <div className="mt-6 pt-6 border-t border-[#D4AF37]/20">
                <p className="font-cormorant text-white/70 text-base leading-relaxed">
                  We envision a future where every CDE production is an event of cultural significance, where our alumni become influential figures in Philippine arts, and where our stage becomes a sacred space for authentic human expression.
                </p>
              </div>

              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {[0,1,2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#970000]" style={{ opacity: 0.4 + i * 0.2 }} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-16"
        >
          <div className="text-center mb-10">
            <h3 className="font-cinzel text-[#D4AF37] text-xl tracking-widest">OUR CORE VALUES</h3>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🎭', title: 'Artistic Excellence', desc: 'Pursuing the highest standards in every performance' },
              { icon: '🤝', title: 'Camaraderie', desc: 'Building bonds that last a lifetime on and off the stage' },
              { icon: '💡', title: 'Innovation', desc: 'Pushing creative boundaries and reimagining storytelling' },
              { icon: '🌟', title: 'Cultural Pride', desc: 'Celebrating Filipino heritage through theatrical artistry' },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="theatre-card p-5 text-center hover:border-[#D4AF37]/50 transition-all duration-300 group"
              >
                <div className="text-3xl mb-3">{value.icon}</div>
                <h4 className="font-cinzel text-[#D4AF37] text-xs sm:text-sm tracking-wider mb-2">{value.title}</h4>
                <p className="font-cormorant text-white/60 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
