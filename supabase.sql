-- Run this script in your Supabase SQL Editor

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  price text NOT NULL,
  category text,
  icon_name text DEFAULT 'FileCode2',
  color_classes text,
  button_classes text,
  file_url text,
  ebook_url text,
  ebook_content text
);

-- 2. Create Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  instructor text DEFAULT 'AiAon Tech',
  price text,
  icon_name text DEFAULT 'Code2',
  color_gradient text
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- 4. Create Public Read Policies
CREATE POLICY "Allow public read-only access to products" 
ON public.products FOR SELECT 
USING (true);

CREATE POLICY "Allow public read-only access to courses" 
ON public.courses FOR SELECT 
USING (true);

-- 5. Insert Initial Fallback Data (Optional, if you want the DB populated immediately)
INSERT INTO public.products (title, description, price, icon_name, color_classes, button_classes) VALUES 
('เทมเพลตสื่อการสอนอัตโนมัติ', 'ชุดเทมเพลตพร้อมใช้งานที่ช่วยให้ครูสร้างสื่อการสอนได้ง่ายและรวดเร็ว ไม่ต้องเสียเวลาออกแบบใหม่ตั้งแต่ต้น', '299 THB', 'FileCode2', 'text-purple-400 bg-purple-500/10 group-hover:bg-purple-500/20 border-purple-500/20', 'bg-purple-500 hover:bg-purple-600'),
('คอร์ส Google Apps Script สำหรับครู', 'เรียนรู้การเขียนสคริปต์บน Google Workspace เพื่อลดเวลาการทำงานซ้ำซ้อน สร้างระบบการจัดการโรงเรียนด้วยตนเอง', '990 THB', 'BookText', 'text-orange-400 bg-orange-500/10 group-hover:bg-orange-500/20 border-orange-500/20', 'bg-orange-500 hover:bg-orange-600'),
('ระบบเช็กชื่อและแจ้งเตือนผ่าน LINE', 'ระบบอัตโนมัติแจ้งเตือนการเข้าเรียนหรือพฤติกรรมนักเรียนตรงเข้า LINE ผู้ปกครองแบบเรียลไทม์', '1,500 THB', 'MessageSquareShare', 'text-emerald-400 bg-emerald-500/10 group-hover:bg-emerald-500/20 border-emerald-500/20', 'bg-emerald-500 hover:bg-emerald-600');

INSERT INTO public.courses (title, description, price, icon_name, color_gradient) VALUES
('Next.js Fullstack Masterclass', 'Build scalable web apps with App Router & Supabase.', '2,990 THB', 'LayoutDashboard', 'from-blue-500 to-cyan-400'),
('Workflow Automation Pro', 'Automate your daily tasks with n8n & Google Apps Script.', '1,990 THB', 'Database', 'from-purple-500 to-pink-500'),
('Advanced Tailwind Architecture', 'Master utility frameworks for enterprise apps.', '1,490 THB', 'Code2', 'from-emerald-400 to-teal-500');
