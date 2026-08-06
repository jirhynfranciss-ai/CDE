import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import {
  mockOfficers,
  mockAchievements,
  mockProductions,
  mockEvents,
  mockGallery,
  mockTestimonials,
  mockMedia,
} from '../data/mockData';
import type { Officer, Achievement, Production, Event, GalleryItem, Testimonial, MediaItem } from '../lib/supabase';

type Section = 'dashboard' | 'officers' | 'achievements' | 'productions' | 'events' | 'gallery' | 'media' | 'testimonials' | 'settings';

const sidebarItems: { id: Section; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '◈' },
  { id: 'officers', label: 'Officers', icon: '👥' },
  { id: 'achievements', label: 'Achievements', icon: '🏆' },
  { id: 'productions', label: 'Productions', icon: '🎭' },
  { id: 'events', label: 'Events', icon: '📅' },
  { id: 'gallery', label: 'Gallery', icon: '🖼' },
  { id: 'media', label: 'Media', icon: '🎬' },
  { id: 'testimonials', label: 'Testimonials', icon: '💬' },
  { id: 'settings', label: 'Site Settings', icon: '⚙' },
];

const toastStyle = {
  style: { background: '#0a0000', color: '#D4AF37', border: '1px solid rgba(212,175,55,0.3)', fontFamily: 'Cinzel, serif' },
};

// Generic table for officers
function OfficersManager() {
  const [officers, setOfficers] = useState<Officer[]>(mockOfficers);
  const [editing, setEditing] = useState<Officer | null>(null);
  const [form, setForm] = useState<Partial<Officer>>({});
  const [showForm, setShowForm] = useState(false);

  const openAdd = () => {
    setEditing(null);
    setForm({ name: '', position: '', description: '', photo_url: '', display_order: officers.length + 1 });
    setShowForm(true);
  };

  const openEdit = (o: Officer) => {
    setEditing(o);
    setForm(o);
    setShowForm(true);
  };

  const handleSave = () => {
    if (editing) {
      setOfficers(prev => prev.map(o => o.id === editing.id ? { ...o, ...form } as Officer : o));
      toast.success('Officer updated!', toastStyle);
    } else {
      const newOfficer: Officer = {
        id: Date.now().toString(),
        name: form.name || '',
        position: form.position || '',
        description: form.description || '',
        photo_url: form.photo_url || '',
        social_links: {},
        display_order: form.display_order || 1,
        created_at: new Date().toISOString(),
      };
      setOfficers(prev => [...prev, newOfficer]);
      toast.success('Officer added!', toastStyle);
    }
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this officer?')) {
      setOfficers(prev => prev.filter(o => o.id !== id));
      toast.success('Officer deleted.', toastStyle);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-cinzel text-[#D4AF37] text-xl tracking-widest">OFFICERS MANAGEMENT</h2>
        <button onClick={openAdd} className="px-4 py-2 bg-[#970000] border border-[#D4AF37]/50 font-cinzel text-[#D4AF37] text-xs tracking-widest hover:bg-[#db0000] transition-colors">
          + ADD OFFICER
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#D4AF37]/20">
              {['Name', 'Position', 'Order', 'Actions'].map(h => (
                <th key={h} className="text-left py-3 px-4 font-cinzel text-[#D4AF37]/60 text-xs tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {officers.sort((a,b) => a.display_order - b.display_order).map(o => (
              <tr key={o.id} className="border-b border-[#D4AF37]/10 hover:bg-[#D4AF37]/5 transition-colors">
                <td className="py-3 px-4 font-cormorant text-white text-base">{o.name}</td>
                <td className="py-3 px-4 font-cormorant text-white/70 text-sm">{o.position}</td>
                <td className="py-3 px-4 font-cinzel text-[#D4AF37]/60 text-xs">{o.display_order}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button onClick={() => openEdit(o)} className="px-3 py-1 border border-[#D4AF37]/30 font-cinzel text-[#D4AF37] text-[10px] tracking-widest hover:bg-[#D4AF37]/10 transition-colors">EDIT</button>
                  <button onClick={() => handleDelete(o.id)} className="px-3 py-1 border border-[#970000]/50 font-cinzel text-[#970000] text-[10px] tracking-widest hover:bg-[#970000]/10 transition-colors">DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-lg theatre-card p-8"
            >
              <h3 className="font-cinzel text-[#D4AF37] text-lg tracking-widest mb-6">
                {editing ? 'EDIT OFFICER' : 'ADD OFFICER'}
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Full Name', key: 'name' as const, type: 'text' },
                  { label: 'Position', key: 'position' as const, type: 'text' },
                  { label: 'Photo URL', key: 'photo_url' as const, type: 'text' },
                  { label: 'Display Order', key: 'display_order' as const, type: 'number' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="font-cinzel text-[#D4AF37]/60 text-xs tracking-widest block mb-1">{field.label.toUpperCase()}</label>
                    <input
                      type={field.type}
                      value={(form[field.key] as string | number) || ''}
                      onChange={e => setForm(f => ({ ...f, [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value }))}
                      className="w-full bg-transparent border-b border-[#636363]/50 focus:border-[#D4AF37] outline-none py-2 font-cormorant text-white text-base transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="font-cinzel text-[#D4AF37]/60 text-xs tracking-widest block mb-1">BIOGRAPHY</label>
                  <textarea
                    value={form.description || ''}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    rows={3}
                    className="w-full bg-transparent border border-[#636363]/30 focus:border-[#D4AF37] outline-none p-2 font-cormorant text-white text-base transition-colors resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={handleSave} className="flex-1 py-3 bg-[#970000] border border-[#D4AF37]/50 font-cinzel text-[#D4AF37] text-xs tracking-widest hover:bg-[#db0000] transition-colors">SAVE</button>
                <button onClick={() => setShowForm(false)} className="flex-1 py-3 border border-[#636363]/50 font-cinzel text-white/50 text-xs tracking-widest hover:text-white transition-colors">CANCEL</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Achievements manager
function AchievementsManager() {
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Achievement | null>(null);
  const [form, setForm] = useState<Partial<Achievement>>({});

  const openAdd = () => {
    setEditing(null);
    setForm({ title: '', description: '', date_achieved: '', image_url: '', category: 'Award', message: '', display_order: achievements.length + 1 });
    setShowForm(true);
  };

  const openEdit = (a: Achievement) => { setEditing(a); setForm(a); setShowForm(true); };

  const handleSave = () => {
    if (editing) {
      setAchievements(prev => prev.map(a => a.id === editing.id ? { ...a, ...form } as Achievement : a));
    } else {
      setAchievements(prev => [...prev, { ...form, id: Date.now().toString(), created_at: new Date().toISOString() } as Achievement]);
    }
    toast.success(editing ? 'Achievement updated!' : 'Achievement added!', toastStyle);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this achievement?')) {
      setAchievements(prev => prev.filter(a => a.id !== id));
      toast.success('Achievement deleted.', toastStyle);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-cinzel text-[#D4AF37] text-xl tracking-widest">ACHIEVEMENTS MANAGEMENT</h2>
        <button onClick={openAdd} className="px-4 py-2 bg-[#970000] border border-[#D4AF37]/50 font-cinzel text-[#D4AF37] text-xs tracking-widest hover:bg-[#db0000] transition-colors">+ ADD ACHIEVEMENT</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#D4AF37]/20">
              {['Title', 'Category', 'Date', 'Actions'].map(h => (
                <th key={h} className="text-left py-3 px-4 font-cinzel text-[#D4AF37]/60 text-xs tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {achievements.map(a => (
              <tr key={a.id} className="border-b border-[#D4AF37]/10 hover:bg-[#D4AF37]/5 transition-colors">
                <td className="py-3 px-4 font-cormorant text-white text-base max-w-xs truncate">{a.title}</td>
                <td className="py-3 px-4 font-cinzel text-[#D4AF37]/60 text-xs">{a.category}</td>
                <td className="py-3 px-4 font-cormorant text-white/60 text-sm">{a.date_achieved}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button onClick={() => openEdit(a)} className="px-3 py-1 border border-[#D4AF37]/30 font-cinzel text-[#D4AF37] text-[10px] tracking-widest hover:bg-[#D4AF37]/10 transition-colors">EDIT</button>
                  <button onClick={() => handleDelete(a.id)} className="px-3 py-1 border border-[#970000]/50 font-cinzel text-[#970000] text-[10px] tracking-widest hover:bg-[#970000]/10 transition-colors">DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-lg theatre-card p-8 my-8"
            >
              <h3 className="font-cinzel text-[#D4AF37] text-lg tracking-widest mb-6">{editing ? 'EDIT ACHIEVEMENT' : 'ADD ACHIEVEMENT'}</h3>
              <div className="space-y-4">
                {[
                  { label: 'Title', key: 'title' as const, type: 'text' },
                  { label: 'Date Achieved', key: 'date_achieved' as const, type: 'date' },
                  { label: 'Image URL', key: 'image_url' as const, type: 'text' },
                  { label: 'Display Order', key: 'display_order' as const, type: 'number' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="font-cinzel text-[#D4AF37]/60 text-xs tracking-widest block mb-1">{field.label.toUpperCase()}</label>
                    <input
                      type={field.type}
                      value={(form[field.key] as string | number) || ''}
                      onChange={e => setForm(f => ({ ...f, [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value }))}
                      className="w-full bg-transparent border-b border-[#636363]/50 focus:border-[#D4AF37] outline-none py-2 font-cormorant text-white text-base transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="font-cinzel text-[#D4AF37]/60 text-xs tracking-widest block mb-1">CATEGORY</label>
                  <select
                    value={form.category || 'Award'}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full bg-black border-b border-[#636363]/50 focus:border-[#D4AF37] outline-none py-2 font-cormorant text-white text-base transition-colors"
                  >
                    {['Award', 'Competition', 'Individual Award', 'Institutional Award', 'Performance Award', 'Civic Award'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-cinzel text-[#D4AF37]/60 text-xs tracking-widest block mb-1">DESCRIPTION</label>
                  <textarea value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full bg-transparent border border-[#636363]/30 focus:border-[#D4AF37] outline-none p-2 font-cormorant text-white text-base transition-colors resize-none" />
                </div>
                <div>
                  <label className="font-cinzel text-[#D4AF37]/60 text-xs tracking-widest block mb-1">QUOTE/MESSAGE</label>
                  <textarea value={form.message || ''} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={2} className="w-full bg-transparent border border-[#636363]/30 focus:border-[#D4AF37] outline-none p-2 font-cormorant text-white text-base transition-colors resize-none" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={handleSave} className="flex-1 py-3 bg-[#970000] border border-[#D4AF37]/50 font-cinzel text-[#D4AF37] text-xs tracking-widest hover:bg-[#db0000] transition-colors">SAVE</button>
                <button onClick={() => setShowForm(false)} className="flex-1 py-3 border border-[#636363]/50 font-cinzel text-white/50 text-xs tracking-widest hover:text-white transition-colors">CANCEL</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simple table-based managers for other sections
function SimpleManager<T extends { id: string; display_order?: number }>({
  title,
  data,
  columns,
}: {
  title: string;
  data: T[];
  columns: { label: string; key: keyof T }[];
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-cinzel text-[#D4AF37] text-xl tracking-widest">{title}</h2>
        <button
          onClick={() => toast.success('Connect Supabase to manage data', toastStyle)}
          className="px-4 py-2 bg-[#970000] border border-[#D4AF37]/50 font-cinzel text-[#D4AF37] text-xs tracking-widest hover:bg-[#db0000] transition-colors"
        >
          + ADD NEW
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#D4AF37]/20">
              {[...columns.map(c => c.label), 'Actions'].map(h => (
                <th key={h} className="text-left py-3 px-4 font-cinzel text-[#D4AF37]/60 text-xs tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b border-[#D4AF37]/10 hover:bg-[#D4AF37]/5 transition-colors">
                {columns.map(col => (
                  <td key={String(col.key)} className="py-3 px-4 font-cormorant text-white/80 text-sm max-w-[200px] truncate">
                    {String(row[col.key] || '')}
                  </td>
                ))}
                <td className="py-3 px-4 flex gap-2">
                  <button onClick={() => toast.success('Connect Supabase to edit', toastStyle)} className="px-3 py-1 border border-[#D4AF37]/30 font-cinzel text-[#D4AF37] text-[10px] tracking-widest hover:bg-[#D4AF37]/10 transition-colors">EDIT</button>
                  <button onClick={() => toast.success('Connect Supabase to delete', toastStyle)} className="px-3 py-1 border border-[#970000]/50 font-cinzel text-[#970000] text-[10px] tracking-widest hover:bg-[#970000]/10 transition-colors">DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Dashboard() {
  const stats = [
    { label: 'Productions', value: mockProductions.length, icon: '🎭' },
    { label: 'Achievements', value: mockAchievements.length, icon: '🏆' },
    { label: 'Officers', value: mockOfficers.length, icon: '👥' },
    { label: 'Events', value: mockEvents.length, icon: '📅' },
    { label: 'Gallery Items', value: mockGallery.length, icon: '🖼' },
    { label: 'Testimonials', value: mockTestimonials.length, icon: '💬' },
  ];

  return (
    <div>
      <h2 className="font-cinzel text-[#D4AF37] text-2xl tracking-widest mb-8">DASHBOARD OVERVIEW</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="theatre-card p-6 hover:border-[#D4AF37]/50 transition-all duration-300">
            <div className="text-3xl mb-3">{stat.icon}</div>
            <div className="font-cinzel text-[#D4AF37] text-3xl font-bold mb-1">{stat.value}</div>
            <div className="font-cinzel text-white/50 text-xs tracking-widest uppercase">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="theatre-card p-6">
        <h3 className="font-cinzel text-[#D4AF37] text-lg tracking-widest mb-4">QUICK ACTIONS</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['Add Officer', 'Add Achievement', 'Add Production', 'Add Event'].map(action => (
            <button
              key={action}
              onClick={() => toast.success(`Navigate to ${action.split(' ')[1]}s section`, toastStyle)}
              className="p-3 border border-[#D4AF37]/20 font-cinzel text-[#D4AF37]/60 text-xs tracking-widest hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-300 text-center"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 theatre-card p-6">
        <h3 className="font-cinzel text-[#D4AF37] text-sm tracking-widest mb-3">⚠ SUPABASE INTEGRATION NOTE</h3>
        <p className="font-cormorant text-white/60 text-base leading-relaxed">
          To enable real data management, set your <span className="text-[#D4AF37]">VITE_SUPABASE_URL</span> and <span className="text-[#D4AF37]">VITE_SUPABASE_ANON_KEY</span> environment variables. 
          The database schema SQL is included in the project documentation. Once connected, all CRUD operations will persist to your Supabase database.
        </p>
      </div>
    </div>
  );
}

interface Props {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: Props) {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await supabase.auth.signOut().catch(() => {});
    onLogout();
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard />;
      case 'officers': return <OfficersManager />;
      case 'achievements': return <AchievementsManager />;
      case 'productions':
        return (
          <SimpleManager
            title="PRODUCTIONS MANAGEMENT"
            data={mockProductions as Production[]}
            columns={[
              { label: 'Title', key: 'title' },
              { label: 'Status', key: 'status' },
              { label: 'Date', key: 'production_date' },
            ]}
          />
        );
      case 'events':
        return (
          <SimpleManager
            title="EVENTS MANAGEMENT"
            data={mockEvents as Event[]}
            columns={[
              { label: 'Title', key: 'title' },
              { label: 'Date', key: 'event_date' },
              { label: 'Location', key: 'location' },
            ]}
          />
        );
      case 'gallery':
        return (
          <SimpleManager
            title="GALLERY MANAGEMENT"
            data={mockGallery as GalleryItem[]}
            columns={[
              { label: 'Caption', key: 'caption' },
              { label: 'Category', key: 'category' },
              { label: 'Date', key: 'date_uploaded' },
            ]}
          />
        );
      case 'media':
        return (
          <SimpleManager
            title="MEDIA MANAGEMENT"
            data={mockMedia as MediaItem[]}
            columns={[
              { label: 'Title', key: 'title' },
              { label: 'Type', key: 'media_type' },
              { label: 'Date', key: 'date_added' },
            ]}
          />
        );
      case 'testimonials':
        return (
          <SimpleManager
            title="TESTIMONIALS MANAGEMENT"
            data={mockTestimonials as Testimonial[]}
            columns={[
              { label: 'Name', key: 'member_name' },
              { label: 'Role', key: 'member_role' },
            ]}
          />
        );
      case 'settings':
        return (
          <div>
            <h2 className="font-cinzel text-[#D4AF37] text-xl tracking-widest mb-6">SITE SETTINGS</h2>
            <div className="space-y-6">
              {['About Us Content', 'Mission Statement', 'Vision Statement', 'Contact Information', 'Social Media Links'].map(setting => (
                <div key={setting} className="theatre-card p-6">
                  <h3 className="font-cinzel text-[#D4AF37] text-sm tracking-widest mb-3">{setting.toUpperCase()}</h3>
                  <textarea
                    placeholder={`Enter ${setting} here...`}
                    rows={4}
                    className="w-full bg-transparent border border-[#636363]/30 focus:border-[#D4AF37] outline-none p-3 font-cormorant text-white text-base resize-none transition-colors"
                  />
                  <button
                    onClick={() => toast.success(`${setting} saved!`, toastStyle)}
                    className="mt-3 px-6 py-2 bg-[#970000] border border-[#D4AF37]/50 font-cinzel text-[#D4AF37] text-xs tracking-widest hover:bg-[#db0000] transition-colors"
                  >
                    SAVE
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 64 }}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0 bg-gradient-to-b from-[#0a0000] to-black border-r border-[#D4AF37]/20 flex flex-col overflow-hidden"
      >
        {/* Sidebar header */}
        <div className="p-4 border-b border-[#D4AF37]/20 flex items-center justify-between">
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-cinzel text-[#D4AF37] text-sm font-bold tracking-widest">CDE ADMIN</motion.div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-8 h-8 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all"
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 mb-1 transition-all duration-200 text-left ${
                activeSection === item.id
                  ? 'bg-[#970000]/30 border-l-2 border-[#D4AF37] text-[#D4AF37]'
                  : 'text-white/50 hover:text-white/80 hover:bg-[#D4AF37]/5'
              }`}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-cinzel text-xs tracking-widest whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-[#D4AF37]/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 text-[#970000]/70 hover:text-[#db0000] transition-colors"
          >
            <span className="text-lg">⟵</span>
            {sidebarOpen && <span className="font-cinzel text-xs tracking-widest">LOGOUT</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto admin-scroll">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-[#D4AF37]/20 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-cinzel text-white text-sm tracking-widest">
              {sidebarItems.find(i => i.id === activeSection)?.icon} {sidebarItems.find(i => i.id === activeSection)?.label.toUpperCase()}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); onLogout(); }}
              className="font-cinzel text-[#D4AF37]/60 text-xs tracking-widest hover:text-[#D4AF37] transition-colors"
            >
              ← VIEW SITE
            </a>
          </div>
        </div>

        <div className="p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
