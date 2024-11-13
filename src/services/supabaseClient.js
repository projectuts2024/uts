import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://itluxwmlqwywxiqicfym.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bHV4d21scXd5d3hpcWljZnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0ODEwNzgsImV4cCI6MjA0NzA1NzA3OH0.-Vx-MRcwyRIHRMWanxZmA7cKb1ZPNGEMf-jvoOOBHC8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);