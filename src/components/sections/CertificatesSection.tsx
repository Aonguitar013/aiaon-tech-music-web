"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Award, BadgeCheck, Calendar, ExternalLink, Hash, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
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
  {
    id: "cert-workspace-ai",
    imageSrc: "/images/cert-workspace-ai.png",
    title: "AI FOR DIGITAL INNOVATION",
    issuer: "Workspace Thailand",
    credentialId: "CERT202606130001",
    issueDate: "June 13, 2026",
    category: "AI & Innovation",
    categoryColor: "text-cyan-400",
    verifyUrl: "https://www.workspace.in.th",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export function CertificatesSection() {
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);

  // Navigation handlers
  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedCertIndex === null) return;
    setSelectedCertIndex((prev) => 
      prev !== null ? (prev - 1 + certificates.length) % certificates.length : null
    );
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedCertIndex === null) return;
    setSelectedCertIndex((prev) => 
      prev !== null ? (prev + 1) % certificates.length : null
    );
  };

  const handleClose = () => {
    setSelectedCertIndex(null);
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedCertIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent scrolling on main body when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedCertIndex]);

  const activeCert = selectedCertIndex !== null ? certificates[selectedCertIndex] : null;

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
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-purple-400 to-pink-400">
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
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              variants={cardVariants}
              onClick={() => setSelectedCertIndex(index)}
              className="group relative rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm overflow-hidden cursor-pointer
                         transition-all duration-300 ease-out
                         hover:border-white/25 hover:shadow-[0_8px_40px_rgba(168,85,247,0.18)] hover:-translate-y-1"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-purple-500/5 via-transparent to-amber-500/5 pointer-events-none" />

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
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Zoom icon overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="p-3 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 shadow-lg">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </div>

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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md select-none"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-50 p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            {certificates.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer focus:outline-none hidden sm:block"
                  aria-label="Previous certificate"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer focus:outline-none hidden sm:block"
                  aria-label="Next certificate"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Content Wrapper */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl flex flex-col items-center gap-6"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[16/10] max-h-[65vh] rounded-xl overflow-hidden border border-white/15 bg-black/40 flex items-center justify-center">
                <Image
                  src={activeCert.imageSrc}
                  alt={activeCert.title}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              </div>

              {/* Certificate Details */}
              <div className="w-full max-w-3xl text-center px-4 space-y-3">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-prompt font-semibold backdrop-blur-md bg-white/5 border border-white/10 ${activeCert.categoryColor}`}>
                  <BadgeCheck className="w-3.5 h-3.5" />
                  {activeCert.category}
                </span>

                <h3 className="font-prompt text-lg md:text-2xl font-bold text-white tracking-tight leading-snug">
                  {activeCert.title}
                </h3>

                <p className="text-sm md:text-base font-prompt text-white/70">
                  {activeCert.issuer}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 border-t border-white/10 text-xs md:text-sm font-prompt text-white/50">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-400/80 shrink-0" />
                    <span>Issue Date:</span>
                    <span className="text-white/80 font-medium">{activeCert.issueDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Hash className="w-4 h-4 text-purple-400/80 shrink-0" />
                    <span>Credential ID:</span>
                    <span className="text-purple-300 font-mono font-semibold">{activeCert.credentialId}</span>
                  </div>
                  {activeCert.verifyUrl && (
                    <a
                      href={activeCert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Verify Certificate
                    </a>
                  )}
                </div>
              </div>

              {/* Mobile Swipe / Tap Hint or Mobile Nav dots */}
              {certificates.length > 1 && (
                <div className="flex gap-2 justify-center sm:hidden pt-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-lg border border-white/10 bg-white/5 text-white/70"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="self-center font-prompt text-xs text-white/50">
                    {selectedCertIndex !== null ? selectedCertIndex + 1 : 1} / {certificates.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-lg border border-white/10 bg-white/5 text-white/70"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
