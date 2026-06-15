"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section
      className="relative px-4 py-24 sm:px-6 lg:px-8"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="cta-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Ready for your premiere?
          </h2>
          <p className="mt-4 text-lg text-muted">
            Ten questions. One unforgettable series. Share it with the world.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/create">Create My Series</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
