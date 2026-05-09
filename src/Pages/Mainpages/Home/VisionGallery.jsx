import React, { useState } from 'react';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  viewport: { once: true },
});

const imgs = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop&crop=center",
    alt: "Fashion fabric texture",
    gridArea: "a",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?q=80&w=900&auto=format&fit=crop&crop=top",
    alt: "Color palette swatches",
    gridArea: "b",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=900&auto=format&fit=crop&crop=center",
    alt: "Fabric store designer",
    gridArea: "c",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop&crop=top",
    alt: "Designer at work",
    gridArea: "d",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop&crop=center",
    alt: "Fashion collection rack",
    gridArea: "e",
  },
];

const Pic = ({ item, index, children, className = "" }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      {...fadeUp(index * 0.08)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`relative overflow-hidden rounded-3xl cursor-pointer ${className}`}
      style={{
        gridArea: item?.gridArea,
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hov
          ? '0 28px 64px color-mix(in srgb,var(--color-base-content) 18%,transparent)'
          : '0 2px 16px color-mix(in srgb,var(--color-base-content) 6%,transparent)',
        transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease',
      }}
    >
      {item?.src && (
        <img
          src={item.src}
          alt={item.alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: hov ? 'scale(1.08)' : 'scale(1)',
            filter: hov ? 'saturate(1.12) brightness(1.04)' : 'saturate(0.85) brightness(0.97)',
            transition: 'transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease',
          }}
        />
      )}
      {/* bottom gradient on hover */}
      {item?.src && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, color-mix(in srgb,var(--color-base-100) 75%,transparent) 0%, transparent 55%)',
            opacity: hov ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />
      )}
      {/* label on hover */}
      {item?.alt && (
        <div
          className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none"
          style={{
            transform: hov ? 'translateY(0)' : 'translateY(10px)',
            opacity: hov ? 1 : 0,
            transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <span className="text-[9px] tracking-[0.28em] uppercase text-secondary border border-secondary/40 bg-secondary/10 backdrop-blur-sm px-3 py-1 rounded-full">
            {item.alt}
          </span>
        </div>
      )}
      {children}
    </motion.div>
  );
};

const  VisionGallery = () => {
  return (
    <div> 
              <h2 className="text-3xl font-bold text-center "> Our Vision</h2>
        <section className="bg-base-100 text-base-content py-10 px-5 md:px-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* ── BENTO GRID ── */}
        <div
          className="hidden md:grid gap-4"
          style={{
            gridTemplateColumns: '1.2fr 0.9fr 0.9fr',
            gridTemplateRows: '320px 260px',
            gridTemplateAreas: `
              "a b c"
              "d d e"
            `,
          }}
        >
          {/* Vision card — grid area A */}
          <Pic item={imgs[0]} index={0}>
            {/* glass text overlay always visible */}
            <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/55 to-transparent">
              <span className="block text-[9px] tracking-[0.35em] uppercase text-white/60 mb-1">Our Story</span>
              <h3 className="font-serif text-2xl font-bold text-white leading-tight">
                Crafted<br />with Care
              </h3>
            </div>
          </Pic>

          <Pic item={imgs[1]} index={1} />
          <Pic item={imgs[2]} index={2} />
          <Pic item={imgs[3]} index={3} />
          <Pic item={imgs[4]} index={4} />
        </div>

        {/* Mobile grid — simple 2 col */}
        <div className="grid md:hidden grid-cols-2 gap-3">
          {/* Vision card full width */}
          <Pic item={imgs[0]} index={0} className="col-span-2 h-64">
            <div className="absolute top-0 left-0 right-0 p-5 bg-gradient-to-b from-black/55 to-transparent">
              <span className="block text-[9px] tracking-[0.35em] uppercase text-white/60 mb-1">Our Story</span>
              <h3 className="font-serif text-xl font-bold text-white">Crafted with Care</h3>
            </div>
          </Pic>
          {imgs.slice(1).map((item, i) => (
            <Pic key={item.id} item={item} index={i + 1} className="h-48" />
          ))}
        </div>
       
      </div>
    </section>
    </div>
  );
};

export default VisionGallery;