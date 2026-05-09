import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Award } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <Truck size={32} className="text-secondary" />,
      title: "Fast Delivery",
      description: "We ensure lightning-fast delivery to your doorstep within 3-5 business days."
    },
    {
      id: 2,
      icon: <ShieldCheck size={32} className="text-secondary" />,
      title: "Secure Payment",
      description: "100% secure payment processing with top-tier encryption technology."
    },
    {
      id: 3,
      icon: <RotateCcw size={32} className="text-secondary" />,
      title: "Easy Return",
      description: "Not satisfied? No worries! Return any product within 7 days hassle-free."
    },
    {
      id: 4,
      icon: <Award size={32} className="text-secondary" />,
      title: "Premium Quality",
      description: "Our garments are made with 100% organic cotton and premium fabric."
    }
  ];

  return (
    <section className="bg-base-100 py-16 px-4">
      <div className="container mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="my-header text-3xl md:text-5xl uppercase mb-4 text-base-content">
            Why Choose Us
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-base-content/70 max-w-lg mx-auto">
            We provide the best quality garments with exceptional service to build a lasting relationship with our customers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-base-200 border border-base-300 p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
            >
              <div className="bg-base-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="my-header text-xl mb-3 text-base-content">
                {feature.title}
              </h3>
              <p className="text-sm text-base-content/60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;