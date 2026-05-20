import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Jenkins",
    role: "Academic Researcher",
    avatar: "SJ",
    content:
      "AI Summarizer has cut my literature review time in half. The Q&A feature's direct citations are extremely reliable, unlike basic LLMs that hallucinate facts.",
    rating: 5,
  },
  {
    name: "Marcus Thorne",
    role: "Corporate Attorney",
    avatar: "MT",
    content:
      "Reviewing 150-page vendor contracts used to take me a full day. Now, I upload the PDF, extract action items and anomalies in minutes. Brilliant tool!",
    rating: 5,
  },
  {
    name: "Elena Rostova",
    role: "MBA Candidate",
    avatar: "ER",
    content:
      "The action item extraction checklist is a lifesaver for studying case studies. It gives me a clean structure to build my class presentations around.",
    rating: 5,
  },
  {
    name: "Liam O'Connor",
    role: "Product Manager",
    avatar: "LO",
    content:
      "Being able to upload quarterly market reports and immediately query key metrics saves our team tons of manual CTRL+F work. Simple, fast, and secure.",
    rating: 5,
  },
  {
    name: "Aisha Patel",
    role: "Freelance Copywriter",
    avatar: "AP",
    content:
      "I summarize dense transcripts and whitepapers daily to draft articles. This tool parses the text perfectly and preserves tone and essential facts.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Financial Analyst",
    avatar: "DC",
    content:
      "I drop earnings reports in here and instantly get the key financial milestones and risks. The formatting is clean, executive-ready, and beautiful.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-rose-600 tracking-wider uppercase">
            User Success
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Loved by researchers, lawyers, and students
          </p>
          <p className="mt-4 text-lg text-slate-600">
            See how thousands of readers are unlocking hours of productivity
            every week.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-slate-50/50 hover:bg-slate-50 border border-slate-200/60 rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-colors duration-250"
            >
              <div>
                <div className="flex gap-1 mb-4 text-amber-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 font-bold text-rose-700 text-sm">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
