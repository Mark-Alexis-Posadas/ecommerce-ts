import { testimonials } from "../../data/testimonials";

const Testimonials: React.FC = () => {
  return (
    <section className="px-10 py-20">
      <h2 className="text-3xl font-bold text-center mb-12">
        💬 What Our Customers Say
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white/5 p-6 rounded-xl border border-white/10"
          >
            <p className="text-gray-300 mb-4">"{t.text}"</p>
            <h4 className="font-bold text-indigo-400">{t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
