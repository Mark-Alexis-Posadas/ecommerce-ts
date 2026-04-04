import { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "How long does shipping take?",
    answer: "Shipping usually takes 3-5 business days.",
  },
  {
    question: "Do you offer cash on delivery?",
    answer: "Yes, we support Cash on Delivery (COD).",
  },
  {
    question: "Can I return a product?",
    answer: "Yes, returns are accepted within 7 days.",
  },
  {
    question: "Are payments secure?",
    answer: "All transactions are encrypted and secure.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-6 lg:px-12 py-16">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
          ❓ Frequently Asked Questions
        </h2>
        <p className="text-gray-400 mt-2">
          Everything you need to know before buying
        </p>
      </div>

      {/* FAQ LIST */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg"
            >
              {/* QUESTION */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left text-white font-semibold"
              >
                {faq.question}

                <span
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* ANSWER */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-5 pb-5 text-gray-300">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqSection;
