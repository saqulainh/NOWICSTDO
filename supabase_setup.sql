-- =============================================
-- Supabase Table Setup for Nowic Studio CMS
-- Run this SQL in your Supabase SQL Editor
-- =============================================

-- Content storage table
CREATE TABLE IF NOT EXISTS site_content (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  section TEXT NOT NULL UNIQUE,
  data JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Allow public read access (your website visitors can see content)
CREATE POLICY "Public read access" ON site_content
  FOR SELECT USING (true);

-- Allow authenticated insert/update (for admin CMS - use anon key with RLS disabled for now)
-- If you want open write access from the admin panel (easiest for now):
CREATE POLICY "Allow insert" ON site_content
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update" ON site_content
  FOR UPDATE USING (true);

-- Seed initial data (optional - the admin panel will auto-populate these)
-- INSERT INTO site_content (section, data) VALUES ('brand', '{"name": "Nowic Studio", "tagline": "Vision to Version", "email": "hello@nowicstudio.com", "phone": "+91 98765 43210", "location": "India 🇮🇳"}');
