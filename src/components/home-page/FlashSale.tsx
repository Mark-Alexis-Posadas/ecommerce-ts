import { useEffect, useState } from "react";

const FlashSale: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${h}h ${m}m ${s}s`;
  };

  return (
    <section className="px-10 py-16 bg-red-500/10 text-center">
      <h2 className="text-3xl font-bold mb-4">⚡ Flash Sale</h2>
      <p className="text-red-400 mb-6">
        Ends in: <span className="font-bold">{formatTime(timeLeft)}</span>
      </p>

      <button className="px-8 py-3 bg-red-500 rounded-xl font-bold hover:bg-red-400 transition">
        Shop Deals
      </button>
    </section>
  );
};

export default FlashSale;
