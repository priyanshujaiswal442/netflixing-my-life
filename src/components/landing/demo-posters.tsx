"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { DEMO_POSTERS } from "@/lib/constants";

export function DemoPosters() {
  return (
    <section
      className="relative px-4 py-24 sm:px-6 lg:px-8"
      aria-labelledby="demo-posters-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="demo-posters-heading"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Stories worth watching
          </h2>
          <p className="mt-3 text-muted">
            Every life is a series waiting to be told
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DEMO_POSTERS.map((poster, index) => (
            <motion.article
              key={poster.title}
              className="group relative aspect-[2/3] overflow-hidden rounded-lg poster-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={poster.image}
                alt={`${poster.title} poster`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

              <div className="absolute top-4 left-4">
                <span className="rounded bg-primary px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                  Netflix Original
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-300">
                  <span className="flex items-center gap-1 font-semibold text-amber-400">
                    <Star className="h-3 w-3 fill-amber-400" aria-hidden="true" />
                    {poster.rating}
                  </span>
                  <span>{poster.year}</span>
                  <span>{poster.seasons}</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white">
                  {poster.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-300">{poster.genre}</p>
                <p className="mt-2 text-sm italic text-zinc-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  &ldquo;{poster.tagline}&rdquo;
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
