import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'History', href: '#history' },
  { label: 'Mission', href: '#mission' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Officers', href: '#officers' },
  { label: 'Productions', href: '#productions' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Media', href: '#media' },
  { label: 'Join Us', href: '#join' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-sm border-b border-[#D4AF37]/30 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'bg-gradient-to-b from-black/80 to-transparent'
        }`}
      >
        {/* Top ornamental line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <svg width="44" height="44" viewBox="0 0 44 44" className="drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
                  {/* Theatre mask icon */}
                  <circle cx="22" cy="22" r="20" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
                  <g transform="translate(8, 10)">
                    {/* Happy mask */}
                    <ellipse cx="9" cy="10" rx="7" ry="9" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
                    <path d="M5 13 Q9 17 13 13" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="7" cy="9" r="1.5" fill="#D4AF37"/>
                    <circle cx="11" cy="9" r="1.5" fill="#D4AF37"/>
                    {/* Sad mask */}
                    <ellipse cx="19" cy="10" rx="7" ry="9" fill="none" stroke="#970000" strokeWidth="1.5"/>
                    <path d="M15 16 Q19 12 23 16" fill="none" stroke="#970000" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="17" cy="9" r="1.5" fill="#970000"/>
                    <circle cx="21" cy="9" r="1.5" fill="#970000"/>
                  </g>
                </svg>
              </div>
              <div>
                <div className="font-cinzel text-[#D4AF37] font-bold text-sm sm:text-base leading-tight tracking-widest">
                  CIRCULO DE
                </div>
                <div className="font-cinzel text-white text-[10px] sm:text-xs tracking-[0.3em] leading-tight">
                  ENTABLADO
                </div>
              </div>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`relative px-2.5 py-2 font-cinzel text-[10px] tracking-widest uppercase transition-colors duration-300 group ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-[#D4AF37]'
                      : 'text-white/80 hover:text-[#D4AF37]'
                  }`}
                  whileHover={{ y: -1 }}
                >
                  {link.label}
                  {/* Underline */}
                  <span className={`absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-300 ${
                    activeSection === link.href.replace('#', '') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                  {/* Spotlight dot */}
                  {activeSection === link.href.replace('#', '') && (
                    <motion.span
                      layoutId="navDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D4AF37]"
                      style={{ boxShadow: '0 0 6px #D4AF37' }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 group"
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-[1.5px] bg-[#D4AF37] origin-center"
                  style={{ width: i === 1 ? '60%' : '100%' }}
                  animate={{
                    rotate: isOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                    translateY: isOpen ? (i === 0 ? 8 : i === 2 ? -8 : 0) : 0,
                    opacity: isOpen && i === 1 ? 0 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Bottom ornamental line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#970000]/50 to-transparent" />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-md flex flex-col items-center justify-center"
          >
            {/* Decorative background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#970000]/5 blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm px-8">
              {/* Logo */}
              <div className="mb-4 text-center">
                <div className="font-cinzel text-[#D4AF37] text-2xl font-bold tracking-widest">CDE</div>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
              </div>

              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`font-cinzel text-sm tracking-[0.3em] uppercase transition-colors duration-300 hover:text-[#D4AF37] ${
                    activeSection === link.href.replace('#', '') ? 'text-[#D4AF37]' : 'text-white/80'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.2 }}
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-4" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
