"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, Calendar, ExternalLink, Hash } from "lucide-react";
import Image from "next/image";

interface Certificate {
  id: string;
  imageSrc: string;
  title: string;
  issuer: string;
  credentialId: string;
  issueDate: string;
  category: string;
  categoryColor: string;
  verifyUrl?: string;
}

const certificates: Certificate[] = [
  {
    id: "cert-google-ai",
    imageSrc: "/images/cert-google-ai.png",
    title: "Introduction to AI",
    issuer: "Google · Coursera",
    credentialId: "WF5PYDSIAA55",
    issueDate: "Apr 13, 2026",
    category: "AI & Machine Learning",
    categoryColor: "text-blue-400",
    verifyUrl: "https://coursera.org/verify/WF5PYDSIAA55",
  },
  {
    id: "cert-canva-ai",
    imageSrc: "/images/cert-canva-ai.png",
    title: "Certificate of Completion: Work smarter with AI",
    issuer: "Canva Design School",
    credentialId: "e73e41",
    issueDate: "June 13, 2026",
    category: "AI & Design",
    categoryColor: "text-purple-400",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export function CertificatesSection() {
  return (
    <section
      className="py-24 px-4 relative z-10 w-full overflow-hidden"
      id="certificates"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[250px] bg-amber-500/6 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 px-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-sm font-prompt font-medium mb-4"
          >
            <Award className="w-4 h-4" />
            ความสำเร็จและใบเซอร์
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="font-prompt text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white"
          >
            Certificates &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400">
              Achievements
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/60 max-w-xl mx-auto text-base md:text-lg font-prompt font-light leading-relaxed"
          >
            ใบรับรองและความสำเร็จที่ผ่านการเรียนรู้และพัฒนาตนเองอย่างต่อเนื่อง
          </motion.p>
        </div>

        {/* Certificates Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              variants={cardVariants}
              className="group relative rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm overflow-hidden cursor-default
                         transition-all duration-300 ease-out
                         hover:border-white/25 hover:shadow-[0_8px_40px_rgba(168,85,247,0.18)] hover:-translate-y-1"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-purple-500/5 via-transparent to-amber-500/5 pointer-events-none" />

              {/* Certificate Image */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-white/5">
                <Image
                  src={cert.imageSrc}
                  alt={cert.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                {/* Shimmer overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-prompt font-semibold backdrop-blur-md bg-black/50 border border-white/15 ${cert.categoryColor}`}
                  >
                    <BadgeCheck className="w-3 h-3" />
                    {cert.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 relative z-10">
                <h3 className="font-prompt text-base font-semibold text-white leading-snug group-hover:text-purple-200 transition-colors duration-200 line-clamp-2">
                  {cert.title}
                </h3>

                <p className="text-sm font-prompt text-white/55 font-medium">
                  {cert.issuer}
                </p>

                {/* Divider */}
                <div className="border-t border-white/8 pt-3 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-prompt text-white/45">
                    <Calendar className="w-3.5 h-3.5 text-amber-400/70 shrink-0" />
                    <span>Issue Date: </span>
                    <span className="text-white/70 font-medium">{cert.issueDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-prompt text-white/45">
                    <Hash className="w-3.5 h-3.5 text-purple-400/70 shrink-0" />
                    <span>Credential ID: </span>
                    <span className="text-purple-300 font-mono font-semibold tracking-wider">
                      {cert.credentialId}
                    </span>
                  </div>
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-1 text-[11px] font-prompt font-medium text-blue-400/80 hover:text-blue-300 transition-colors duration-200 group/link"
                    >
                      <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-150" />
                      Verify Certificate
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
