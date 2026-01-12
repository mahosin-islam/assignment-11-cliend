import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag } from 'lucide-react';

const BuyerShowcase = () => {
  // Mock data for buyers
  const buyers = [
    { id: 1, name: "Alex Rivera", location: "New York", img: "https://i.pravatar.cc/150?u=1", product: "Air Max 270" },
    { id: 2, name: "Sarah Chen", location: "Singapore", img: "https://i.pravatar.cc/150?u=2", product: "Jordan Low" },
    { id: 3, name: "Marcus Vane", location: "London", img: "https://i.pravatar.cc/150?u=3", product: "Yeezy Boost" },
    { id: 4, name: "Elena Rossi", location: "Milan", img: "https://i.pravatar.cc/150?u=4", product: "Classic White" },
    { id: 5, name: "James Wilson", location: "Sydney", img: "https://i.pravatar.cc/150?u=5", product: "VaporMax" },
    { id: 6, name: "Sofia King", location: "Tokyo", img: "https://i.pravatar.cc/150?u=6", product: "Retro High" },
    { id: 7, name: "Alex Rivera", location: "New York", img: "https://i.pravatar.cc/150?u=1", product: "Air Max 270" },
    { id: 8, name: "Sarah Chen", location: "Singapore", img: "https://i.pravatar.cc/150?u=2", product: "Jordan Low" },
    { id: 9, name: "Marcus Vane", location: "London", img: "https://i.pravatar.cc/150?u=3", product: "Yeezy Boost" },
    { id: 10, name: "Elena Rossi", location: "Milan", img: "https://i.pravatar.cc/150?u=4", product: "Classic White" },
    { id: 11, name: "James Wilson", location: "Sydney", img: "https://i.pravatar.cc/150?u=5", product: "VaporMax" },
    { id: 12, name: "Sofia King", location: "Tokyo", img: "https://i.pravatar.cc/150?u=6", product: "Retro High" },
  ];

  return (
    <section className="py-5  overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              JOIN THE <span className="text-orange-600">COMMUNITY.</span>
            </h2>
            <p className="text-slate-500 mt-4 text-lg max-w-md">
              Over 10k+ verified buyers are rocking our latest drops. Real people, real style.
            </p>
          </div>
          <button className="text-sm font-bold uppercase tracking-widest border-b-2 border-orange-600 pb-1 hover:text-orange-600 transition-colors">
            View All Members
          </button>
        </div>

        {/* Animated Buyer Grid */}




<div className="flex py-2  overflow-hidden select-none">
        <motion.div
          className="flex gap-6 pr-6"
          animate={{
            x: ["0%", "-50%"], // Moves from start to half (the duplicated set)
          }}
          transition={{
            ease: "linear",
            duration: 55, // Adjust speed (higher = slower)
            repeat: Infinity,
          }}
          whileHover={{ animationPlayState: "paused" }} // Stops slider on hover
        >
          {buyers.map((buyer, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[280px] group cursor-pointer"
            >
              <div className="relative  p-6 rounded-[30%] bg-white shadow-sm border border-slate-100 transition-all duration-500 group-hover:shadow-xl 
              hober:bg-slate-900
              group-hover:border-orange-200  group-hover:translate-y-2">
                
                {/* Profile Image & Verified Badge */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                      src={buyer.img}
                      alt={buyer.name}
                      className="w-24 h-24 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ring-4 ring-slate-50 group-hover:ring-orange-100"
                    />
                    <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-md">
                      <CheckCircle size={18} className="text-blue-500 fill-blue-50" />
                    </div>
                  </div>

                  {/* Name & Product */}
                  <div className="text-center">
                    <h4 className="font-bold text-slate-900 text-lg">{buyer.name}</h4>
                    <p className="text-xs font-semibold text-orange-600 uppercase tracking-widest mb-3">Verified Buyer</p>
                    
                    <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 group-hover:bg-orange-50 transition-colors">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Purchased</p>
                      <p className="text-sm font-bold text-slate-700">{buyer.product}</p>
                    </div>
                  </div>
                </div>

                {/* Aesthetic Background Decoration */}
                <div className="absolute top-4 right-6 text-slate-100 font-black text-4xl italic group-hover:text-orange-100 transition-colors">
                  "
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>




        {/* Dynamic Statistics Bar */}
      

      </div>
    </section>
  );
};

export default BuyerShowcase;