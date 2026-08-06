import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface Props {
  onLogin: () => void;
  onBack: () => void;
}

export default function AdminLogin({ onLogin, onBack }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Welcome, Admin!', {
        style: { background: '#0a0000', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)', fontFamily: 'Cinzel, serif' },
      });
      onLogin();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed. Please check your credentials.';
      toast.error(message, {
        style: { background: '#0a0000', color: '#db0000', border: '1px solid rgba(219,0,0,0.3)' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src="/images/stage-bg.jpg" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-black/90" />
      </div>

      {/* Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-full pointer-events-none opacity-10"
        style={{ background: 'conic-gradient(from 0deg at 50% 0%, transparent 15deg, rgba(212,175,55,1) 25deg, transparent 35deg)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="theatre-card p-8 sm:p-10">
          {/* Gold corner ornaments */}
          {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-8 h-8`}>
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <path d="M0 0 L32 0 L32 4 L4 4 L4 32 L0 32 Z" fill="#D4AF37" opacity="0.6"/>
              </svg>
            </div>
          ))}

          {/* Logo */}
          <div className="text-center mb-8">
            <svg width="60" height="60" viewBox="0 0 44 44" className="mx-auto mb-4 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
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
            <h1 className="font-cinzel text-[#D4AF37] text-xl font-bold tracking-widest mb-1">CDE ADMIN</h1>
            <p className="font-cormorant text-white/50 text-sm italic">Restricted Access — Authorized Personnel Only</p>
          </div>

          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent mb-8" />

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="font-cinzel text-[#D4AF37]/60 text-xs tracking-widest uppercase block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-[#636363]/50 focus:border-[#D4AF37] outline-none py-3 px-1 font-cormorant text-white text-lg placeholder-[#636363]/40 transition-colors duration-300"
                placeholder="admin@cde.edu.ph"
                required
              />
            </div>

            <div>
              <label className="font-cinzel text-[#D4AF37]/60 text-xs tracking-widest uppercase block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-[#636363]/50 focus:border-[#D4AF37] outline-none py-3 px-1 font-cormorant text-white text-lg placeholder-[#636363]/40 transition-colors duration-300"
                placeholder="••••••••"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full py-4 border transition-all duration-300 ${
                loading
                  ? 'bg-[#636363]/20 border-[#636363]/30 cursor-not-allowed'
                  : 'bg-[#970000] border-[#D4AF37]/50 hover:bg-[#db0000] hover:border-[#D4AF37]'
              }`}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    className="w-4 h-4 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  <span className="font-cinzel text-white text-xs tracking-widest">AUTHENTICATING...</span>
                </div>
              ) : (
                <span className="font-cinzel text-[#D4AF37] text-sm tracking-[0.3em]">ENTER ADMIN PANEL</span>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onBack}
              className="font-cormorant text-white/30 text-sm hover:text-[#D4AF37] transition-colors duration-300"
            >
              ← Return to Main Site
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
