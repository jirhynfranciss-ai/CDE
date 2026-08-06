import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import type { MediaItem } from '../lib/supabase';
import { format } from 'date-fns';

interface MediaCardProps {
  item: MediaItem;
  index: number;
  onClick: () => void;
}

function MediaCard({ item, index, onClick }: MediaCardProps) {
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
      onClick={onClick}
    >
      <div className={`theatre-card overflow-hidden transition-all duration-500 ${
        hovered ? 'border-[#D4AF37]/60 shadow-[0_0_30px_rgba(212,175,55,0.1)]' : ''
      }`}>
        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.thumbnail_url}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Curtain overlay that parts on hover */}
          <motion.div
            className="absolute inset-0 flex"
            animate={hovered ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-1/2 h-full"
              style={{ background: 'linear-gradient(to right, rgba(80,0,0,0.6), rgba(151,0,0,0.3))' }}
            />
            <div className="w-1/2 h-full"
              style={{ background: 'linear-gradient(to left, rgba(80,0,0,0.6), rgba(151,0,0,0.3))' }}
            />
          </motion.div>

          {/* Type badge */}
          <div className="absolute top-3 left-3">
            <span className={`font-cinzel text-[10px] tracking-widest uppercase px-2 py-1 border ${
              item.media_type === 'video'
                ? 'bg-[#970000]/80 border-[#db0000] text-white'
                : 'bg-black/70 border-[#D4AF37]/50 text-[#D4AF37]'
            }`}>
              {item.media_type === 'video' ? '▶ VIDEO' : '📰 ARTICLE'}
            </span>
          </div>

          {/* Play button for videos */}
          {item.media_type === 'video' && (
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-[#D4AF37] flex items-center justify-center"
              animate={hovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ background: 'rgba(0,0,0,0.8)', boxShadow: hovered ? '0 0 30px rgba(212,175,55,0.5)' : 'none' }}
            >
              {/* Film reel icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#D4AF37" strokeWidth="1.5"/>
                <path d="M9 8 L16 12 L9 16 Z" fill="#D4AF37"/>
              </svg>
            </motion.div>
          )}

          {/* Film reel decoration */}
          {item.media_type === 'video' && (
            <div className="absolute bottom-2 right-2 opacity-30">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <circle cx="15" cy="15" r="13" stroke="#D4AF37" strokeWidth="1"/>
                <circle cx="15" cy="15" r="4" fill="none" stroke="#D4AF37" strokeWidth="1"/>
                <circle cx="15" cy="4" r="2" fill="#D4AF37"/>
                <circle cx="15" cy="26" r="2" fill="#D4AF37"/>
                <circle cx="4" cy="15" r="2" fill="#D4AF37"/>
                <circle cx="26" cy="15" r="2" fill="#D4AF37"/>
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-playfair text-white font-bold text-lg leading-tight mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
            {item.title}
          </h3>
          <p className="font-cormorant text-white/60 text-sm leading-relaxed mb-3 line-clamp-2">
            {item.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-cinzel text-[#D4AF37]/60 text-[10px] tracking-widest">
              {format(new Date(item.date_added), 'MMM dd, yyyy')}
            </span>
            <span className="font-cinzel text-[#D4AF37] text-[10px] tracking-widest group-hover:tracking-[0.2em] transition-all duration-300">
              {item.media_type === 'video' ? 'WATCH ▶' : 'READ →'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface VideoModalProps {
  item: MediaItem;
  onClose: () => void;
}

function VideoModal({ item, onClose }: VideoModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -inset-4 border border-[#D4AF37]/30" />
        <div className="relative pt-[56.25%] bg-black">
          <iframe
            src={item.url}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen"
            title={item.title}
          />
        </div>
        <div className="bg-black/90 p-4 text-center border border-[#D4AF37]/20 border-t-0">
          <p className="font-playfair text-white text-lg">{item.title}</p>
        </div>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 font-cinzel text-[#D4AF37] text-sm tracking-widest hover:text-white transition-colors"
        >
          CLOSE ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

interface Props {
  media: MediaItem[];
}

export default function MediaSection({ media }: Props) {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const handleClick = (item: MediaItem) => {
    if (item.media_type === 'video') {
      setSelectedItem(item);
    } else {
      window.open(item.url, '_blank');
    }
  };

  return (
    <section id="media" className="relative py-24 bg-gradient-to-b from-black to-[#050000] overflow-hidden">
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
            — In the Spotlight —
          </span>
          <h2 className="font-cinzel font-bold text-4xl sm:text-5xl lg:text-6xl text-[#970000] mb-4"
            style={{ textShadow: '0 0 30px rgba(151,0,0,0.3)' }}>
            Media
          </h2>
          <p className="font-playfair italic text-white/60 text-xl max-w-2xl mx-auto">
            Videos, press coverage, and featured stories that celebrate our theatrical legacy
          </p>
        </motion.div>

        {/* Media Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {media.map((item, index) => (
            <MediaCard
              key={item.id}
              item={item}
              index={index}
              onClick={() => handleClick(item)}
            />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedItem && selectedItem.media_type === 'video' && (
        <VideoModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </section>
  );
}
