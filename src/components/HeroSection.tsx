import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

export default function HeroSection() {
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate particles
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 8,
      drift: (Math.random() - 0.5) * 100,
    }));
    setParticles(newParticles);

    // Open curtains after a brief delay
    const timer1 = setTimeout(() => setCurtainsOpen(true), 800);
    const timer2 = setTimeout(() => setShowContent(true), 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      {/* Base stage background */}
      <div className="absolute inset-0">
        <img
          src="/images/stage-bg.jpg"
          alt="Theatre Stage"
          className="w-full h-full object-cover opacity-60"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              bottom: `-20px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.id % 3 === 0 ? '#D4AF37' : p.id % 3 === 1 ? '#ffffff' : '#db0000',
              boxShadow: p.id % 3 === 0 ? '0 0 6px #D4AF37' : 'none',
            }}
            animate={{
              y: [0, -(window.innerHeight + 100)],
              x: [0, p.drift],
              opacity: [0, 1, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Theatrical spotlight beams */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-[#D4AF37]/20 to-transparent transform -skew-x-12 blur-sm" />
        <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-[#D4AF37]/15 to-transparent transform skew-x-12 blur-sm" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full bg-gradient-to-b from-white/10 to-transparent blur-md" />
      </div>

      {/* Fog/smoke effect */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 30% 100%, rgba(151,0,0,0.3) 0%, transparent 60%), radial-gradient(ellipse at 70% 100%, rgba(151,0,0,0.2) 0%, transparent 50%)',
          }}
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Theatre curtains */}
      <AnimatePresence>
        {!curtainsOpen && (
          <>
            {/* Left curtain */}
            <motion.div
              className="absolute top-0 left-0 w-1/2 h-full z-20"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    90deg,
                    rgba(80,0,0,0.8) 0px,
                    rgba(151,0,0,1) 20px,
                    rgba(100,0,0,0.9) 40px,
                    rgba(60,0,0,0.8) 60px,
                    rgba(120,0,0,1) 80px,
                    rgba(151,0,0,0.9) 100px
                  )
                `,
                boxShadow: 'inset -20px 0 40px rgba(0,0,0,0.5)',
              }}
            >
              {/* Gold tassel left */}
              <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-r from-[#B8960C] to-[#D4AF37] opacity-60" />
              <div className="absolute bottom-0 right-4 w-4 h-32 bg-[#D4AF37] rounded-b-full opacity-80" />
            </motion.div>
            {/* Right curtain */}
            <motion.div
              className="absolute top-0 right-0 w-1/2 h-full z-20"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    90deg,
                    rgba(151,0,0,0.9) 0px,
                    rgba(100,0,0,0.8) 20px,
                    rgba(151,0,0,1) 40px,
                    rgba(120,0,0,0.9) 60px,
                    rgba(60,0,0,0.8) 80px,
                    rgba(80,0,0,0.8) 100px
                  )
                `,
                boxShadow: 'inset 20px 0 40px rgba(0,0,0,0.5)',
              }}
            >
              <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-l from-[#B8960C] to-[#D4AF37] opacity-60" />
              <div className="absolute bottom-0 left-4 w-4 h-32 bg-[#D4AF37] rounded-b-full opacity-80" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Curtains opening */}
      {curtainsOpen && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full z-20 origin-left"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg,rgba(80,0,0,0.8) 0px,rgba(151,0,0,1) 20px,rgba(100,0,0,0.9) 40px,rgba(60,0,0,0.8) 60px,rgba(120,0,0,1) 80px,rgba(151,0,0,0.9) 100px)`,
              boxShadow: 'inset -20px 0 40px rgba(0,0,0,0.5)',
            }}
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{ duration: 2, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-r from-[#B8960C] to-[#D4AF37] opacity-60" />
            <div className="absolute bottom-0 right-4 w-4 h-32 bg-[#D4AF37] rounded-b-full opacity-80" />
          </motion.div>
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full z-20 origin-right"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg,rgba(151,0,0,0.9) 0px,rgba(100,0,0,0.8) 20px,rgba(151,0,0,1) 40px,rgba(120,0,0,0.9) 60px,rgba(60,0,0,0.8) 80px,rgba(80,0,0,0.8) 100px)`,
              boxShadow: 'inset 20px 0 40px rgba(0,0,0,0.5)',
            }}
            initial={{ x: 0 }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, ease: [0.77, 0, 0.175, 1] }}
          >
            <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-l from-[#B8960C] to-[#D4AF37] opacity-60" />
            <div className="absolute bottom-0 left-4 w-4 h-32 bg-[#D4AF37] rounded-b-full opacity-80" />
          </motion.div>
        </>
      )}

      {/* Proscenium arch top */}
      <div className="absolute top-0 left-0 right-0 h-24 z-10 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-b from-black to-transparent" />
        {/* Gold ornamental border */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        {/* Art deco corner flourishes */}
        <div className="absolute bottom-0 left-0 w-40 h-20 opacity-60">
          <svg viewBox="0 0 160 80" className="w-full h-full" fill="none">
            <path d="M0 80 Q40 40 80 20 Q120 0 160 0" stroke="#D4AF37" strokeWidth="1" />
            <path d="M0 60 Q30 40 60 20 Q90 0 120 0" stroke="#D4AF37" strokeWidth="0.5" opacity="0.5" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-40 h-20 opacity-60 scale-x-[-1]">
          <svg viewBox="0 0 160 80" className="w-full h-full" fill="none">
            <path d="M0 80 Q40 40 80 20 Q120 0 160 0" stroke="#D4AF37" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Main hero content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center px-4 max-w-5xl mx-auto"
          >
            {/* Marquee top label */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <span className="font-cinzel text-[#D4AF37] text-xs sm:text-sm tracking-[0.5em] uppercase">
                USTP Cagayan de Oro
              </span>
              <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
              className="mb-4"
            >
              <h1
                className="font-cinzel font-black text-5xl sm:text-7xl lg:text-8xl xl:text-9xl leading-none tracking-wider"
                style={{
                  background: 'linear-gradient(135deg, #B8960C, #D4AF37, #F4D03F, #D4AF37, #B8960C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: 'none',
                  filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.5))',
                }}
              >
                CIRCULO
              </h1>
              <div className="flex items-center justify-center gap-4 sm:gap-8 my-2">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
                <span className="font-cinzel text-white text-lg sm:text-2xl tracking-[0.5em]">DE</span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
              </div>
              <h1
                className="font-cinzel font-black text-5xl sm:text-7xl lg:text-8xl xl:text-9xl leading-none tracking-wider"
                style={{
                  background: 'linear-gradient(135deg, #B8960C, #D4AF37, #F4D03F, #D4AF37, #B8960C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.5))',
                }}
              >
                ENTABLADO
              </h1>
            </motion.div>

            {/* Gold divider with masks */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center justify-center gap-4 my-6"
            >
              <div className="h-[1px] w-24 sm:w-40 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="flex-shrink-0">
                <ellipse cx="9" cy="12" rx="8" ry="11" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
                <path d="M5 15 Q9 19 13 15" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="7" cy="10" r="1.5" fill="#D4AF37"/>
                <circle cx="11" cy="10" r="1.5" fill="#D4AF37"/>
                <ellipse cx="23" cy="12" rx="8" ry="11" fill="none" stroke="#970000" strokeWidth="1.5"/>
                <path d="M19 17 Q23 13 27 17" fill="none" stroke="#970000" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="21" cy="10" r="1.5" fill="#970000"/>
                <circle cx="25" cy="10" r="1.5" fill="#970000"/>
              </svg>
              <div className="h-[1px] w-24 sm:w-40 bg-gradient-to-l from-transparent to-[#D4AF37]" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="font-playfair italic text-white/90 text-lg sm:text-2xl lg:text-3xl mb-3 leading-relaxed"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
            >
              Where Stories Come Alive on Stage
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="font-cormorant text-white/60 text-sm sm:text-base tracking-widest uppercase mb-10"
            >
              The Official Theatre Arts Organization of USTP CDO
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            >
              {/* Primary ticket button */}
              <motion.a
                href="#productions"
                onClick={(e) => { e.preventDefault(); document.getElementById('productions')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="relative group overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative px-8 py-4 border-2 border-[#D4AF37] bg-black/50 backdrop-blur-sm">
                  {/* Ticket notch */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#D4AF37] bg-black" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#D4AF37] bg-black" />
                  {/* Hover fill */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  {/* Glow pulse */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: 'inset 0 0 20px rgba(212,175,55,0.2)' }} />
                  <span className="relative font-cinzel text-[#D4AF37] text-xs sm:text-sm tracking-[0.3em] uppercase">
                    🎭 View Productions
                  </span>
                </div>
              </motion.a>

              {/* Secondary button */}
              <motion.a
                href="#join"
                onClick={(e) => { e.preventDefault(); document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="relative group overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative px-8 py-4 bg-[#970000] hover:bg-[#db0000] transition-colors duration-300">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: 'inset 0 0 20px rgba(219,0,0,0.3)' }} />
                  <span className="relative font-cinzel text-white text-xs sm:text-sm tracking-[0.3em] uppercase">
                    ✦ Audition Now
                  </span>
                </div>
              </motion.a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <span className="font-cinzel text-white/30 text-[10px] tracking-widest">SCROLL</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37]/50 to-transparent"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Marquee light strip */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 py-2 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-[#D4AF37]"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{
              duration: 1.5,
              delay: i * 0.1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ boxShadow: '0 0 6px #D4AF37' }}
          />
        ))}
      </div>
    </section>
  );
}
