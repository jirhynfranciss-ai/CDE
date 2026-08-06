import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState({ name: '', email: '', message: '', subject: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate form submission
    await new Promise(r => setTimeout(r, 1500));
    toast.success('Message sent! We\'ll respond soon.', {
      style: {
        background: '#0a0000',
        color: '#D4AF37',
        border: '1px solid rgba(212,175,55,0.3)',
        fontFamily: 'Cinzel, serif',
      },
      iconTheme: { primary: '#D4AF37', secondary: '#000' },
    });
    setForm({ name: '', email: '', message: '', subject: '' });
    setSubmitting(false);
  };

  const inputClass = `w-full bg-transparent border-b border-[#636363]/50 focus:border-[#D4AF37] outline-none py-3 px-1 font-cormorant text-white text-lg placeholder-[#636363]/60 transition-colors duration-300`;

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-[#050000] to-black overflow-hidden">
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
            — Reach Out —
          </span>
          <h2 className="font-cinzel font-bold text-4xl sm:text-5xl lg:text-6xl text-[#970000] mb-4"
            style={{ textShadow: '0 0 30px rgba(151,0,0,0.3)' }}>
            Contact Us
          </h2>
          <p className="font-playfair italic text-white/60 text-xl max-w-2xl mx-auto">
            The curtain is open. We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-cinzel text-[#D4AF37] text-xl tracking-widest mb-6 flex items-center gap-3">
                <div className="w-1 h-6 bg-[#D4AF37]" />
                GET IN TOUCH
              </h3>
              <p className="font-cormorant text-white/70 text-lg leading-relaxed mb-8">
                Whether you're a prospective member, a fellow theatre organization, a media partner, or simply a passionate supporter of the arts, we welcome your message.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-6">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 1 C6.1 1 3 4.1 3 8 C3 13.5 10 19 10 19 C10 19 17 13.5 17 8 C17 4.1 13.9 1 10 1Z" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
                      <circle cx="10" cy="8" r="2.5" fill="#D4AF37"/>
                    </svg>
                  ),
                  label: 'Address',
                  value: 'USTP Main Campus, Lapasan, Cagayan de Oro City, 9000 Misamis Oriental, Philippines',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="2" y="4" width="16" height="12" rx="2" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
                      <path d="M2 7 L10 12 L18 7" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ),
                  label: 'Email',
                  value: 'circulodeentablado@ustp.edu.ph',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="4" y="2" width="12" height="16" rx="2" stroke="#D4AF37" strokeWidth="1.5" fill="none"/>
                      <circle cx="10" cy="14" r="1" fill="#D4AF37"/>
                    </svg>
                  ),
                  label: 'Phone',
                  value: '+63 (088) 880-0000',
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-cinzel text-[#D4AF37] text-xs tracking-widest mb-1">{item.label}</div>
                    <div className="font-cormorant text-white/70 text-base">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social media */}
            <div>
              <div className="font-cinzel text-[#D4AF37] text-xs tracking-widest mb-4">FOLLOW US</div>
              <div className="flex gap-4">
                {[
                  { icon: 'f', label: 'Facebook' },
                  { icon: '◎', label: 'Instagram' },
                  { icon: '𝕏', label: 'Twitter' },
                  { icon: '▶', label: 'YouTube' },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href="#"
                    className="w-10 h-10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]/60 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 font-cinzel text-sm"
                    whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(212,175,55,0.3)' }}
                    title={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="theatre-card p-8 hover:border-[#D4AF37]/40 transition-all duration-500">
              {/* Gold corner ornaments */}
              {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-6 h-6`}>
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path d="M0 0 L24 0 L24 3 L3 3 L3 24 L0 24 Z" fill="#D4AF37" opacity="0.5"/>
                  </svg>
                </div>
              ))}

              <h3 className="font-cinzel text-[#D4AF37] text-lg tracking-widest mb-8">SEND A MESSAGE</h3>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div>
                  <label className="font-cinzel text-[#D4AF37]/60 text-xs tracking-widest uppercase block mb-1">Your Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={inputClass}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="font-cinzel text-[#D4AF37]/60 text-xs tracking-widest uppercase block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={inputClass}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="font-cinzel text-[#D4AF37]/60 text-xs tracking-widest uppercase block mb-1">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className={inputClass}
                    placeholder="What is this regarding?"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="font-cinzel text-[#D4AF37]/60 text-xs tracking-widest uppercase block mb-1">Message</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className={`${inputClass} resize-none`}
                    placeholder="Write your message here..."
                    rows={4}
                    required
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="relative w-full overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`relative px-8 py-4 transition-all duration-300 ${
                    submitting
                      ? 'bg-[#636363]/50 border border-[#636363]/50 cursor-not-allowed'
                      : 'bg-[#970000] border border-[#D4AF37]/50 hover:bg-[#db0000] hover:border-[#D4AF37]'
                  }`}>
                    {/* Ticket notches */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-[#D4AF37]/50 bg-black" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full border border-[#D4AF37]/50 bg-black" />

                    {submitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <motion.div
                          className="w-4 h-4 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        <span className="font-cinzel text-white text-xs tracking-[0.3em]">SENDING...</span>
                      </div>
                    ) : (
                      <span className="font-cinzel text-[#D4AF37] text-xs sm:text-sm tracking-[0.3em] uppercase">
                        📨 Send Message
                      </span>
                    )}
                  </div>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
