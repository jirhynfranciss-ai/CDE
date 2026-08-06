import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import type { Testimonial } from '../lib/supabase';

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: Props) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  const active = testimonials[current];

  return (
    <section id="testimonials" className="relative py-24 bg-gradient-to-b from-[#050000] to-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      {/* Background */}
      <div className="absolute inset-0">
        <img src="/images/stage-bg.jpg" alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-black/90" />
      </div>

      {/* Spotlight beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-full pointer-events-none opacity-5"
        style={{ background: 'conic-gradient(from 0deg at 50% 0%, transparent 20deg, rgba(212,175,55,1) 30deg, transparent 40deg)' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-cinzel text-[#D4AF37] text-xs tracking-[0.5em] uppercase mb-4 block">
            — Voices from the Stage —
          </span>
          <h2 className="font-cinzel font-bold text-4xl sm:text-5xl lg:text-6xl text-[#970000] mb-4"
            style={{ textShadow: '0 0 30px rgba(151,0,0,0.3)' }}>
            Testimonials
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="theatre-card p-8 sm:p-12 relative overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500">
            {/* Gold corner ornaments */}
            {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-8 h-8 z-10`}>
                <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                  <path d="M0 0 L32 0 L32 4 L4 4 L4 32 L0 32 Z" fill="#D4AF37" opacity="0.6"/>
                </svg>
              </div>
            ))}

            {/* Spotlight glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.05) 0%, transparent 60%)' }}
            />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="text-center"
              >
                {/* Giant quote mark */}
                <div className="flex justify-center mb-6">
                  <svg width="60" height="45" viewBox="0 0 60 45" fill="none" className="opacity-20">
                    <path d="M0 30 Q3 8 18 4 Q14 18 18 30 Q9 30 0 30 Z" fill="#D4AF37"/>
                    <path d="M30 30 Q33 8 48 4 Q44 18 48 30 Q39 30 30 30 Z" fill="#D4AF37"/>
                    <path d="M0 38 Q9 44 18 38" stroke="#D4AF37" strokeWidth="1" fill="none"/>
                    <path d="M30 38 Q39 44 48 38" stroke="#D4AF37" strokeWidth="1" fill="none"/>
                  </svg>
                </div>

                {/* Testimonial text */}
                <p className="font-fell italic text-white/90 text-xl sm:text-2xl leading-relaxed mb-8 max-w-3xl mx-auto">
                  "{active.testimonial_text}"
                </p>

                {/* Divider */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]" style={{ boxShadow: '0 0 6px #D4AF37' }} />
                  <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
                </div>

                {/* Person info */}
                <div className="flex flex-col items-center gap-3">
                  {/* Photo or initials */}
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full border border-[#D4AF37]/30" />
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#D4AF37]/50">
                      {active.photo_url ? (
                        <img src={active.photo_url} alt={active.member_name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-cinzel text-[#D4AF37] text-xl font-bold"
                          style={{ background: 'radial-gradient(circle, rgba(151,0,0,0.8), rgba(50,0,0,0.95))' }}>
                          {active.member_name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="font-cinzel text-[#D4AF37] text-sm tracking-widest font-bold">
                      {active.member_name}
                    </div>
                    <div className="font-cormorant text-white/50 text-sm italic">
                      {active.member_role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {/* Prev */}
            <motion.button
              onClick={() => navigate(-1)}
              className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]/60 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ←
            </motion.button>

            {/* Seat number dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="relative w-6 h-6 flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                >
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]/20'
                  }`}
                    style={i === current ? { boxShadow: '0 0 8px #D4AF37' } : {}}
                  />
                </motion.button>
              ))}
            </div>

            {/* Next */}
            <motion.button
              onClick={() => navigate(1)}
              className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]/60 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              →
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
