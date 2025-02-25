const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Supabase URL or Key is missing in environment variables");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;


/* 
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;


CREATE POLICY "Allow insert for public users"
ON storage.objects
FOR INSERT
WITH CHECK (auth.role() = 'anon');



*/