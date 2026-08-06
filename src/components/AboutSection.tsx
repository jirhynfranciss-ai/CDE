import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const GoldDivider = () => (
  <div className="flex items-center gap-4 my-8">
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2 L14 9 L21 9 L15.5 13.5 L17.5 21 L12 16.5 L6.5 21 L8.5 13.5 L3 9 L10 9 Z" fill="#D4AF37" opacity="0.8"/>
    </svg>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
  </div>
);

const OrnateQuoteMark = () => (
  <svg width="60" height="50" viewBox="0 0 60 50" fill="none" className="opacity-30">
    <path d="M0 30 Q5 10 20 5 Q15 20 20 30 Q10 30 0 30 Z" fill="#D4AF37"/>
    <path d="M30 30 Q35 10 50 5 Q45 20 50 30 Q40 30 30 30 Z" fill="#D4AF37"/>
    <path d="M0 40 Q10 50 20 40" stroke="#D4AF37" strokeWidth="1" fill="none"/>
    <path d="M30 40 Q40 50 50 40" stroke="#D4AF37" strokeWidth="1" fill="none"/>
  </svg>
);

export default function AboutSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" className="relative py-24 bg-gradient-to-b from-black via-[#050000] to-black overflow-hidden">
      {/* Background watermark mask */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-3">
        <svg width="600" height="500" viewBox="0 0 60 50" fill="none">
          <path d="M10 35 Q15 10 30 5 Q25 22 30 35 Q18 35 10 35 Z" fill="#D4AF37" opacity="0.04"/>
          <path d="M35 35 Q40 10 55 5 Q50 22 55 35 Q43 35 35 35 Z" fill="#D4AF37" opacity="0.04"/>
        </svg>
      </div>

      {/* Art Deco geometric pattern */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      {/* Corner flourishes */}
      <div className="absolute top-8 left-8 opacity-30">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path d="M0 0 L80 0 L80 10 L10 10 L10 80 L0 80 Z" fill="#D4AF37" opacity="0.3"/>
          <path d="M0 0 L40 0 L40 5 L5 5 L5 40 L0 40 Z" fill="#D4AF37"/>
        </svg>
      </div>
      <div className="absolute top-8 right-8 opacity-30 scale-x-[-1]">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path d="M0 0 L80 0 L80 10 L10 10 L10 80 L0 80 Z" fill="#D4AF37" opacity="0.3"/>
          <path d="M0 0 L40 0 L40 5 L5 5 L5 40 L0 40 Z" fill="#D4AF37"/>
        </svg>
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
            — Est. At USTP CDO —
          </span>
          <h2 className="font-cinzel font-bold text-4xl sm:text-5xl lg:text-6xl text-[#970000] mb-4"
            style={{ textShadow: '0 0 30px rgba(151,0,0,0.3)' }}>
            About Us
          </h2>
          <GoldDivider />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Image with ornate frame */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Ornate gold frame */}
              <div className="absolute -inset-4 border-2 border-[#D4AF37]/30 z-0" />
              <div className="absolute -inset-2 border border-[#D4AF37]/15 z-0" />
              {/* Corner ornaments */}
              {[
                'top-0 left-0',
                'top-0 right-0 rotate-90',
                'bottom-0 right-0 rotate-180',
                'bottom-0 left-0 -rotate-90',
              ].map((pos, i) => (
                <div key={i} className={`absolute ${pos} z-10 w-8 h-8`}>
                  <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                    <path d="M0 0 L32 0 L32 4 L4 4 L4 32 L0 32 Z" fill="#D4AF37" opacity="0.8"/>
                  </svg>
                </div>
              ))}

              <div className="relative overflow-hidden">
                <img
                  src="/images/about-theatre.jpg"
                  alt="CDE Theatre Rehearsal"
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Vintage sepia overlay */}
                <div className="absolute inset-0 bg-[#8B4513]/10 mix-blend-multiply" />
              </div>

              {/* Info badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#970000] border-2 border-[#D4AF37] p-4 text-center shadow-xl">
                <div className="font-cinzel text-[#D4AF37] text-2xl font-bold">20+</div>
                <div className="font-cormorant text-white text-sm tracking-widest">Years of Excellence</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Text content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="relative pt-8 lg:pt-0"
          >
            <OrnateQuoteMark />

            <h3 className="font-playfair italic text-[#D4AF37] text-2xl sm:text-3xl mb-6 leading-relaxed">
              Where Art Transforms Lives and Stories Illuminate Truths
            </h3>

            <div className="space-y-5 text-white/80 font-cormorant text-lg leading-relaxed">
              <p>
                <span className="font-playfair text-[#D4AF37] text-3xl float-left mr-3 leading-none">C</span>
                irculo de Entablado (CDE) is the official theatre arts organization of the University of Science and Technology of Southern Philippines (USTP) in Cagayan de Oro City. Founded with a passionate vision to cultivate theatrical excellence among the youth of Mindanao, CDE has grown into one of the most prestigious and celebrated campus theatre organizations in the region.
              </p>
              <p>
                Through the transformative power of dramatic performance, we nurture the artistic gifts of our members while contributing to the rich cultural tapestry of Cagayan de Oro City and the entire Mindanao region. Our productions have graced the stages of prestigious venues, earning recognition from local, regional, and national theatre communities.
              </p>
              <p>
                CDE is more than an organization — it is a family of passionate storytellers, dedicated performers, visionary directors, and creative souls united by an unwavering love for the theatrical arts.
              </p>
            </div>

            <GoldDivider />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-6">
              {[
                { num: '50+', label: 'Productions' },
                { num: '200+', label: 'Members' },
                { num: '15+', label: 'Awards' },
              ].map((stat) => (
                <div key={stat.label} className="text-center border border-[#D4AF37]/20 p-4">
                  <div className="font-cinzel text-[#D4AF37] text-2xl font-bold mb-1 animate-shimmer">
                    {stat.num}
                  </div>
                  <div className="font-cinzel text-white/50 text-[10px] tracking-widest uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
