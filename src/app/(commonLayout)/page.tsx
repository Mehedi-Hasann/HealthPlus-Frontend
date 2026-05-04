"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ExplorePage() {
  return (
    <div
      className="w-full flex items-center justify-center min-h-[calc(100vh-75px)] bg-background"
    >
      <div className="text-center space-y-8 px-6 max-w-2xl mx-auto">

        <h1 className="text-4xl md:text-6xl font-bold text-foreground">
          Welcome to MediStore
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl">
          Find medicines easily and quickly
        </p>

        <Link href="/shop">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
            mt-4 px-10 py-4 text-lg font-semibold rounded-2xl shadow-lg
            bg-primary text-primary-foreground
            hover:opacity-90
            transition duration-300"
          >
            Explore Medicine
          </motion.button>
        </Link>

      </div>
    </div>
  );
}