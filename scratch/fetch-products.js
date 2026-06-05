require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function main() {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error(error);
    return;
  }
  const matching = data.filter(p => {
    const text = (p.title + ' ' + p.description + ' ' + p.category).toLowerCase();
    return text.includes('ebook') || text.includes('e-book') || text.includes('book') || text.includes('script') || text.includes('สคริปต์');
  });
  console.log(`Found ${matching.length} matching products:`);
  console.log(matching.map(p => ({ title: p.title, category: p.category, desc: p.description })));
}

main();
