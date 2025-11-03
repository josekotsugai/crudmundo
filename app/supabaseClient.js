import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dvyvvslnbsgmxuulijsd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2eXZ2c2xuYnNnbXh1dWxpanNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjA2MzIsImV4cCI6MjA3NzczNjYzMn0.DVtdyAI1JJGv4DNkkrzNA5zZXxKYUfjEnWZXdbKcoS4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
