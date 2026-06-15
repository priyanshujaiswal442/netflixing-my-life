"use client";

import { motion } from "framer-motion";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  id?: string;
}

export function Section({ title, children, id }: SectionProps) {
  return (
    <motion.section
      id={id}
      className="py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-6 text-xl font-semibold tracking-tight sm:text-2xl">
        {title}
      </h2>
      {children}
    </motion.section>
  );
}
