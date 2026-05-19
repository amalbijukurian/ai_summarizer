import { Zap, MessageSquare, ListTodo, Shield, Languages, Search } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant AI Summaries",
    description: "Convert 100+ page PDFs into key insights, executive summaries, and bullet points in seconds.",
    color: "from-rose-500 to-amber-500",
  },
  {
    icon: MessageSquare,
    title: "Interactive PDF Q&A",
    description: "Chat with your document like a conversational assistant. Ask questions, clarify details, and get cited answers.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: ListTodo,
    title: "Automated Action Items",
    description: "Extract concrete tasks, deadlines, and deliverables hidden in complex business documents automatically.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Search,
    title: "Semantic Citation",
    description: "Every summary point and chatbot answer maps back to precise page numbers and original paragraphs.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Languages,
    title: "Multi-Language Processing",
    description: "Upload a document in any language and get summaries or answers in English, French, Spanish, Japanese, and more.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Your documents are securely encrypted in transit and at rest. Files are strictly private and never used to train models.",
    color: "from-slate-600 to-slate-900",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-slate-50/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold text-rose-600 tracking-wider uppercase">Advanced Features</h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Supercharge your reading productivity
          </p>
          <p className="mt-4 text-lg text-slate-600">
            Engineered to help students, researchers, and professionals digest mountains of information in record time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white border border-slate-200/80 hover:border-rose-500/20 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-rose-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                  {feature.description}
                </p>
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-rose-500/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
