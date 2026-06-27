"use client";

import React, { useState, useEffect } from "react";
import { Award, Calendar, ExternalLink, ShieldCheck, ZoomIn, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Dialog } from "./ui/dialog";
import { Button } from "./ui/button";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  imageUrl: string;
}

export default function Certifications() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  useEffect(() => {
    async function loadCertificates() {
      try {
        const res = await fetch("/api/certificates");
        if (res.ok) {
          const json = await res.json();
          setUploaded(json.uploaded || false);
          setCerts(json.certificates || []);
        } else {
          setUploaded(false);
          setCerts([]);
        }
      } catch (err) {
        console.error("Error loading certificates:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCertificates();
  }, []);

  return (
    <section
      id="certificates"
      className="py-20 bg-muted/30 dark:bg-muted/10 border-y border-border/50 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16 space-y-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Academic Achievements
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Certifications & Achievements
          </h2>
          <div className="h-1 w-12 bg-foreground rounded" />
        </div>

        {/* Display loading state */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="h-6 w-6 rounded-full border-2 border-t-transparent border-foreground animate-spin" />
          </div>
        ) : !uploaded || certs.length === 0 ? (
          /* Placeholder display when no files are uploaded */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <Card className="border border-dashed border-border bg-background/50 shadow-sm text-center">
              <CardContent className="p-10 flex flex-col items-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                  <Award className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-foreground text-base">Achievements Pending</h3>
                  <p className="text-sm text-muted-foreground">
                    Certificates will appear here after upload.
                  </p>
                </div>
                <div className="text-[10px] text-muted-foreground flex items-center gap-1 bg-secondary/50 px-2.5 py-1 rounded-full border border-border/50">
                  <Info className="h-3 w-3 shrink-0" />
                  <span>Place your image credentials in /public/images/certificates</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* Display certificates once uploaded */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certs.map((cert) => (
              <motion.div
                key={cert.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="cursor-pointer group h-full"
                onClick={() => setSelectedCert(cert)}
              >
                <Card className="h-full border border-border bg-background shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
                  <CardContent className="p-6 flex flex-col justify-between h-full space-y-6">
                    {/* Top Branding Row */}
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-sm font-extrabold tracking-tight text-foreground">
                          {cert.issuer}
                        </span>
                        <span className="text-[8px] uppercase tracking-widest text-muted-foreground font-bold">
                          Verified Credential
                        </span>
                      </div>
                      <div className="p-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Image Thumbnail Frame */}
                    <div className="aspect-[4/3] rounded-lg overflow-hidden border border-border bg-secondary/20 relative group-hover:border-foreground/20 transition-all duration-300">
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <span className="text-xs font-semibold text-white bg-black/60 px-3 py-1.5 rounded-full flex items-center gap-1">
                          Preview <ZoomIn className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Bottom Details Row */}
                    <div className="space-y-3 pt-3 border-t border-border/50">
                      <h3 className="text-sm font-bold text-foreground line-clamp-1">
                        {cert.title}
                      </h3>
                      <div className="flex items-center text-xs text-muted-foreground gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{cert.issueDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Preview Dialog */}
      <Dialog isOpen={!!selectedCert} onClose={() => setSelectedCert(null)}>
        {selectedCert && (
          <div className="flex flex-col space-y-4 p-4">
            {/* Header Details */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-3">
              <div>
                <h3 className="text-base md:text-lg font-bold text-foreground">{selectedCert.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Issued by {selectedCert.issuer} • {selectedCert.issueDate}
                </p>
              </div>
            </div>

            {/* Full Image Presentation */}
            <div className="border border-border/80 rounded-xl overflow-hidden bg-zinc-950 flex items-center justify-center p-1 md:p-2 max-h-[70vh]">
              <img
                src={selectedCert.imageUrl}
                alt={selectedCert.title}
                className="max-h-[65vh] w-auto object-contain mx-auto rounded"
              />
            </div>

            {/* Instruction Footer */}
            <div className="text-[10px] text-muted-foreground text-center">
              Click the 'X' button or press Esc to close this preview.
            </div>
          </div>
        )}
      </Dialog>
    </section>
  );
}
