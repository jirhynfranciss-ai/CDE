-- =============================================
-- Circulo de Entablado (CDE) - Supabase Schema
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- OFFICERS TABLE
-- =============================================
CREATE TABLE officers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  photo_url TEXT DEFAULT '',
  description TEXT DEFAULT '',
  social_links JSONB DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_officers_display_order ON officers(display_order);

-- =============================================
-- ACHIEVEMENTS TABLE
-- =============================================
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  date_achieved DATE NOT NULL,
  image_url TEXT DEFAULT '',
  category TEXT DEFAULT 'Award',
  message TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_achievements_date ON achievements(date_achieved DESC);
CREATE INDEX idx_achievements_category ON achievements(category);
CREATE INDEX idx_achievements_display_order ON achievements(display_order);

-- =============================================
-- PRODUCTIONS TABLE
-- =============================================
CREATE TABLE productions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  poster_url TEXT DEFAULT '',
  production_date DATE NOT NULL,
  status TEXT DEFAULT 'past' CHECK (status IN ('past', 'upcoming')),
  cast_info TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_productions_status ON productions(status);
CREATE INDEX idx_productions_display_order ON productions(display_order);

-- =============================================
-- EVENTS TABLE
-- =============================================
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  event_date TIMESTAMPTZ NOT NULL,
  location TEXT DEFAULT '',
  registration_link TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_display_order ON events(display_order);

-- =============================================
-- GALLERY TABLE
-- =============================================
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  caption TEXT DEFAULT '',
  category TEXT DEFAULT 'Productions',
  date_uploaded DATE DEFAULT CURRENT_DATE,
  display_order INTEGER DEFAULT 0
);

CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_gallery_display_order ON gallery(display_order);

-- =============================================
-- MEDIA TABLE
-- =============================================
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  media_type TEXT DEFAULT 'video' CHECK (media_type IN ('video', 'article')),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT DEFAULT '',
  description TEXT DEFAULT '',
  date_added DATE DEFAULT CURRENT_DATE
);

CREATE INDEX idx_media_type ON media(media_type);
CREATE INDEX idx_media_date ON media(date_added DESC);

-- =============================================
-- TESTIMONIALS TABLE
-- =============================================
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_name TEXT NOT NULL,
  member_role TEXT DEFAULT '',
  testimonial_text TEXT NOT NULL,
  photo_url TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_testimonials_display_order ON testimonials(display_order);

-- =============================================
-- SITE SETTINGS TABLE
-- =============================================
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_name TEXT UNIQUE NOT NULL,
  content_html TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (section_name, content_html) VALUES
  ('about_us', ''),
  ('mission', ''),
  ('vision', ''),
  ('contact_info', ''),
  ('social_links', '');

-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE officers ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE productions ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public READ access (anyone can view)
CREATE POLICY "Public can read officers" ON officers FOR SELECT USING (true);
CREATE POLICY "Public can read achievements" ON achievements FOR SELECT USING (true);
CREATE POLICY "Public can read productions" ON productions FOR SELECT USING (true);
CREATE POLICY "Public can read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public can read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public can read media" ON media FOR SELECT USING (true);
CREATE POLICY "Public can read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public can read site_settings" ON site_settings FOR SELECT USING (true);

-- Authenticated admin WRITE access (INSERT, UPDATE, DELETE)
CREATE POLICY "Admins can insert officers" ON officers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update officers" ON officers FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete officers" ON officers FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert achievements" ON achievements FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update achievements" ON achievements FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete achievements" ON achievements FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert productions" ON productions FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update productions" ON productions FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete productions" ON productions FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert events" ON events FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update events" ON events FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete events" ON events FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert gallery" ON gallery FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update gallery" ON gallery FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete gallery" ON gallery FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert media" ON media FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update media" ON media FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete media" ON media FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert testimonials" ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update testimonials" ON testimonials FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete testimonials" ON testimonials FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert site_settings" ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update site_settings" ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');
