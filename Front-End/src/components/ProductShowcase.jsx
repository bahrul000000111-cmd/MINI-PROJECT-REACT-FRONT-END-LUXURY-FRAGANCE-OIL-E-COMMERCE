import { motion } from 'framer-motion';
import { products } from '../data/contentData';
import ProductCard from './ProductCard';

export default function ProductShowcase() {
  return (
    <section className="bg-[#F3F0E9] py-24 px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-[#1A1A1A]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p className="font-sans text-xs tracking-[0.2em] text-[#C9A96E] uppercase mb-4 font-medium">
            Produk Pilihan
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#1A1A1A] mb-5 tracking-tight">
            Diciptakan untuk Hunian Eksklusif
          </h2>
          <p className="font-sans text-sm md:text-base text-[#717171] max-w-xl mx-auto leading-relaxed font-light">
            Klik produk apa saja untuk melihat detail, pilih ukuran, dan rasakan koleksi wewangian mewah kami yang akan mengubah suasana rumah Anda.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Footer link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="/info/shop-all"
            className="inline-flex items-center gap-3 border border-[#D4D0C8] text-[#1A1A1A] rounded-full px-8 py-3.5 font-sans text-sm font-medium hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Lihat Semua Produk
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
