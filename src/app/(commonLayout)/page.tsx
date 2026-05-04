"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2079&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1974&auto=format&fit=crop"
];

export default function ExplorePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center min-h-[calc(100vh-75px)] bg-background px-6 lg:px-16 py-10 gap-12 lg:gap-20 overflow-hidden">
      
      {/* Left Content */}
      <div className="text-left space-y-6 max-w-xl z-10 w-full md:w-1/2 pt-8 md:pt-0">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-tight">
          Welcome to <span className="text-teal-600 dark:text-teal-400">MediStore</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-lg">
          Your trusted digital pharmacy. Find medicines easily, manage prescriptions, and get healthcare essentials delivered to your door.
        </p>
        <div className="pt-4">
          <Link href="/shop" className="inline-block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl bg-teal-600 text-white hover:bg-teal-700 hover:shadow-teal-600/30 transition-all duration-300"
            >
              Explore Medicines
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Right Slider Content */}
      <div className="relative w-full md:w-1/2 h-[400px] lg:h-[550px] rounded-[2rem] overflow-hidden shadow-2xl border border-border/50 group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Healthcare Slide ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

        {/* Slider Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50"
        >
          <ChevronRight className="w-7 h-7" />
        </button>

        {/* Slider Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === i ? "bg-white w-8" : "bg-white/50 hover:bg-white/80 w-2.5"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}