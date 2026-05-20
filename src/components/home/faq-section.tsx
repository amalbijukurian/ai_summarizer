"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How does the AI Summarizer work?",
    answer:
      "You simply drag and drop your PDF into the dashboard. Our system parses the text contents securely, analyzes the hierarchy and structure, and applies advanced LLM parsing to instantly extract executive summaries, action items, key insights, and build an interactive Q&A indexed chatbot.",
  },
  {
    question: "Is there a limit to the size or page length of the PDFs?",
    answer:
      "Free tier users can upload PDFs up to 10MB and 50 pages long. Pro users enjoy uploads up to 100MB and unlimited page lengths (thousands of pages), processed with high-speed model priorities.",
  },
  {
    question: "Are my documents secure and private?",
    answer:
      "Absolutely. Security is our top priority. All documents are securely transferred over encrypted HTTPS and stored with AES-256 server-side encryption. We strictly hold a privacy policy where files are never stored longer than needed, and we never use your documents to train public AI models.",
  },
  {
    question: "Can I chat with the PDF in different languages?",
    answer:
      "Yes! The underlying AI is fully multilingual. You can upload a French textbook or a Japanese manual, and ask questions or request summaries in English, French, Spanish, German, Hindi, and more.",
  },
  {
    question: "Can I cancel my Pro subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any point from your workspace account settings. You will retain access to Pro features until the end of your billing cycle, and no further charges will be made.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-rose-600 tracking-wider uppercase">
            Got Questions?
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </p>
          <p className="mt-4 text-lg text-slate-600">
            Everything you need to know about the AI Summarizer platform,
            security, and pricing plans.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-300 shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 hover:text-black-600 transition-color text-black text-bold"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 shrink-0 text-black text-bold" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-rose-500" : ""
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen
                      ? "max-h-96 opacity-100 border-t border-slate-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-5 text-sm text-slate-600 leading-relaxed bg-slate-50/50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
