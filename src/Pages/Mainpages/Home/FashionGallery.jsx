import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const articles = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900&auto=format&fit=crop",
    date: "May 08, 2025",
    category: "Style Guide",
    title: "How to choose an outfit",
    excerpt: "Discover the art of putting together the perfect outfit for any occasion. From casual to formal, we cover it all.",
    detail: "Choosing the right outfit starts with understanding your body type, the occasion, and your personal style. Start with a neutral base — white, black, or beige — and build around it. Invest in timeless pieces like a well-fitted blazer, classic trousers, and quality denim. Accessories can transform any look, so don't underestimate a good belt or watch. Most importantly, wear what makes you feel confident.",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=900&auto=format&fit=crop",
    date: "May 06, 2025",
    category: "Craftsmanship",
    title: "How to choose a tailor",
    excerpt: "A great tailor can transform how your clothes fit and feel. Here's what to look for when finding the perfect one.",
    detail: "The right tailor is worth their weight in gold. Look for someone with at least 5 years of experience, a clean and organized workspace, and a portfolio of past work. Always ask for a fitting before committing to a full job. A good tailor listens carefully, takes precise measurements, and communicates clearly about timelines and pricing. Word-of-mouth recommendations from trusted friends are often the best way to find hidden gems.",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=900&auto=format&fit=crop",
    date: "May 03, 2025",
    category: "Quality",
    title: "Put quality first always",
    excerpt: "Fast fashion is tempting, but investing in quality pieces saves money and looks better in the long run.",
    detail: "Quality over quantity is not just a saying — it's a lifestyle. When evaluating clothing quality, check the stitching, fabric weight, and how the garment hangs. Natural fibers like cotton, linen, wool, and silk breathe better and last longer. Look at the seam allowance — wider is better. Check buttons and zippers for smoothness. A higher upfront cost often means lower cost-per-wear over time, making quality clothing the smarter financial choice.",
  },
];

const Modal = ({ article, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
    style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="bg-base-100 rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl"
      onClick={e => e.stopPropagation()}
    >
      {/* Modal image */}
      <div className="relative h-64 overflow-hidden">
        <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--color-base-100) 60%, transparent), transparent)' }} />
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-base-100/80 backdrop-blur-sm flex items-center justify-center text-base-content hover:bg-base-200 transition-colors border border-base-300"
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        {/* Category badge */}
        <span className="absolute bottom-4 left-6 text-[10px] tracking-[0.25em] uppercase text-secondary border border-secondary/40 bg-secondary/10 px-3 py-1 rounded-full backdrop-blur-sm">
          {article.category}
        </span>
      </div>

      {/* Modal body */}
      <div className="p-8">
        <p className="flex items-center gap-2 text-[11px] text-base-content/40 tracking-widest uppercase mb-3">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5">
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {article.date}
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-base-content mb-4 leading-tight">
          {article.title}
        </h2>
        <p className="text-base-content/60 text-[15px] leading-relaxed mb-6">
          {article.detail}
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-primary text-primary-content text-[11px] tracking-[0.2em] uppercase font-medium hover:opacity-90 transition-opacity"
          >
            Close Article
          </button>
          <span className="text-base-content/30 text-xs">Press ESC or click outside to close</span>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const BlogCard = ({ article, index, onOpen }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-base-100 rounded-3xl overflow-hidden border border-base-300 flex flex-col group transition-all duration-500"
      style={{
        boxShadow: hovered ? '0 20px 60px color-mix(in srgb, var(--color-base-content) 12%, transparent)' : '0 2px 12px color-mix(in srgb, var(--color-base-content) 5%, transparent)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={article.img}
          alt={article.title}
          className="w-full h-full object-cover transition-all duration-700"
          style={{
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            filter: hovered ? 'saturate(1.1)' : 'saturate(0.9)',
          }}
        />
        {/* Category chip */}
        <span className="absolute top-4 left-4 text-[9px] tracking-[0.25em] uppercase text-secondary border border-secondary/40 bg-base-100/80 backdrop-blur-sm px-3 py-1 rounded-full">
          {article.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Date */}
        <p className="flex items-center gap-2 text-[11px] text-base-content/40 tracking-wider mb-3">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {article.date}
        </p>

        {/* Title */}
        <h3
          className="font-serif text-xl font-bold text-base-content leading-tight mb-3 transition-colors duration-300"
          style={{ color: hovered ? 'var(--color-primary)' : undefined }}
        >
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-base-content/50 text-sm leading-relaxed flex-1 mb-6">
          {article.excerpt}
        </p>

        {/* Divider */}
        <div className="h-px bg-base-300 mb-5" />

        {/* CTA */}
        <button
          onClick={() => onOpen(article)}
          className="group/btn cursor-pointer  flex items-center gap-3  text-[11px] tracking-[0.25em] uppercase font-medium transition-all duration-300 w-fit"
          style={{ color: hovered ? 'var(--color-primary)' : 'var(--color-base-content)', opacity: hovered ? 1 : 0.6 }}
        >
          Learn more
          <span
            className="flex items-center justify-center w-7 h-7 rounded-full border transition-all duration-300"
            style={{
              background: hovered ? 'var(--color-primary)' : 'transparent',
              borderColor: hovered ? 'var(--color-primary)' : 'color-mix(in srgb, var(--color-base-content) 30%, transparent)',
              color: hovered ? 'var(--color-primary-content)' : 'inherit',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-3 h-3">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </button>
      </div>
    </motion.article>
  );
};

const FashionGallery = () => {
  const [selected, setSelected] = useState(null);

  // Close on ESC
  React.useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <section className="bg-base-100 text-base-content py-10 px-6 transition-colors duration-300">
      <div className=" mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="inline-flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-secondary mb-4">
            <span className="w-6 h-px bg-secondary" />
            Our Testimonials
            <span className="w-6 h-px bg-secondary" />
          </p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-base-content leading-tight mb-5">
            Blog & <em className="text-primary not-italic">Article</em>
          </h2>
          <p className="text-base-content/45 max-w-md mx-auto text-[15px] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {articles.map((article, i) => (
            <BlogCard key={article.id} article={article} index={i} onOpen={setSelected} />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && <Modal article={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default FashionGallery;