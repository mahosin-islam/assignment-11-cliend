import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingBag, Users, Heart } from "lucide-react"; // আইকন ব্যবহারের জন্য লিব্রারি

const StatCard = ({ icon, value, label, suffix = "+", index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // ২ সেকেন্ড এনিমেশন
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }} // একটার পর একটা আসার জন্য ডিলে
      whileHover={{ y: -10 }} // মাউস নিলে উপরে উঠবে
      className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="w-16 h-16 bg-[#fdf2f0] text-[#e0877d] rounded-full flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>
      <h3 className="text-5xl font-extrabold text-gray-800 tracking-tight">
        {count}
        <span className="text-[#e0877d]">{suffix}</span>
      </h3>
      <p className="text-gray-500 font-medium mt-2 uppercase tracking-wider text-sm">
        {label}
      </p>
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    {
      icon: <ShoppingBag size={32} />,
      value: 2200,
      label: "Orders Completed",
      suffix: "+"
    },
    {
      icon: <Users size={32} />,
      value: 1500,
      label: "Trusted Suppliers",
      suffix: "+"
    },
    {
      icon: <Heart size={32} />,
      value: 97,
      label: "Customer Satisfaction",
      suffix: "%"
    }
  ];

  return (
    <section className="py-24 bg-base-100 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#e0877d] font-bold tracking-widest uppercase text-sm">
            Our Impact
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-6">
            Numbers Speak Louder
          </h2>
          <div className="w-20 h-1.5 bg-[#e0877d] mx-auto mb-8 rounded-full"></div>
          <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
            Numbers that reflect our commitment, trust, and 
            relentless focus on customer satisfaction.
          </p>
        </motion.div>

        {/* কার্ডের গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              index={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;