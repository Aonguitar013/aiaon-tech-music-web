const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  // Let's try to query lessons
  const { data, error } = await supabase.from('lessons').select('*').limit(1);
  if (error) {
    console.error('Error fetching lessons:', error);
    return;
  }
  console.log('Sample lesson:', data);
}
main();
