import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import type { GalleryItem } from '../lib/supabase';

interface LightboxProps {
  item: GalleryItem;
  onClose: () => void;
}

function Lightbox({ item, onClose }: LightboxProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="relative max-w-4xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gold frame */}
          <div className="absolute -inset-3 border border-[#D4AF37]/40" />
          <div className="absolute -inset-1 border border-[#D4AF37]/20" />

          {/* Corner ornaments */}
          {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-8 h-8 z-10`}>
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <path d="M0 0 L32 0 L32 4 L4 4 L4 32 L0 32 Z" fill="#D4AF37" opacity="0.8"/>
              </svg>
            </div>
          ))}

          <img
            src={item.image_url}
            alt={item.caption}
            className="w-full h-auto max-h-[70vh] object-contain"
          />

          <div className="bg-black/80 p-4 text-center">
            <p className="font-playfair text-white text-lg">{item.caption}</p>
            <p className="font-cinzel text-[#D4AF37] text-xs tracking-widest mt-1">{item.category}</p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 font-cinzel text-[#D4AF37] text-sm tracking-widest hover:text-white transition-colors"
          >
            CLOSE ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}

function GalleryCard({ item, index, onClick }: GalleryCardProps) {
  const [cardRef, cardInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={cardInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="relative cursor-pointer group overflow-hidden"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ gridRow: index % 5 === 0 ? 'span 2' : 'span 1' }}
    >
      <div className="relative h-full min-h-48 overflow-hidden border border-[#D4AF37]/10 hover:border-[#D4AF37]/50 transition-all duration-500">
        <img
          src={item.image_url}
          alt={item.caption}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ minHeight: '200px' }}
        />

        {/* Stage lighting overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />

        {/* Spotlight on hover */}
        <motion.div
          className="absolute inset-0"
          animate={hovered ? { opacity: 0.4 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: 'radial-gradient(circle at 50% 40%, rgba(212,175,55,0.4), transparent 60%)' }}
        />

        {/* Gold frame on hover */}
        <motion.div
          className="absolute inset-0 border-2 border-[#D4AF37]"
          animate={hovered ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Caption */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent"
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-playfair text-white text-sm leading-tight">{item.caption}</p>
          <span className="font-cinzel text-[#D4AF37] text-[10px] tracking-widest">{item.category}</span>
        </motion.div>

        {/* Play/zoom icon */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-[#D4AF37] rounded-full flex items-center justify-center"
          animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.3 }}
          style={{ background: 'rgba(0,0,0,0.7)', boxShadow: '0 0 20px rgba(212,175,55,0.5)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 3 L13 8 L5 13 Z" fill="#D4AF37"/>
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

interface Props {
  gallery: GalleryItem[];
}

export default function GallerySection({ gallery }: Props) {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', ...Array.from(new Set(gallery.map(g => g.category)))];
  const filtered = activeCategory === 'All' ? gallery : gallery.filter(g => g.category === activeCategory);

  return (
    <section id="gallery" className="relative py-24 bg-gradient-to-b from-[#050000] to-black overflow-hidden">
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
            — Captured Moments —
          </span>
          <h2 className="font-cinzel font-bold text-4xl sm:text-5xl lg:text-6xl text-[#970000] mb-4"
            style={{ textShadow: '0 0 30px rgba(151,0,0,0.3)' }}>
            Gallery
          </h2>
          <p className="font-playfair italic text-white/60 text-xl max-w-2xl mx-auto mb-8">
            A visual archive of our theatrical journey, frozen in frames of gold
          </p>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 font-cinzel text-xs tracking-widest uppercase border transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#970000] border-[#D4AF37] text-[#D4AF37]'
                    : 'border-[#636363]/50 text-white/50 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[200px]">
          {filtered.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
              onClick={() => setLightboxItem(item)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </section>
  );
}
