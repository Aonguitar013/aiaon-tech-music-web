-- 1. Create Freebies Table
CREATE TABLE IF NOT EXISTS public.freebies (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  icon_name text DEFAULT 'FileCode2',
  color_from text NOT NULL,
  color_to text NOT NULL,
  glow_color text NOT NULL,
  border_color text NOT NULL,
  text_color text NOT NULL,
  bg_color text NOT NULL,
  tag text NOT NULL,
  file_size text NOT NULL,
  file_type text NOT NULL,
  download_url text DEFAULT ''
);

-- 2. Enable Row Level Security (RLS) for freebies
ALTER TABLE public.freebies ENABLE ROW LEVEL SECURITY;

-- 3. Create Public Read Policy for freebies
CREATE POLICY "Allow public read-only access to freebies" 
ON public.freebies FOR SELECT 
USING (true);

-- 4. Insert Initial Data into freebies
INSERT INTO public.freebies 
(title, description, category, icon_name, color_from, color_to, glow_color, border_color, text_color, bg_color, tag, file_size, file_type, download_url) 
VALUES 
('n8n LINE Form Alert Template', 'Workflow JSON สำเร็จรูปสำหรับส่งการแจ้งเตือนอัตโนมัติผ่าน LINE เมื่อมีการตอบ Google Form — เชื่อมต่อได้ใน 5 นาที', 'tech', 'FileJson', 'from-cyan-500', 'to-blue-600', 'rgba(34,211,238,0.25)', 'border-cyan-500/20', 'text-cyan-400', 'bg-cyan-500/8', 'n8n · LINE API', '12 KB', 'JSON', 'https://raw.githubusercontent.com/Aonguitar013/aiaon-tech-music-web/main/README.md'),
('Logic Pro Lofi Chords MIDI Pack', 'ชุด MIDI คอร์ดสไตล์ Lofi Jazz จำนวน 20 Progression พร้อมใช้งานทันทีใน Logic Pro, Ableton Live และ FL Studio', 'music', 'Music2', 'from-amber-500', 'to-orange-500', 'rgba(245,158,11,0.25)', 'border-amber-500/20', 'text-amber-400', 'bg-amber-500/8', 'MIDI · Logic Pro', '340 KB', 'ZIP', 'https://raw.githubusercontent.com/Aonguitar013/aiaon-tech-music-web/main/README.md'),
('Google Sheets Student Tracker', 'สเปรดชีตระบบเช็คชื่อและติดตามนักเรียน พร้อม Dashboard สรุปผลอัตโนมัติ ลดเวลางานเอกสารคุณครูได้กว่า 80%', 'tech', 'FileSpreadsheet', 'from-emerald-500', 'to-teal-500', 'rgba(16,185,129,0.25)', 'border-emerald-500/20', 'text-emerald-400', 'bg-emerald-500/8', 'Google Sheets · Apps Script', '28 KB', 'XLSX', 'https://raw.githubusercontent.com/Aonguitar013/aiaon-tech-music-web/main/README.md'),
('Acoustic Guitar Loop Pack', 'ชุด Loop เสียงกีตาร์โปร่งคุณภาพสูง 12 ไฟล์ ครอบคลุม BPM 70–140 พร้อม Label บอก Key และ Tempo ทุกไฟล์', 'music', 'Mic2', 'from-rose-500', 'to-pink-500', 'rgba(244,63,94,0.25)', 'border-rose-500/20', 'text-rose-400', 'bg-rose-500/8', 'WAV · BPM Labeled', '18 MB', 'ZIP', 'https://raw.githubusercontent.com/Aonguitar013/aiaon-tech-music-web/main/README.md');

-- 5. Create Storage Buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('freebie_files', 'freebie_files', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('public_images', 'public_images', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('product_files', 'product_files', false) ON CONFLICT DO NOTHING;

-- 6. Setup Policies for Storage Buckets
CREATE POLICY "Public Access freebie_files" ON storage.objects FOR SELECT USING (bucket_id = 'freebie_files');
CREATE POLICY "Public Access public_images" ON storage.objects FOR SELECT USING (bucket_id = 'public_images');
CREATE POLICY "Authenticated Access product_files" ON storage.objects FOR SELECT USING (bucket_id = 'product_files' AND auth.role() = 'authenticated');
