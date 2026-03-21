import { useState } from "react";

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <section className="px-10 py-20 text-center bg-white/5">
      <h2 className="text-3xl font-bold mb-4">
        🎁 Get 10% Off Your First Order
      </h2>
      <p className="text-gray-400 mb-6">
        Subscribe to our newsletter and stay updated.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row justify-center gap-4 max-w-xl mx-auto"
      >
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 rounded-xl bg-white/10 text-white border border-white/10 focus:outline-none w-full"
        />

        <button className="px-6 py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition">
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default NewsletterSignup;
