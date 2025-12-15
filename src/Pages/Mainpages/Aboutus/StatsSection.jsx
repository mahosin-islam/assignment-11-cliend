import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const StatCard = ({ icon, value, label, suffix = "+" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500; // animation time
    const increment = value / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className=""
    >
      <div className=" text-4xl mb-3 flex justify-center">
        {icon}
      </div>
      <h3 className="text-5xl font-bold text-[#e0877d]">
        {count}
        {suffix}
      </h3>
      <p className="text-gray-600 mt-1">{label}</p>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className=" py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Our Achievements
        </motion.h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Numbers that reflect oru commitment, trusts, and customer satisfaction.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 rounded-2xl p-15 md:border-2 md:border-gray-400">
          <StatCard
        
            value={2200}
            label="Orders Completed"
          />
          <StatCard
            
            value={1500}
            label="Trusted Suppliers"
          />
          <StatCard
        
            value={97}
            suffix="%"
            label="Customer Satisfaction"
          />
        </div>

      </div>
    </section>
  );
};

export default StatsSection;
