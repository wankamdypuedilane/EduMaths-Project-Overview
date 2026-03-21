import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve('../../frontend/.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkClasses() {
  const { data, error } = await supabase.from('classes').select('*').order('order');
  if (error) {
    console.error("Error fetching classes:", error);
  } else {
    console.log("Classes in DB:", JSON.stringify(data, null, 2));
  }
}

checkClasses();
