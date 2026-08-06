import { motion } from 'framer-motion';

const navLinks = ['About', 'History', 'Achievements', 'Officers', 'Productions', 'Events', 'Gallery', 'Contact'];

interface Props {
  onAdminClick?: () => void;
}

export default function Footer({ onAdminClick }: Props) {
  return (
    <footer className="relative bg-black border-t border-[#D4AF37]/20 overflow-hidden">
      {/* Top gold line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      {/* Art deco background */}
      <div className="absolute inset-0 opacity-3 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, rgba(212,175,55,0.05) 0px, transparent 2px, transparent 40px)
            `,
          }}
        />
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
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
              <div>
                <div className="font-cinzel text-[#D4AF37] font-bold text-lg tracking-widest">CIRCULO DE ENTABLADO</div>
                <div className="font-cormorant text-white/50 text-sm tracking-widest italic">USTP CDO Theatre Arts Organization</div>
              </div>
            </div>
            <p className="font-cormorant text-white/60 text-base leading-relaxed max-w-md mb-6">
              Where stories come alive on stage. CDE is dedicated to the elevation of theatre arts in Mindanao through passionate performance, creative excellence, and unwavering dedication to the craft.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {['f', '◎', '𝕏', '▶'].map((icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="w-9 h-9 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/60 transition-all duration-300 font-cinzel text-sm"
                  whileHover={{ scale: 1.1 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel text-[#D4AF37] text-sm tracking-widest mb-6 flex items-center gap-2">
              <div className="w-1 h-4 bg-[#D4AF37]" />
              QUICK LINKS
            </h4>
            <ul className="space-y-3">
              {navLinks.slice(0, 4).map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => { e.preventDefault(); document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="font-cormorant text-white/50 text-base hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-3 h-[1px] bg-[#D4AF37]/30 group-hover:w-5 transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel text-[#D4AF37] text-sm tracking-widest mb-6 flex items-center gap-2">
              <div className="w-1 h-4 bg-[#970000]" />
              MORE
            </h4>
            <ul className="space-y-3">
              {navLinks.slice(4).map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => { e.preventDefault(); document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="font-cormorant text-white/50 text-base hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-3 h-[1px] bg-[#D4AF37]/30 group-hover:w-5 transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#join"
                  onClick={(e) => { e.preventDefault(); document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="font-cormorant text-[#D4AF37]/60 text-base hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-2 group font-bold"
                >
                  <span className="w-3 h-[1px] bg-[#D4AF37] group-hover:w-5 transition-all duration-300" />
                  Join Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Marquee strip */}
        <div className="relative overflow-hidden border-y border-[#D4AF37]/10 py-3 mb-8">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="font-cinzel text-[#D4AF37]/20 text-xs tracking-widest uppercase">
                ✦ Circulo de Entablado ✦ USTP Theatre Arts ✦ Where Stories Come Alive
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-cormorant text-white/30 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Circulo de Entablado | USTP Cagayan de Oro. All rights reserved.
          </p>
          <p className="font-cormorant text-white/30 text-sm italic text-center">
            "The show must go on." — The eternal mantra of theatre artists everywhere
          </p>
        </div>
      </div>

      {/* Hidden admin trigger - tiny subtle element in bottom right */}
      <div
        onClick={onAdminClick}
        className="absolute bottom-3 right-4 w-3 h-3 rounded-full bg-[#D4AF37]/5 hover:bg-[#D4AF37]/20 cursor-pointer transition-all duration-300"
        title=""
        aria-hidden="true"
      />
    </footer>
  );
}
