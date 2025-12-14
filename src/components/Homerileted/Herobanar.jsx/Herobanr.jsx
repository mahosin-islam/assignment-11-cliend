import React from "react";
import {motion}  from "framer-motion";

export default function HeroBanner({
  title = "Premium Garments — Your size, your style",
  description = "Bangladeshi quality clothes, fast delivery. View and order now",
  ctaText = "View product",
  ctaHref = "/Allporduct",
  bgImage = "https://i.ibb.co.com/1tM8nP0Z/Bangladesh-embraces-recycled-fabrics-for-ready-made-garments.jpg",
}) {
  return (
    <header
      className="relative w-full bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0.20)), url(${bgImage})`,
      }}
      role="img"
      aria-label="Hero image showing clothing collection"
    >
      <div className=" max-w-7xl mx-auto p-4 md:px-12 md:py-22">
        <div className="flex items-center">
          <div className="w-full md:w-2/3 lg:w-1/2 
           
          text-white">
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-sm md:text-base font-medium tracking-wide text-amber-200"
            >
             
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, x: -150 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-3 text-2xl md:text-5xl font-extrabold leading-tight"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-4 text-sm md:text-lg text-gray-100 max-w-xl"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-8 flex gap-4"
            >
              <a
                href={ctaHref}
              
                  className="relative group inline-flex items-center justify-center md:px-6 px-2 py-1 md:py-3 rounded-2xl bg-amber-500 text-black font-semibold shadow-md transform hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-amber-300 text-[14px] overflow-hidden"
>
               <span className="absolute left-0 top-0 w-0 h-full bg-white/30 group-hover:w-1/2 transition-all duration-1000 ease-out z-0"></span>
               <span className="absolute right-0 top-0 w-0 h-full bg-white/30 group-hover:w-1/2 transition-all duration-1000 ease-out z-0"></span>
                {ctaText}
              </a>

              <a
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-white/20 text-white border border-white/30 hover:bg-white/30 transition duration-1000"
              >
                Learn more
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative bottom curve (optional) */}
      <div className="-mb-1">
        <svg
          viewBox="0 0 1440 48"
          className="w-full h-12"
          preserveAspectRatio="none"
        >
          <path d="M0 0h1440v48H0z" fill="rgba(255,255,255,0.0)"></path>
        </svg>
      </div>
    </header>
  );
}
