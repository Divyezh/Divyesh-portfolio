"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import { cn } from "@/lib/utils";
import ProjectCard from "./project-card";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

const FeaturedCarousel = ({
  projects,
  className,
  showPagination = true,
  showNavigation = true,
  loop = true,
  autoplay = true,
  spaceBetween = 30,
}: {
  projects: Project[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}) => {
  const css = `
  .Carousal_003 {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 50px !important;
  }
  
  .Carousal_003 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 380px;
    height: auto;
    display: flex;
    align-items: stretch;
  }

  .Carousal_003 .swiper-slide > div {
    width: 100%;
  }

  .swiper-pagination-bullet {
    background-color: #fff !important;
    opacity: 0.5;
  }
  .swiper-pagination-bullet-active {
    background-color: #8b5cf6 !important;
    opacity: 1;
  }
`;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-[480px] flex items-center justify-center text-white/50">Loading projects...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        delay: 0.2,
      }}
      className={cn("relative w-full max-w-6xl mx-auto px-2 md:px-5", className)}
    >
      <style>{css}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: 3000,
                  disableOnInteraction: false,
                }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={loop}
          coverflowEffect={{
            rotate: 25,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : false
          }
          className="Carousal_003"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <ProjectCard {...project} />
            </SwiperSlide>
          ))}
          {showNavigation && (
            <div>
              <div className="swiper-button-next after:hidden !right-0 md:!-right-5">
                <ChevronRightIcon className="h-8 w-8 text-white hover:text-purple-mid transition-colors drop-shadow-md" />
              </div>
              <div className="swiper-button-prev after:hidden !left-0 md:!-left-5">
                <ChevronLeftIcon className="h-8 w-8 text-white hover:text-purple-mid transition-colors drop-shadow-md" />
              </div>
            </div>
          )}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export default FeaturedCarousel;
