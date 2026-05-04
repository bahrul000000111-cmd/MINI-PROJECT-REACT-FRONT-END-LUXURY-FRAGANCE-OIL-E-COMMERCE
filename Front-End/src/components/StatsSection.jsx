import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 93, suffix: "%", label: "Menyatakan rumah mereka terasa jauh lebih harum sejak hari pertama." },
  { value: 91, suffix: "%", label: "Menyadari aroma bertahan lama dan menyebar merata ke seluruh ruangan." },
  { value: 89, suffix: "%", label: "Mendapatkan pujian dari tamu tentang aroma rumah dalam minggu pertama." },
  { value: 87, suffix: "%", label: "Lebih memilih Diffuser Frägra dibandingkan pewangi ruangan mereka sebelumnya." },
];

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutQuint
      const ease = 1 - Math.pow(1 - progress, 5);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatCard({ value, suffix, label, delay, animate }) {
  const count = useCountUp(value, 2000, animate);
  return (
    <div className={`text-center p-8 bg-white rounded-3xl border border-[#E5E1D8] transition-all duration-700 ease-out hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="font-serif text-5xl md:text-6xl text-[#1A1A1A] leading-none mb-4 flex items-baseline justify-center gap-1">
        {count}<span className="text-3xl text-[#C9A96E]">{suffix}</span>
      </div>
      <p className="font-sans text-sm text-[#717171] leading-relaxed max-w-[200px] mx-auto font-light">
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#FAFAF8] py-24 px-6 border-t border-[#E5E1D8]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs tracking-[0.2em] text-[#C9A96E] uppercase mb-4 font-medium">
            Bukti Nyata
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-5 tracking-tight">
            Perubahan Saat Aroma Dikelola Dengan Benar
          </h2>
          <p className="font-sans text-base text-[#717171] max-w-2xl mx-auto leading-relaxed font-light">
            Berdasarkan survei terhadap lebih dari 2.000 pelanggan Frägra setelah 30 hari penggunaan di hunian mereka.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} delay={i * 150} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}