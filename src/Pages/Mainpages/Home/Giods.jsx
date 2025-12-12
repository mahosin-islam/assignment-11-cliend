// HowItWorks.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaSearch, FaShoppingCart, FaTruck } from "react-icons/fa";
import { Link } from "react-router";

const steps = [
  {
    id: 1,
    linK:'/Allporducts',
    icon: <FaSearch size={40} />,
    title: "Browse Products",
    desc: "Explore our wide collection of stylish garments for every occasion.",
  },
  {
    id: 2,
    icon: <FaShoppingCart size={40} />,
    title: "Place Order",
    desc: "Add your chosen items to the cart and checkout effortlessly.",
  },
  {
    id: 3,
    icon: <FaTruck size={40} />,
    title: "Receive Product",
    desc: "Get your order delivered safely and quickly to your doorstep.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Giods = () => {
  return (
    <section className="py-5 px-6 bg-l">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-3">How It Works</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Follow these simple steps to browse, order, and receive your favorite
          garments quickly and effortlessly.
        </p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {steps.map((step) => (
         <Link to={step.linK} key={step.id}>
          <motion.div
            key={step.id}
            variants={stepVariants}
            className="relative rounded-xl group  md:px-6 px-2 py-1
            flex flex-col items-center 
            md:py-3 rounded-2x  font-semibold shadow-md  focus:outline-none focus:ring-4 focus:ring-amber-300 text-[14px]  cursor-pointer"
            
          >
            <span className=" rounded-xl absolute left-0 top-0 w-0 h-full bg-pink-400 opacity-30 group-hover:w-1/1 transition-all duration-500 ease-out z-0"></span>
          
            <motion.div
            //   whileHover={{ scale: 1.2, rotate: 5 }}
              className="mb-4 text-blue-500"
            >
              {step.icon}
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </motion.div>
         
         </Link>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.7 }}
        className="text-center mt-12"
      >
        <a   href="/contact" 
         className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition">
          Start Shopping
        </a>
      </motion.div>
    </section>
  );
};

export default Giods;









// relative p-6 rounded-xl shadow-md flex flex-col items-center text-center hover:scale-105 transition-all duration-2000 cursor-pointer group


// relative group inline-flex items-center justify-center p-6  rounded-2xl bg-amber-500   shadow-md transform hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-amber-300  overflow-hidden