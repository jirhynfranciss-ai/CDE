import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const benefits = [
  { icon: '🎭', title: 'Stage Experience', desc: 'Perform in professional-quality productions that challenge and develop your craft' },
  { icon: '🎓', title: 'Expert Training', desc: 'Learn from experienced theatre practitioners, directors, and technical artists' },
  { icon: '🏆', title: 'Competition Opportunities', desc: 'Represent USTP CDO in regional and national theatre competitions' },
  { icon: '🤝', title: 'Lifelong Brotherhood', desc: 'Join a passionate community of artists who become family' },
  { icon: '✨', title: 'Personal Growth', desc: 'Develop confidence, communication, and creative skills that last a lifetime' },
  { icon: '🌟', title: 'Cultural Impact', desc: 'Contribute to the vibrant arts and culture scene of Cagayan de Oro' },
];

const requirements = [
  'Enrolled USTP CDO student (any course, any year)',
  'Genuine passion for theatre and performing arts',
  'Commitment to attend regular rehearsals and training',
  'Willingness to collaborate and support fellow members',
  'No prior theatre experience required — only heart and dedication',
];

const process = [
  { step: '01', label: 'Register', desc: 'Fill out the audition form and secure your slot' },
  { step: '02', label: 'Audition', desc: 'Perform a prepared monologue or participate in workshop activities' },
  { step: '03', label: 'Interview', desc: 'Brief interview with CDE officers to discuss your goals' },
  { step: '04', label: 'Welcome!', desc: 'Join the CDE family and begin your theatrical journey' },
];

export default function JoinSection() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="join" className="relative py-24 overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0">
        <img src="/images/audition-bg.jpg" alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black/95" />
      </div>

      {/* Spotlight effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-full opacity-8"
          animate={{ x: [0, 20, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'conic-gradient(from 0deg at 50% 0%, transparent 15deg, rgba(212,175,55,0.3) 20deg, transparent 25deg)' }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-cinzel text-[#D4AF37] text-xs tracking-[0.5em] uppercase mb-4 block">
            — The Stage Awaits You —
          </span>
          <h2 className="font-cinzel font-bold text-5xl sm:text-6xl lg:text-7xl text-white mb-4"
            style={{ textShadow: '0 0 40px rgba(212,175,55,0.3)' }}>
            Join the Cast
          </h2>
          <p className="font-playfair italic text-[#D4AF37] text-2xl sm:text-3xl mb-4">
            Your story begins at center stage
          </p>
          <p className="font-cormorant text-white/60 text-xl max-w-2xl mx-auto">
            CDE is looking for passionate, courageous, and dedicated theatre artists to join our extraordinary family. No experience needed — only your heart.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-cinzel text-[#D4AF37] text-xl tracking-widest mb-8 flex items-center gap-3">
              <div className="w-1 h-6 bg-[#D4AF37]" />
              MEMBERSHIP BENEFITS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="theatre-card p-4 hover:border-[#D4AF37]/50 transition-all duration-300 group"
                >
                  <div className="text-2xl mb-2">{benefit.icon}</div>
                  <h4 className="font-cinzel text-[#D4AF37] text-xs tracking-wider mb-1">{benefit.title}</h4>
                  <p className="font-cormorant text-white/60 text-sm leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Requirements + Process */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-10"
          >
            {/* Requirements */}
            <div>
              <h3 className="font-cinzel text-[#D4AF37] text-xl tracking-widest mb-6 flex items-center gap-3">
                <div className="w-1 h-6 bg-[#970000]" />
                REQUIREMENTS
              </h3>
              <div className="space-y-3">
                {requirements.map((req, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 border border-[#D4AF37]/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4 L4 7 L9 1" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <p className="font-cormorant text-white/75 text-base leading-relaxed">{req}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Process Timeline */}
            <div>
              <h3 className="font-cinzel text-[#D4AF37] text-xl tracking-widest mb-6 flex items-center gap-3">
                <div className="w-1 h-6 bg-[#D4AF37]" />
                AUDITION PROCESS
              </h3>
              <div className="space-y-4">
                {process.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="font-cinzel text-[#D4AF37]/40 text-2xl font-bold leading-none flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="border-l border-[#D4AF37]/20 pl-4">
                      <div className="font-cinzel text-white text-sm tracking-widest mb-1">{step.label}</div>
                      <p className="font-cormorant text-white/60 text-sm">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="inline-block relative">
            {/* Pulsing glow */}
            <motion.div
              className="absolute -inset-4 rounded"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ background: 'radial-gradient(ellipse, rgba(151,0,0,0.3), transparent 70%)' }}
            />

            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="relative inline-flex items-center gap-4 px-10 py-5 bg-[#970000] border-2 border-[#D4AF37] hover:bg-[#db0000] transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{ boxShadow: '0 0 30px rgba(151,0,0,0.4)' }}
            >
              {/* Ticket notch left */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-[#D4AF37] bg-black" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 rounded-full border-2 border-[#D4AF37] bg-black" />

              <span className="font-cinzel text-[#D4AF37] text-sm sm:text-base tracking-[0.3em] uppercase">
                🎭 Audition Now
              </span>
              <motion.span
                className="font-cinzel text-[#D4AF37] text-lg"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </div>

          <p className="font-cormorant text-white/40 text-sm mt-6 italic">
            "The stage doesn't care where you came from. It only cares about what you bring to it."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
