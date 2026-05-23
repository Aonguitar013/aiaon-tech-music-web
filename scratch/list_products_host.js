const fs = require('fs');
const path = require('path');

// Basic parser for .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.substring(1, value.length - 1);
    }
    env[key] = value.trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("Fetching products...");
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Found products count:", data.length);
    data.forEach(p => {
      console.log(`- ID: ${p.id} | Title: ${p.title} | Price: ${p.price} | Icon: ${p.icon_name} | File URL: ${p.file_url}`);
    });
  }
}
main();
