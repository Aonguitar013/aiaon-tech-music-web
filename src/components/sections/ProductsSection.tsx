"use client";

import { motion } from "framer-motion";
import { Download, FileCode2, BookText } from "lucide-react";

export function ProductsSection() {
  return (
    <section className="py-24 px-4 relative z-10 w-full overflow-hidden bg-black/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-prompt text-3xl md:text-5xl font-bold mb-4">Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Vault</span></h2>
            <p className="text-white/50 max-w-xl">Premium templates, code snippets, and comprehensive e-books designed to accelerate your workflow.</p>
          </div>
          <button className="glass-card px-6 py-3 text-sm font-medium hover:bg-white/10 shrink-0">
            Browse All Products
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative glass-card p-8 group overflow-hidden border-purple-500/20"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] group-hover:bg-purple-500/20 transition-colors"></div>
            <FileCode2 className="w-10 h-10 text-purple-400 mb-6" />
            <h3 className="text-2xl font-bold font-prompt text-white mb-2">SaaS Boilerplate Code</h3>
            <p className="text-white/60 mb-8">A complete Next.js / Supabase starting point with auth, billing layer, and core UI components ready to deploy.</p>
            <div className="flex justify-between items-center bg-white/5 rounded-full p-2 pl-6">
              <span className="font-bold text-white">$149.00</span>
              <button className="bg-purple-500 hover:bg-purple-600 text-white rounded-full p-2 px-4 flex items-center gap-2 text-sm transition-colors">
                <Download className="w-4 h-4" /> Get
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative glass-card p-8 group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] group-hover:bg-orange-500/20 transition-colors"></div>
            <BookText className="w-10 h-10 text-orange-400 mb-6" />
            <h3 className="text-2xl font-bold font-prompt text-white mb-2">Freelance OS Notion Template</h3>
            <p className="text-white/60 mb-8">Manage clients, invoices, and project pipelines seamlessly directly within Notion.</p>
            <div className="flex justify-between items-center bg-white/5 rounded-full p-2 pl-6">
              <span className="font-bold text-white">$49.00</span>
              <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 px-4 flex items-center gap-2 text-sm transition-colors">
                <Download className="w-4 h-4" /> Get
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
