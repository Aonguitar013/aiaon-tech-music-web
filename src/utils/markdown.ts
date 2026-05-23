/**
 * Lightweight, dependency-free Markdown-to-HTML parser designed for the Web Book Reader.
 * It renders standard markdown elements into beautifully styled HTML using Tailwind CSS.
 */
export function parseMarkdown(md: string): string {
  if (!md) return "";

  let html = md;

  // 1. Escape HTML to prevent XSS
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 2. Fenced Code Blocks (```javascript ... ```)
  // We restore html tags inside code blocks afterwards, so escape them back for code rendering
  html = html.replace(/```(\w*)\n([\s\S]*?)\n```/gm, (match, lang, code) => {
    const cleanCode = code
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
    return `<div class="group relative my-6">
      <div class="flex items-center justify-between px-4 py-1.5 bg-black/60 border-t border-x border-white/10 rounded-t-xl text-[11px] font-mono text-white/50">
        <span>${lang || "code"}</span>
        <button
          onclick="navigator.clipboard.writeText(this.nextElementSibling.innerText); this.innerText='คัดลอกแล้ว!'; setTimeout(() => this.innerText='คัดลอก', 2000);"
          class="hover:text-white transition-colors cursor-pointer bg-white/5 px-2 py-0.5 rounded border border-white/5 hover:border-white/10"
        >คัดลอก</button>
        <span class="hidden">${cleanCode}</span>
      </div>
      <pre class="bg-black/40 border-b border-x border-white/10 rounded-b-xl p-4 font-mono text-sm overflow-x-auto text-emerald-400"><code class="language-${lang}">${cleanCode}</code></pre>
    </div>`;
  });

  // 3. Inline Code (`code`)
  html = html.replace(/`([^`]+)`/g, (match, code) => {
    const cleanCode = code.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    return `<code class="bg-white/10 text-pink-400 px-1.5 py-0.5 rounded font-mono text-sm">${cleanCode}</code>`;
  });

  // 4. Headings (# Header, ## Header, ### Header)
  // Generate anchor links from heading text for Table of Contents smooth scrolling
  html = html.replace(/^# (.*?)$/gm, (match, title) => {
    const id = title.trim().toLowerCase().replace(/[^a-z0-9ก-๙]+/g, "-");
    return `<h1 id="${id}" class="text-3xl md:text-4xl font-bold font-prompt text-white mt-12 mb-6 border-b border-white/10 pb-3 scroll-mt-24">${title}</h1>`;
  });

  html = html.replace(/^## (.*?)$/gm, (match, title) => {
    const id = title.trim().toLowerCase().replace(/[^a-z0-9ก-๙]+/g, "-");
    return `<h2 id="${id}" class="text-2xl md:text-3xl font-bold font-prompt text-white mt-10 mb-4 pb-1 scroll-mt-24 border-l-4 border-cyan-500/50 pl-3">${title}</h2>`;
  });

  html = html.replace(/^### (.*?)$/gm, (match, title) => {
    const id = title.trim().toLowerCase().replace(/[^a-z0-9ก-๙]+/g, "-");
    return `<h3 id="${id}" class="text-xl md:text-2xl font-bold font-prompt text-white mt-8 mb-3 scroll-mt-24">${title}</h3>`;
  });

  // 5. Bold (**text**) and Italic (*text*)
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em class="italic text-white/90">$1</em>');

  // 6. Blockquotes (> text)
  html = html.replace(/^&gt;\s?(.*?)$/gm, '<blockquote class="border-l-4 border-emerald-500 bg-white/5 px-5 py-3 my-6 italic text-white/80 rounded-r-xl">$1</blockquote>');

  // 7. Bullet Lists (- item or * item)
  html = html.replace(/^[-*]\s(.*?)$/gm, '<li class="flex items-start gap-2.5 my-2 font-prompt text-white/70 leading-relaxed"><span class="text-emerald-400 mt-1.5 text-xs shrink-0">●</span><span>$1</span></li>');

  // 8. Links ([text](url))
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors font-medium">$1</a>');

  // 9. Process Paragraphs (double newlines to <p>)
  const sections = html.split(/\n\n+/);
  html = sections.map((sec) => {
    const trimmed = sec.trim();
    if (!trimmed) return "";
    
    if (
      trimmed.startsWith("<h") ||
      trimmed.startsWith("<div") ||
      trimmed.startsWith("<pre") ||
      trimmed.startsWith("<li") ||
      trimmed.startsWith("<blockquote")
    ) {
      return trimmed;
    }
    
    return `<p class="my-4 md:my-5 text-white/70 leading-relaxed font-prompt text-base md:text-lg">${trimmed.replace(/\n/g, "<br/>")}</p>`;
  }).join("\n");

  return html;
}

/**
 * Extracts h1 and h2 headings from markdown to build Table of Contents.
 */
export function extractHeadings(md: string) {
  if (!md) return [];
  const lines = md.split("\n");
  return lines
    .filter((line) => line.startsWith("# ") || line.startsWith("## "))
    .map((line) => {
      const isH1 = line.startsWith("# ");
      const title = line.replace(/^##?\s+/, "").trim();
      const id = title.toLowerCase().replace(/[^a-z0-9ก-๙]+/g, "-");
      return { title, isH1, id };
    });
}
