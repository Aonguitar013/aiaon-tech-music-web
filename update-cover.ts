import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const courseTitle = "Advanced Tailwind Architecture";
  const newUrl = "https://orjizgjkknluzuinyzri.supabase.co/storage/v1/object/public/course-covers/Advanced%20Tailwind%20Architecture.jpeg";

  console.log(`Updating course "${courseTitle}" with new image_url...`);

  const { data, error } = await supabase
    .from('courses')
    .update({ image_url: newUrl })
    .eq('title', courseTitle)
    .select();

  if (error) {
    console.error("Error updating course:", error);
    // Attempting to just send a dummy request to reload schema, though PostgREST does it automatically on error
    process.exit(1);
  }

  if (data && data.length > 0) {
    console.log("Success! Updated the following row:", data);
  } else {
    console.log("No course found with that title, or RLS prevented the update.");
  }
}

main();
