import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const [{ data: courses }, { data: products }] = await Promise.all([
    supabase.from('courses').select('id, title, category'),
    supabase.from('products').select('id, title, category'),
  ]);
  console.log("=== COURSES ===");
  console.log(courses);
  console.log("=== PRODUCTS ===");
  console.log(products);
}
main();
