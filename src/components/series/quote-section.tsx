"use client";

import { motion } from "framer-motion";
import type { SeriesData } from "@/types";

interface QuoteSectionProps {
  series: SeriesData;
}

export function QuoteSection({ series }: QuoteSectionProps) {
  return (
    <motion.section
      className="py-16 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      aria-label="Iconic quote"
    >
      <blockquote className="mx-auto max-w-3xl">
        <p className="text-2xl font-light italic tracking-tight sm:text-3xl lg:text-4xl">
          &ldquo;{series.iconicQuote}&rdquo;
        </p>
        <footer className="mt-6 text-sm text-muted">
          — {series.title}
        </footer>
      </blockquote>
    </motion.section>
  );
}
