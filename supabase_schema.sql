-- ============================================================
-- The Journal of Youth Perspectives — Supabase Schema
-- ============================================================

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  email TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Human Rights', 'Ecology', 'Gender Equality')),
  image_url TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published articles
CREATE POLICY "Public read access"
  ON articles
  FOR SELECT
  USING (true);

-- Policy: Anyone can submit (insert) articles
CREATE POLICY "Public insert access"
  ON articles
  FOR INSERT
  WITH CHECK (true);

-- Note: UPDATE and DELETE are intentionally not exposed.
-- Admin operations should be performed via the Supabase dashboard
-- or a separate admin interface using the service role key.
