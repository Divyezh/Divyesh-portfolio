"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ImageItem {
  src: string;
  alt: string;
}

interface PhoneCarouselProps {
  images: ImageItem[];
  autoPlayDuration?: number;
}

export function PhoneCarousel({
  images,
  autoPlayDuration = 4000,
}: PhoneCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayDuration);
    return () => clearInterval(interval);
  }, [images, autoPlayDuration]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative flex flex-col items-center justify-center p-4 md:p-8">
      {/* PHONE DEVICE MOCKUP FRAME */}
      <div className="relative w-[280px] h-[580px] md:w-[320px] md:h-[650px] bg-black rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(139,92,246,0.3)] border-4 border-gray-800 flex flex-col items-center">
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-5 z-30 w-28 h-5 bg-black rounded-full flex items-center justify-center border border-white/10">
          <div className="w-3 h-3 bg-gray-900 rounded-full border border-gray-700 mr-2" />
          <div className="w-2 h-2 bg-blue-900/60 rounded-full" />
        </div>

        {/* Outer Phone Bezel & Screen Window */}
        <div className="relative w-full h-full bg-slate-950 rounded-[38px] overflow-hidden border border-white/10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to Unsplash app screenshot if external image fails
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&h=1200&fit=crop";
              }}
            />
          </AnimatePresence>

          {/* Screen Inner Glass Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20" />
        </div>

        {/* Side Buttons Visual Details */}
        <div className="absolute -left-[7px] top-24 w-[3px] h-8 bg-gray-700 rounded-l-md" />
        <div className="absolute -left-[7px] top-36 w-[3px] h-12 bg-gray-700 rounded-l-md" />
        <div className="absolute -left-[7px] top-52 w-[3px] h-12 bg-gray-700 rounded-l-md" />
        <div className="absolute -right-[7px] top-36 w-[3px] h-16 bg-gray-700 rounded-r-md" />
      </div>

      {/* CAROUSEL CONTROLS & PAGINATION */}
      <div className="flex items-center gap-4 mt-6 z-10">
        <Button
          onClick={handlePrev}
          variant="outline"
          size="icon"
          className="rounded-full bg-white/5 border-white/10 hover:bg-white/20 text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {/* Indicators */}
        <div className="flex items-center gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentIndex
                  ? "bg-purple-500 w-6"
                  : "bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          variant="outline"
          size="icon"
          className="rounded-full bg-white/5 border-white/10 hover:bg-white/20 text-white"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
