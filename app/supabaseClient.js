import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gzmjbbdaahjcwpnmtiei.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6bWpiYmRhYWhqY3dwbm10aWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4NTMzNzIsImV4cCI6MjA3NzQyOTM3Mn0.FhExzQg92wYoKVIJdWOlgB_ovZ86xz7cmboGZ2EcqQ4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
