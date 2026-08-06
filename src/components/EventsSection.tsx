import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { Event } from '../lib/supabase';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
  index: number;
}

function EventCard({ event, index }: EventCardProps) {
  const [cardRef, cardInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="relative group"
    >
      {/* Invitation/program card style */}
      <div className="theatre-card overflow-hidden hover:border-[#D4AF37]/60 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
        {/* Top image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Date stamp - ticket style */}
          <div className="absolute top-4 right-4 bg-black/80 border border-[#D4AF37]/50 p-2 text-center min-w-[60px]">
            <div className="font-cinzel text-[#D4AF37] text-xs tracking-widest">
              {format(new Date(event.event_date), 'MMM').toUpperCase()}
            </div>
            <div className="font-cinzel text-white font-bold text-2xl leading-none">
              {format(new Date(event.event_date), 'dd')}
            </div>
          </div>
        </div>

        {/* Content - styled like elegant program */}
        <div className="p-6">
          {/* Decorative header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#D4AF37]/50 to-transparent" />
            <span className="font-cinzel text-[#D4AF37] text-[10px] tracking-widest uppercase">Event</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-[#D4AF37]/50 to-transparent" />
          </div>

          <h3 className="font-playfair text-white font-bold text-xl leading-tight mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">
            {event.title}
          </h3>

          {/* Event details */}
          <div className="space-y-2 mb-4">
            {/* Date & Time */}
            <div className="flex items-center gap-3">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                <circle cx="7" cy="7" r="6" stroke="#D4AF37" strokeWidth="1.2"/>
                <path d="M7 3.5 L7 7 L9.5 9" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span className="font-cormorant text-white/70 text-sm">
                {format(new Date(event.event_date), 'EEEE, MMMM dd, yyyy')} at {format(new Date(event.event_date), 'h:mm a')}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                <path d="M7 1 C4.2 1 2 3.2 2 6 C2 9.5 7 13 7 13 C7 13 12 9.5 12 6 C12 3.2 9.8 1 7 1Z" stroke="#D4AF37" strokeWidth="1.2" fill="none"/>
                <circle cx="7" cy="6" r="1.5" fill="#D4AF37"/>
              </svg>
              <span className="font-cormorant text-white/70 text-sm">{event.location}</span>
            </div>
          </div>

          <p className="font-cormorant text-white/60 text-base leading-relaxed mb-6 line-clamp-3">
            {event.description}
          </p>

          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent mb-4" />

          {/* RSVP Button - styled as admission ticket */}
          <motion.a
            href={event.registration_link}
            className="relative block w-full text-center overflow-hidden group/btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative px-6 py-3 border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all duration-300">
              {/* Ticket notches */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-[#D4AF37]/50 bg-black" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full border border-[#D4AF37]/50 bg-black" />
              {/* Hover fill */}
              <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover/btn:bg-[#D4AF37]/10 transition-colors duration-300" />
              <span className="relative font-cinzel text-[#D4AF37] text-xs tracking-[0.3em] uppercase">
                🎟 Reserve Your Place
              </span>
            </div>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

interface Props {
  events: Event[];
}

export default function EventsSection({ events }: Props) {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="events" className="relative py-24 bg-gradient-to-b from-black to-[#050000] overflow-hidden">
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
            — Coming Soon —
          </span>
          <h2 className="font-cinzel font-bold text-4xl sm:text-5xl lg:text-6xl text-[#970000] mb-4"
            style={{ textShadow: '0 0 30px rgba(151,0,0,0.3)' }}>
            Events & Workshops
          </h2>
          <p className="font-playfair italic text-white/60 text-xl max-w-2xl mx-auto">
            Join us for extraordinary experiences that transform and inspire
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-[1px] w-24 sm:w-40 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]" style={{ boxShadow: '0 0 8px #D4AF37' }} />
            <div className="h-[1px] w-24 sm:w-40 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
