-- Create the content history table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.content_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  toolid TEXT NOT NULL,
  content TEXT NOT NULL,
  prompt TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security if not already enabled
ALTER TABLE content_history ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own content history" ON content_history;
DROP POLICY IF EXISTS "Users can insert own content history" ON content_history;
DROP POLICY IF EXISTS "Users can delete own content history" ON content_history;

-- Create policy for users to read their own content history
CREATE POLICY "Users can read own content history"
  ON content_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policy for users to insert their own content history
CREATE POLICY "Users can insert own content history"
  ON content_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policy for users to delete their own content history
CREATE POLICY "Users can delete own content history"
  ON content_history
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);