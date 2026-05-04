import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 93, suffix: "%", label: "Reported their sanctuary smells noticeably more refined within the first day" },
  { value: 91, suffix: "%", label: "Noticed fragrance lingering luxuriously throughout their entire home" },
  { value: 89, suffix: "%", label: "Received compliments from guests on their home's elegant ambiance" },
  { value: 87, suffix: "%", label: "Preferred our Cold-Air Technology over any previous scenting solution" },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatCard({ value, suffix, label, delay, animate }) {
  const count = useCountUp(value, 1600, animate);
  return (
    <div style={{
      textAlign: "center",
      padding: "32px 20px",
      background: "white",
      borderRadius: 20,
      border: "1px solid #E5E1D8",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      opacity: animate ? 1 : 0,
      transform: animate ? "translateY(0)" : "translateY(24px)",
    }}>
      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 56, color: "#1A1A1A", lineHeight: 1, marginBottom: 12 }}>
        {count}{suffix}
      </div>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#717171", lineHeight: 1.7, maxWidth: 190, margin: "0 auto" }}>
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
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "#F3F0E9", padding: "80px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: "#888", textTransform: "uppercase", marginBottom: 12 }}>
            The Proof
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontWeight: 400, color: "#1A1A1A", margin: "0 0 16px" }}>
            The Transformative Power of Exquisite Scent
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#717171", maxWidth: 480, margin: "0 auto", lineHeight: 1.8 }}>
            Insights from 2,000+ discerning Frägra patrons after 30 days of elevated living.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {stats.map((s, i) => (
            <StatCard key={i} {...s} delay={i * 120} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  );
}