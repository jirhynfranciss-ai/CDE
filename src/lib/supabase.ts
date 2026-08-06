import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wfoulsbsciijydxyymec.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indmb3Vsc2JzY2lpanlkeHl5bWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NjY5NzgsImV4cCI6MjEwMTU0Mjk3OH0.VxDJp6BvDOwM8D6oeKrRc_p1vYHJT_XaY1CiveSv2ik';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Officer = {
  id: string;
  name: string;
  position: string;
  photo_url: string;
  description: string;
  social_links: { facebook?: string; instagram?: string; twitter?: string };
  display_order: number;
  created_at: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  date_achieved: string;
  image_url: string;
  category: string;
  message: string;
  display_order: number;
  created_at: string;
};

export type Production = {
  id: string;
  title: string;
  description: string;
  poster_url: string;
  production_date: string;
  status: 'past' | 'upcoming';
  cast_info: string;
  display_order: number;
  created_at: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  registration_link: string;
  image_url: string;
  display_order: number;
  created_at: string;
};

export type GalleryItem = {
  id: string;
  image_url: string;
  caption: string;
  category: string;
  date_uploaded: string;
  display_order: number;
};

export type MediaItem = {
  id: string;
  media_type: 'video' | 'article';
  title: string;
  url: string;
  thumbnail_url: string;
  description: string;
  date_added: string;
};

export type Testimonial = {
  id: string;
  member_name: string;
  member_role: string;
  testimonial_text: string;
  photo_url: string;
  display_order: number;
  created_at: string;
};

export type SiteSetting = {
  id: string;
  section_name: string;
  content_html: string;
  updated_at: string;
};
