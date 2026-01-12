import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    title: "Premium Garments — Your size, your style",
    description: "Bangladeshi quality clothes, fast delivery. View and order now",
    image:
      "https://i.ibb.co.com/1tM8nP0Z/Bangladesh-embraces-recycled-fabrics-for-ready-made-garments.jpg",
  },
  {
    title: "Export Quality Fashion Wear",
    description: "Modern design with international quality standard",
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38",
  },
  {
    title: "Trendy & Comfortable Clothing",
    description: "Perfect for daily use and special occasions",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  },
];

export default function HeroSwiper() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      pagination={{ clickable: true }}
      navigation={true}
      className="w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <header
            className="relative w-full bg-cover bg-center"
            style={{
              backgroundImage: ` linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0.20)), url(${slide.image})`,
            }}
          >
            <div className="max-w-7xl mx-auto p-4 md:px-12 md:py-32 min-h-[70vh] flex items-center">
              <div className="w-full md:w-2/3 lg:w-1/2 text-white">
                <motion.h1
                  initial={{ opacity: 0, x: -120 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2 }}
                  className="text-2xl md:text-5xl font-extrabold leading-tight"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="mt-4 text-sm md:text-lg text-gray-100 max-w-xl"
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="mt-8 flex gap-4"
                >
                  <a
                    href="/Allporduct"
                    className="relative group inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-amber-500 text-black font-semibold shadow-md hover:scale-105 transition-transform overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></span>
                    <span className="relative z-10">View Product</span>
                  </a>

                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-white/20 text-white border border-white/30 hover:bg-white/30 transition"
                  >
                    Learn More
                  </a>
                </motion.div>
              </div>
            </div>
          </header>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
