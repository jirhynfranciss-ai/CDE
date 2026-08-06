import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Milestone card extracted so hooks can be called at top level
function MilestoneCard({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const [itemRef, itemInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const isLeft = milestone.side === 'left';

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={itemInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`relative flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
    >
      {/* Content card */}
      <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
        <div className="theatre-card relative p-6 sm:p-8 hover:border-[#D4AF37]/60 transition-all duration-500 group">
          <div className="absolute inset-0 border border-[#D4AF37]/10 group-hover:border-[#D4AF37]/30 transition-colors duration-500" />
          <div className={`inline-flex items-center gap-2 mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            <span className="text-2xl">{milestone.icon}</span>
            <div className="bg-[#970000] border border-[#D4AF37]/50 px-4 py-1">
              <span className="font-cinzel text-[#D4AF37] font-bold text-lg tracking-widest">{milestone.year}</span>
            </div>
          </div>
          <h3 className="font-playfair text-white font-bold text-xl sm:text-2xl mb-3">{milestone.title}</h3>
          <p className="font-cormorant text-white/70 text-base sm:text-lg leading-relaxed">{milestone.description}</p>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)' }}
          />
        </div>
      </div>
      {/* Center dot */}
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center z-10">
        <motion.div
          className="w-5 h-5 rounded-full border-2 border-[#D4AF37] bg-black"
          animate={itemInView ? { boxShadow: ['0 0 0px #D4AF37', '0 0 15px #D4AF37', '0 0 5px #D4AF37'] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

const milestones = [
  {
    year: '2003',
    title: 'The Founding',
    description: 'Circulo de Entablado was established by a group of passionate theatre enthusiasts at USTP CDO, beginning with just 12 founding members and a dream to bring world-class theatre to Mindanao.',
    icon: '🎭',
    side: 'left',
  },
  {
    year: '2007',
    title: 'First Major Production',
    description: 'CDE staged its first full-length production — "Ang Buhay ay Isang Panaginip" — to a sold-out crowd of 500 audience members, establishing our reputation for dramatic excellence.',
    icon: '🌟',
    side: 'right',
  },
  {
    year: '2010',
    title: 'Regional Recognition',
    description: 'CDE won its first regional competition award at the Mindanao University Theatre Festival, placing us firmly on the map as one of Mindanao\'s premier theatre organizations.',
    icon: '🏆',
    side: 'left',
  },
  {
    year: '2015',
    title: 'National Debut',
    description: 'Our production of "Florante at Laura" represented Mindanao at the National Collegiate Theatre Festival in Manila, earning critical acclaim and the Best Ensemble award.',
    icon: '✨',
    side: 'right',
  },
  {
    year: '2018',
    title: 'Lambago Art Award',
    description: 'CDE received the Lambago Art Award from Xavier University, recognizing our extraordinary contribution to the cultural landscape of Cagayan de Oro City.',
    icon: '🎖️',
    side: 'left',
  },
  {
    year: '2023',
    title: 'A Decade of Excellence',
    description: 'Celebrating 20 years of theatrical artistry with our most ambitious production ever — "Noli Me Tangere: The Musical" — featuring 40 performers, original music, and 3 sold-out nights.',
    icon: '👑',
    side: 'right',
  },
];

export default function HistorySection() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="history" className="relative py-24 bg-gradient-to-b from-black to-[#050000] overflow-hidden">
      {/* Background curtain texture */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #970000 0px, transparent 2px, transparent 40px)',
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-cinzel text-[#D4AF37] text-xs tracking-[0.5em] uppercase mb-4 block">
            — Our Journey —
          </span>
          <h2 className="font-cinzel font-bold text-4xl sm:text-5xl lg:text-6xl text-[#970000] mb-4"
            style={{ textShadow: '0 0 30px rgba(151,0,0,0.3)' }}>
            Our Story
          </h2>
          <p className="font-playfair italic text-white/60 text-xl max-w-2xl mx-auto">
            Two decades of passion, artistry, and unforgettable stories told from the heart of Mindanao
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-[1px] w-24 sm:w-40 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]" style={{ boxShadow: '0 0 8px #D4AF37' }} />
            <div className="h-[1px] w-24 sm:w-40 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#D4AF37]/50 via-[#970000]/50 to-[#D4AF37]/50 hidden md:block" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <MilestoneCard key={milestone.year} milestone={milestone} index={index} />
            ))}
          </div>

          {/* End marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="relative flex justify-center mt-12"
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] bg-[#970000] flex items-center justify-center mx-auto mb-3"
                style={{ boxShadow: '0 0 20px rgba(212,175,55,0.5)' }}>
                <span className="text-lg">🎭</span>
              </div>
              <span className="font-cinzel text-[#D4AF37] text-xs tracking-widest">TO BE CONTINUED...</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
