const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error(error);
    return;
  }
  fs.writeFileSync(path.join(__dirname, 'courses_output.json'), JSON.stringify(data, null, 2));
  console.log('Courses data written to scratch/courses_output.json');
}
main();
