import React from 'react';
import { motion } from 'framer-motion';

const HomeFeatureSection = () => {
  // Animation variants for the text staggered effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full min-h-[600px] flex items-center bg-slate-50 overflow-hidden py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Animated Text */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.span variants={itemVariants} className="text-orange-600 font-bold tracking-widest uppercase text-sm">
            New Arrival 2026
          </motion.span>
          
          <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-black text-slate-900 leading-tight">
            STEP INTO <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">THE FUTURE.</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-slate-600 text-lg max-w-md leading-relaxed">
            Engineered with Hyper-Breathable mesh and our patented Cloud-Stride sole. 
            The perfect balance between athletic performance and street-ready aesthetics.
          </motion.p>
          
          <motion.div variants={itemVariants} className="pt-4">
            <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-orange-600 transition-colors duration-300 shadow-xl hover:shadow-orange-200">
              Explore Collection
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side: Professional Image Layout */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative flex justify-center items-center"
        >
          {/* Decorative Background Element */}
          <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-orange-100 rounded-full filter blur-3xl opacity-70 animate-pulse" />
          
          <div className="relative z-10 w-full h-[400px] md:h-[500px] group">
            <img 
              src="https://plus.unsplash.com/premium_photo-1673644093928-1511bf77edda?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your shoe PNG
              alt="Premium Sneaker"
              className="w-full h-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] group-hover:scale-110 transition-transform duration-500 cursor-pointer"
            />
            
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-0 bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 hidden md:block"
            >
              <p className="text-xs font-bold text-slate-400">Weight</p>
              <p className="text-xl font-black text-slate-900">240g</p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HomeFeatureSection;


