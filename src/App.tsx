import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import HistorySection from './components/HistorySection';
import MissionSection from './components/MissionSection';
import AchievementsSection from './components/AchievementsSection';
import OfficersSection from './components/OfficersSection';
import ProductionsSection from './components/ProductionsSection';
import EventsSection from './components/EventsSection';
import GallerySection from './components/GallerySection';
import MediaSection from './components/MediaSection';
import TestimonialsSection from './components/TestimonialsSection';
import JoinSection from './components/JoinSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import SpotlightCursor from './components/SpotlightCursor';
import MarqueeBanner from './components/MarqueeBanner';

// Admin
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

// Supabase data hooks
import {
  useOfficers,
  useAchievements,
  useProductions,
  useEvents,
  useGallery,
  useMedia,
  useTestimonials,
} from './hooks/useSupabaseData';

type AppMode = 'public' | 'admin-login' | 'admin-dashboard';

// Page loading animation
function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Curtain left */}
      <motion.div
        className="absolute left-0 top-0 w-1/2 h-full z-10"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, rgba(80,0,0,0.9) 0px, rgba(151,0,0,1) 20px, rgba(100,0,0,0.9) 40px, rgba(60,0,0,0.8) 60px, rgba(120,0,0,1) 80px, rgba(151,0,0,0.9) 100px)`,
        }}
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ duration: 1.5, delay: 1.2, ease: [0.77, 0, 0.175, 1] }}
      />
      {/* Curtain right */}
      <motion.div
        className="absolute right-0 top-0 w-1/2 h-full z-10"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, rgba(151,0,0,0.9) 0px, rgba(100,0,0,0.8) 20px, rgba(151,0,0,1) 40px, rgba(120,0,0,0.9) 60px, rgba(60,0,0,0.8) 80px, rgba(80,0,0,0.8) 100px)`,
        }}
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ duration: 1.5, delay: 1.2, ease: [0.77, 0, 0.175, 1] }}
      />

      {/* Center logo */}
      <motion.div
        className="relative z-20 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <svg width="80" height="80" viewBox="0 0 44 44" className="mx-auto mb-6 drop-shadow-[0_0_20px_rgba(212,175,55,0.8)]">
          <circle cx="22" cy="22" r="20" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
          <g transform="translate(8, 10)">
            <ellipse cx="9" cy="10" rx="7" ry="9" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
            <path d="M5 13 Q9 17 13 13" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="7" cy="9" r="1.5" fill="#D4AF37"/>
            <circle cx="11" cy="9" r="1.5" fill="#D4AF37"/>
            <ellipse cx="19" cy="10" rx="7" ry="9" fill="none" stroke="#970000" strokeWidth="1.5"/>
            <path d="M15 16 Q19 12 23 16" fill="none" stroke="#970000" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="17" cy="9" r="1.5" fill="#970000"/>
            <circle cx="21" cy="9" r="1.5" fill="#970000"/>
          </g>
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="font-cinzel text-[#D4AF37] font-bold text-2xl tracking-[0.4em] mb-1">CIRCULO DE</div>
          <div className="font-cinzel text-white text-base tracking-[0.6em] mb-4">ENTABLADO</div>
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1, delay: i * 0.15, repeat: Infinity }}
                style={{ boxShadow: '0 0 6px #D4AF37' }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Marquee bottom */}
      <div className="absolute bottom-4 left-0 right-0 overflow-hidden">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="font-cinzel text-[#D4AF37]/30 text-[10px] tracking-[0.4em]">
              ✦ USTP THEATRE ARTS
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [appMode, setAppMode] = useState<AppMode>('public');
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);

  // Data hooks (uses mock data or Supabase when configured)
  const { data: officers } = useOfficers();
  const { data: achievements } = useAchievements();
  const { data: productions } = useProductions();
  const { data: events } = useEvents();
  const { data: gallery } = useGallery();
  const { data: media } = useMedia();
  const { data: testimonials } = useTestimonials();

  // ALT+C keyboard shortcut for admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'c') {
        e.preventDefault();
        setAppMode(prev => prev === 'public' ? 'admin-login' : 'public');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAdminLogin = () => {
    setAdminAuthenticated(true);
    setAppMode('admin-dashboard');
  };

  const handleAdminLogout = () => {
    setAdminAuthenticated(false);
    setAppMode('public');
  };

  if (appMode === 'admin-login') {
    return (
      <>
        <Toaster position="top-right" />
        <AdminLogin onLogin={handleAdminLogin} onBack={() => setAppMode('public')} />
      </>
    );
  }

  if (appMode === 'admin-dashboard' && adminAuthenticated) {
    return (
      <>
        <Toaster position="top-right" />
        <AdminDashboard onLogout={handleAdminLogout} />
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" />

      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <SpotlightCursor />
          <Navigation />

          <main>
            <HeroSection />
            <MarqueeBanner />
            <AboutSection />
            <HistorySection />
            <MissionSection />
            <AchievementsSection achievements={achievements} />
            <OfficersSection officers={officers} />
            <ProductionsSection productions={productions} />
            <EventsSection events={events} />
            <GallerySection gallery={gallery} />
            <MediaSection media={media} />
            <TestimonialsSection testimonials={testimonials} />
            <JoinSection />
            <ContactSection />
          </main>

          <Footer onAdminClick={() => setAppMode('admin-login')} />
        </>
      )}
    </>
  );
}
