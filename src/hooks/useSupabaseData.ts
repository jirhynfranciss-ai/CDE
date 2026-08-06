import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Officer, Achievement, Production, Event, GalleryItem, MediaItem, Testimonial } from '../lib/supabase';
import {
  mockOfficers,
  mockAchievements,
  mockProductions,
  mockEvents,
  mockGallery,
  mockMedia,
  mockTestimonials,
} from '../data/mockData';

const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  return url && url !== 'https://placeholder.supabase.co';
};

export function useOfficers() {
  const [data, setData] = useState<Officer[]>(mockOfficers);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    setLoading(true);
    supabase.from('officers').select('*').order('display_order').then(({ data: d }) => {
      if (d && d.length > 0) setData(d as Officer[]);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}

export function useAchievements() {
  const [data, setData] = useState<Achievement[]>(mockAchievements);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    setLoading(true);
    supabase.from('achievements').select('*').order('display_order').then(({ data: d }) => {
      if (d && d.length > 0) setData(d as Achievement[]);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}

export function useProductions() {
  const [data, setData] = useState<Production[]>(mockProductions);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    setLoading(true);
    supabase.from('productions').select('*').order('display_order').then(({ data: d }) => {
      if (d && d.length > 0) setData(d as Production[]);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}

export function useEvents() {
  const [data, setData] = useState<Event[]>(mockEvents);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    setLoading(true);
    supabase.from('events').select('*').order('event_date').then(({ data: d }) => {
      if (d && d.length > 0) setData(d as Event[]);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}

export function useGallery() {
  const [data, setData] = useState<GalleryItem[]>(mockGallery);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    setLoading(true);
    supabase.from('gallery').select('*').order('display_order').then(({ data: d }) => {
      if (d && d.length > 0) setData(d as GalleryItem[]);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}

export function useMedia() {
  const [data, setData] = useState<MediaItem[]>(mockMedia);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    setLoading(true);
    supabase.from('media').select('*').order('date_added', { ascending: false }).then(({ data: d }) => {
      if (d && d.length > 0) setData(d as MediaItem[]);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}

export function useTestimonials() {
  const [data, setData] = useState<Testimonial[]>(mockTestimonials);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    setLoading(true);
    supabase.from('testimonials').select('*').order('display_order').then(({ data: d }) => {
      if (d && d.length > 0) setData(d as Testimonial[]);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}
