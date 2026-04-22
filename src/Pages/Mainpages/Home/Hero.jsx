import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import {  NavLink } from 'react-router';

const sliderData = [
  {
    id: 1,
    link: "about",
    title: "Premium Winter Collection",
    subtitle: "Get up to 40% off on all new arrivals this season.",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 2,
    title: "Exclusive Denim Wear",
    subtitle: "Discover the perfect fit for your everyday style.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 3,
    title: "Sustainable Fashion",
    subtitle: "Eco-friendly clothing for a better future.",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=1600",
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Auto-play timing (7 seconds for a relaxed feel)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    }, 7000); 
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === sliderData.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? sliderData.length - 1 : current - 1);

  // Text Animation Variants
  const textVariant = {
    hidden: { opacity: 0, x: -100 }, // Left theke shuru hobe
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1, ease: "easeOut" } 
    },
    exit: { opacity: 0, x: 50, transition: { duration: 1 } } // Right e ber hoye jabe
  };

  return (
    <div className="-mt-18 relative w-full overflow-hidden" style={{ height: '70vh' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }} // Background image transition duration
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image with Slow Zoom */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${sliderData[current].image})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>

          {/* Content Container */}
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
            
            {/* Title - Left to Right */}
            <motion.h1
              variants={textVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-white text-4xl md:text-7xl font-extrabold mb-4 tracking-tight"
            >
              {sliderData[current].title}
            </motion.h1>
            
            {/* Subtitle - Left to Right with Delay */}
            <motion.p
              variants={textVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ delay: 0.3 }} // Title er aktu pore ashbe
              className="text-gray-200 text-lg md:text-2xl mb-10 max-w-3xl font-light"
            >
              {sliderData[current].subtitle}
            </motion.p>

            {/* Buttons - Left to Right with More Delay */}
            <motion.div
              variants={textVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-5 justify-center"
            >
              <NavLink to={'/Allporduct'} className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-orange-500 hover:text-white transition-all duration-500 shadow-lg">
                All Products
              </NavLink>
              <NavLink to={'/Aboutus'} className="border-2 border-white text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-500 shadow-lg">
                About Us
              </NavLink>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Navigation */}
      <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
        <button onClick={prevSlide} className="p-3 rounded-full bg-black/10 hover:bg-black/40 text-white backdrop-blur-sm transition-all">
          <ChevronLeft size={35} />
        </button>
        <button onClick={nextSlide} className="p-3 rounded-full bg-black/10 hover:bg-black/40 text-white backdrop-blur-sm transition-all">
          <ChevronRight size={35} />
        </button>
      </div>
    </div>
  );
};

export default Hero;