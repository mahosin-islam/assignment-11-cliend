import React, { useState, useEffect } from 'react';
import { ShoppingCart, Flame } from 'lucide-react';
import { HelpCircle } from 'lucide-react';
const FlashSaleBanner = () => {

//FCQ 

const faqData = [
    {
      question: "What is your delivery timeframe?",
      answer: "We usually deliver within 3-5 business days within the city. For remote areas, it might take up to 7 days."
    },
    {
      question: "How do I choose the right size?",
      answer: "Every product page has a detailed 'Size Guide'. We recommend measuring your chest and length to match our premium fit guide."
    },
    {
      question: "Do you have a return policy?",
      answer: "Yes! If you're not satisfied with the quality or fit, you can return or exchange the product within 7 days of delivery, provided the tags are intact."
    },
    {
      question: "Are your fabrics 100% cotton?",
      answer: "Most of our premium collection is made from 100% organic combed cotton (180+ GSM) to ensure maximum comfort and durability."
    },
    {
      question: "Is cash on delivery available?",
      answer: "Absolutely! We offer Cash on Delivery (COD) all over the country for your convenience and trust."
    }
  ];

  // Countdown Logic
  const targetDate = new Date("2026-05-20T23:59:59").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        // ২. ক্যালকুলেশন লজিক
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // অফার শেষ হয়ে গেলে টাইমার বন্ধ হবে
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="container mx-auto px-4 py-10 bg-base-100">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary/90 to-secondary text-primary-content p-8 md:p-16 shadow-lg ">
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Side: Content */}
          <div className="text-center lg:text-left flex-1">
            <div className="inline-flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full mb-6 animate-bounce">
              <Flame size={20} className="text-orange-400" />
              <span className="text-sm font-bold tracking-widest uppercase">Hot Sale is Live</span>
            </div>
            
            <h2 className="my-header text-4xl md:text-7xl mb-4 leading-tight">
              SUMMER SALE <br /> 
              <span className="text-secondary-content italic font-black">40% OFF</span>
            </h2>
            
            <p className="text-lg opacity-90 mb-8 max-w-md mx-auto lg:mx-0">
              Upgrade your wardrobe with our premium cotton collection. Limited time offer!
            </p>

            {/* CTA Button */}
            <button className="btn btn-lg bg-base-100 text-base-content border-none hover:bg-secondary hover:text-white transition-all duration-300 gap-3 group px-10 rounded-full shadow-xl">
              <ShoppingCart size={20} />
              SHOP NOW
              <span className="group-hover:translate-x-2 transition-transform">👉</span>
            </button>
          </div>

          {/* Right Side: Countdown Timer */}
          <div className="flex-shrink-0">
            <div className="bg-black/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
              <p className="text-center mb-4 font-bold uppercase tracking-widest text-sm">Hurry up! Ends in:</p>
              
              <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                <div className="flex flex-col p-3 bg-neutral text-neutral-content rounded-box min-w-[70px]">
                  <span className="countdown font-mono text-4xl">{timeLeft.days}</span>
                  days
                </div> 
                <div className="flex flex-col p-3 bg-neutral text-neutral-content rounded-box min-w-[70px]">
                  <span className="countdown font-mono text-4xl">{timeLeft.hours}</span>
                  hours
                </div> 
                <div className="flex flex-col p-3 bg-neutral text-neutral-content rounded-box min-w-[70px]">
                  <span className="countdown font-mono text-4xl">{timeLeft.minutes}</span>
                  min
                </div> 
                <div className="flex flex-col p-3 bg-neutral text-neutral-content rounded-box min-w-[70px]">
                  <span className="countdown font-mono text-4xl">{timeLeft.seconds}</span>
                  sec
                </div>
              </div>

              <div className="mt-6 text-center">
                <span className="badge badge-secondary p-4 font-bold animate-pulse">
                  Only 12 Items Left in Stock!
                </span>
              </div>
            </div>
          </div>

        </div> 

      </div>
      {/* FAQ */}
               <div className="">
                         <section className="py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <HelpCircle className="text-primary" size={32} />
            </div>
          </div>
          <h2 className="my-header text-3xl md:text-5xl uppercase mb-4 text-base-content">
            Common Questions
          </h2>
          <p className="text-base-content/60 italic">Everything you need to know about our service</p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="collapse collapse-plus bg-base-100 border border-base-300 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <input type="radio" name="my-accordion-3" defaultChecked={index === 0} /> 
              
              <div className="collapse-title text-lg md:text-xl font-bold text-base-content flex items-center gap-3">
                <span className="text-secondary opacity-50">0{index + 1}.</span>
                {item.question}
              </div>

              <div className="collapse-content"> 
                <div className="h-[1px] bg-base-300 mb-4"></div>
                <p className="text-base-content/70 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Support Call */}
        <div className="mt-12 text-center">
          <p className="text-base-content/60">
            Still have questions? 
            <button className="ml-2 text-primary font-bold hover:underline">
              Contact our 24/7 support
            </button>
          </p>
        </div>

      </div>
    </section>
               </div>
    </section>
  );
};

export default FlashSaleBanner;