"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4 pt-16"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(229,9,20,0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(229,9,20,0.05)_0%,_transparent_40%)]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Netflix Original
          </p>
          <h1
            id="hero-heading"
            className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Your Life.{" "}
            <span className="text-primary">Reimagined</span> as a Netflix
            Original.
          </h1>
        </motion.div>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Turn your experiences, dreams, struggles, and achievements into a
          cinematic Netflix-style series.
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Button asChild size="lg" className="text-base font-semibold">
            <Link href="/create">Create My Series</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
