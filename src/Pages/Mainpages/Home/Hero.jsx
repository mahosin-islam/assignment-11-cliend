import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router'; 
const sliderData = [
  {
    id: 1,
    productLink: "/Allporduct", // Apnar spelling rakha hoyeche
    aboutLink: "/Aboutus",
    title: "Premium Winter Collection",
    subtitle: "Get up to 40% off on all new arrivals this season.",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    productLink: "/Allporduct",
    aboutLink: "/Aboutus",
    title: "Exclusive Denim Wear",
    subtitle: "Discover the perfect fit for your everyday style.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 3,
    productLink: "/Allporduct",
    aboutLink: "/Aboutus",
    title: "Sustainable Fashion",
    subtitle: "Eco-friendly clothing for a better future.",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=1600",
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    }, 7000); 
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === sliderData.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? sliderData.length - 1 : current - 1);

  const textVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1, ease: "easeOut" } 
    },
    exit: { opacity: 0, x: 50, transition: { duration: 1 } }
  };

  return (
    <div className="-mt-18 relative w-full overflow-hidden" style={{ height: '70vh' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${sliderData[current].image})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>

          {/* Content - Added higher z-index to ensure clickability */}
          <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
            
            <motion.h1
              variants={textVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-white text-4xl md:text-7xl font-extrabold mb-4 tracking-tight"
            >
              {sliderData[current].title}
            </motion.h1>
            
            <motion.p
              variants={textVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ delay: 0.3 }}
              className="text-gray-200 text-lg md:text-2xl mb-10 max-w-3xl font-light"
            >
              {sliderData[current].subtitle}
            </motion.p>

            {/* Dynamic Buttons */}
            <motion.div
              variants={textVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-5 justify-center relative z-30"
            >
              <Link 
                to={sliderData[current].productLink} 
                className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-orange-500 hover:text-white transition-all duration-500 shadow-lg cursor-pointer"
              >
                All Products
              </Link>
              <Link 
                to={sliderData[current].aboutLink} 
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-500 shadow-lg cursor-pointer"
              >
                About Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Navigation - Make sure buttons don't block the links */}
      <div className="absolute inset-0 flex items-center justify-between px-4 z-10 pointer-events-none">
        <button 
          onClick={prevSlide} 
          className="p-3 rounded-full bg-black/10 hover:bg-black/40 text-white backdrop-blur-sm transition-all pointer-events-auto"
        >
          <ChevronLeft size={35} />
        </button>
        <button 
          onClick={nextSlide} 
          className="p-3 rounded-full bg-black/10 hover:bg-black/40 text-white backdrop-blur-sm transition-all pointer-events-auto"
        >
          <ChevronRight size={35} />
        </button>
      </div>
    </div>
  );
};

export default Hero;