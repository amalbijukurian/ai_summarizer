'use client';

import { useState, useEffect, useRef } from "react";
import { 
  FileText, Plus, Search, ChevronRight, Sparkles, CheckSquare, 
  Square, MessageSquare, List, Send, RefreshCw, AlertCircle, 
  BookOpen, Clock, BarChart2, ShieldAlert, Check, HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import BgGradient from "@/components/common/bg-gradient";

// Documents DB
interface DocumentItem {
  id: string;
  name: string;
  pages: number;
  size: string;
  date: string;
  summary: {
    title: string;
    description: string;
    themes: string[];
    readTime: string;
    savedTime: string;
    takeaways: string[];
    actionItems: { text: string; done: boolean }[];
    suggestedQuestions: string[];
    chatPreset: { question: string; answer: string }[];
  };
}

const PRESET_DOCUMENTS: DocumentItem[] = [
  {
    id: "quantum-computing",
    name: "Quantum_Computing_Intro.pdf",
    pages: 14,
    size: "1.8 MB",
    date: "May 19, 2026",
    summary: {
      title: "Quantum Computing Principles & Application Thresholds",
      description: "An introductory review detailing the transition of quantum information systems from theoretical benchmarks to tangible physical architectures. The paper covers superconducting qubits, topological error corrections, and reviews the threshold timelines for active Shor's algorithm applications.",
      themes: ["Qubits & Gates", "Superconducting Qubits", "Quantum Decoherence", "Shor's Algorithm"],
      readTime: "2 min read",
      savedTime: "42 min saved",
      takeaways: [
        "Superconducting qubits are leading the scaling race, but decoherence rates require extreme sub-Kelvin cryogenics.",
        "Quantum error correction (QEC) requires an overhead of 1,000+ physical qubits to form a single logical fault-tolerant qubit.",
        "Shor's and Grover's algorithms provide exponential and quadratic speedups, but current hardware is in the noisy intermediate-scale quantum (NISQ) era.",
        "Immediate near-term applications focus on quantum chemistry simulations rather than cryptographic decryptions."
      ],
      actionItems: [
        { text: "Evaluate dilution refrigerator cooling capacity specifications.", done: false },
        { text: "Draft comparison chart of ion-trap vs. superconducting qubits scalability.", done: true },
        { text: "Analyze physical-to-logical QEC multiplier thresholds for current algorithms.", done: false }
      ],
      suggestedQuestions: [
        "What cooling specifications are required for superconducting qubits?",
        "How many physical qubits make up a single logical qubit?",
        "When is Shor's algorithm projected to be cryptographically viable?"
      ],
      chatPreset: [
        {
          question: "What cooling specifications are required for superconducting qubits?",
          answer: "According to section 3.2, superconducting qubits require temperatures below 10-20 millikelvin (mK), which is achieved using helium-3/helium-4 dilution refrigerators to suppress thermal excitations that induce quantum decoherence."
        },
        {
          question: "How many physical qubits make up a single logical qubit?",
          answer: "Page 9 states that due to the noisy intermediate-scale quantum (NISQ) architecture flaws, forming one logical fault-tolerant qubit requires approximately 1,000 to 10,000 physical qubits, depending on the surface code error correction fidelity."
        },
        {
          question: "When is Shor's algorithm projected to be cryptographically viable?",
          answer: "Section 5 estimates that Shor's algorithm will require approximately 20 million physical qubits to decrypt RSA-2048 keys. Given current hardware development timelines, standard physical feasibility thresholds are not expected before 2035-2040."
        }
      ]
    }
  },
  {
    id: "q3-financials",
    name: "Q3_Financials_Report.pdf",
    pages: 28,
    size: "3.4 MB",
    date: "May 18, 2026",
    summary: {
      title: "Q3 2025 Financial Performance & Operating Outlines",
      description: "A comprehensive financial report reviewing third-quarter fiscal outcomes. It highlights net revenue margins, operating expense distributions across research and marketing departments, cash flows, and key customer acquisition metrics.",
      themes: ["GAAP Revenue", "Gross Margin Optimization", "APAC Sales Velocity", "SaaS Gross NRR"],
      readTime: "3 min read",
      savedTime: "84 min saved",
      takeaways: [
        "Total GAAP revenue hit $24.8M in Q3, demonstrating a 18.5% year-over-year increase driven by strong APAC markets.",
        "Operating gross margin stabilized at 78.2%, primarily supported by consolidated server infrastructure costs.",
        "Research and development budgets grew by 12% to accommodate new generative AI products.",
        "Net Revenue Retention (NRR) stabilized at 122%, proving low churn rates and consistent account expansion."
      ],
      actionItems: [
        { text: "Confirm cloud computing hosting cost optimizations for Q4.", done: false },
        { text: "Review APAC sales commission structures for the outbound expansion teams.", done: false },
        { text: "Prepare Q3 financial review slide deck for the board of directors meeting.", done: true }
      ],
      suggestedQuestions: [
        "What was the GAAP revenue in Q3 and YoY growth?",
        "What is the current NRR and churn rate indicator?",
        "Why did R&D expenditures increase?"
      ],
      chatPreset: [
        {
          question: "What was the GAAP revenue in Q3 and YoY growth?",
          answer: "GAAP revenue for Q3 was $24.8M, showcasing a 18.5% Year-over-Year (YoY) increase, which surpassed the high-end board expectations of $23.5M (stated on Page 2)."
        },
        {
          question: "What is the current NRR and churn rate indicator?",
          answer: "Net Revenue Retention (NRR) is at 122%, while Gross Revenue Retention (GRR) remains high at 96.5%, indicating strong customer satisfaction and highly successful upsell campaigns (Page 14)."
        },
        {
          question: "Why did R&D expenditures increase?",
          answer: "Research and Development expenditures rose 12% to $6.2M. This increase was driven by active hiring in machine learning engineering to build out the core summarizer GPU acceleration features (Page 7)."
        }
      ]
    }
  },
  {
    id: "saas-playbook",
    name: "SaaS_Growth_Playbook_v4.pdf",
    pages: 42,
    size: "5.0 MB",
    date: "May 15, 2026",
    summary: {
      title: "SaaS Go-To-Market & Revenue Expansion Mechanics",
      description: "A premium marketing and operational playbook reviewing top SaaS metrics. Explains PLG onboarding steps, CAC payback thresholds across SMB/Enterprise sales, and metrics detailing customer health score systems.",
      themes: ["PLG Self-Serve", "CAC Payback Periods", "User Health Scoring", "Expansion Pipelines"],
      readTime: "4 min read",
      savedTime: "126 min saved",
      takeaways: [
        "Product-Led Growth (PLG) setups increase customer expansion by 3x compared to purely high-touch sales teams.",
        "Target CAC payback period targets should remain under 12 months for SMBs, and under 18 months for mid-market/enterprise.",
        "An active customer health score consists of license utilization rate, daily active usage (DAU), and feature engagement metrics.",
        "Upgrades are heavily accelerated by triggering in-app usage thresholds rather than cold email follow-ups."
      ],
      actionItems: [
        { text: "Re-evaluate SMB user sign-up drop-off funnel steps.", done: false },
        { text: "Formulate automated in-app pricing limit trigger models.", done: false },
        { text: "Update the customer success health scoring algorithms in CRM.", done: true }
      ],
      suggestedQuestions: [
        "What are the target CAC payback periods?",
        "How is customer health scoring computed?",
        "What triggers drive high self-serve conversions?"
      ],
      chatPreset: [
        {
          question: "What are the target CAC payback periods?",
          answer: "As outlined on Page 19, CAC payback targets are segmented: under 12 months for SMB/Self-serve (ideal is 8 months), and under 18 months for mid-market and enterprise contracts."
        },
        {
          question: "How is customer health scoring computed?",
          answer: "Page 33 states health scores are calculated using a weighted system: 40% user seat activation, 30% frequency of key-feature actions, and 30% weekly session lengths."
        },
        {
          question: "What triggers drive high self-serve conversions?",
          answer: "The study demonstrates that context-rich upgrade walls triggered when a user completes 90% of their free task allocation generate an 18% lift in upgrades (Page 27)."
        }
      ]
    }
  }
];

export default function DashboardPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>(PRESET_DOCUMENTS);
  const [activeDocId, setActiveDocId] = useState("quantum-computing");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "takeaways" | "actionItems" | "chat">("overview");
  
  // Upload simulation state
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "error">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadFileName, setUploadFileName] = useState("");
  const [uploadStatusText, setUploadStatusText] = useState("Reading file contents...");

  // Chat message state
  const [chatHistories, setChatHistories] = useState<Record<string, { role: "user" | "assistant"; content: string }[]>>({
    "quantum-computing": [{ role: "assistant", content: "Hi! I've fully indexed this Quantum Computing paper. What would you like to know?" }],
    "q3-financials": [{ role: "assistant", content: "Hello! Ready to dive into the Q3 financial data. Ask away!" }],
    "saas-playbook": [{ role: "assistant", content: "Welcome! Let's explore SaaS growth tactics. What's on your mind?" }]
  });
  const [chatInput, setChatInput] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active Document helper
  const activeDoc = documents.find(d => d.id === activeDocId) || documents[0];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistories, activeDocId]);

  // Handle checking/unchecking action items
  const toggleActionItem = (index: number) => {
    setDocuments(prevDocs => 
      prevDocs.map(doc => {
        if (doc.id === activeDocId) {
          const updatedItems = [...doc.summary.actionItems];
          updatedItems[index] = { ...updatedItems[index], done: !updatedItems[index].done };
          return {
            ...doc,
            summary: {
              ...doc.summary,
              actionItems: updatedItems
            }
          };
        }
        return doc;
      })
    );
  };

  // Mock Upload Process
  const triggerMockUpload = (fileName: string) => {
    if (!fileName.toLowerCase().endsWith(".pdf")) {
      setUploadState("error");
      setTimeout(() => setUploadState("idle"), 3000);
      return;
    }

    setUploadFileName(fileName);
    setUploadState("uploading");
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const docId = fileName.toLowerCase().replace(/[^a-z0-9]/g, "-");
            const newDoc: DocumentItem = {
              id: docId,
              name: fileName,
              pages: Math.floor(Math.random() * 20) + 10,
              size: `${(Math.random() * 4 + 1).toFixed(1)} MB`,
              date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
              summary: {
                title: `${fileName.replace(".pdf", "").replace(/_/g, " ")} Summary Hub`,
                description: `This is a dynamically parsed executive summary for your custom document ${fileName}. The AI has indexed all textual and structural elements, creating contextual key insights, an actionable checklist of milestones, and built a custom Q&A chat framework.`,
                themes: ["Custom Analysis", "Data Extraction", "User Document"],
                readTime: "2 min read",
                savedTime: "30 min saved",
                takeaways: [
                  "This custom document outlines strategic considerations specific to its topic framework.",
                  "Key metrics and definitions are fully mapped and ready for contextual indexing.",
                  "The structure suggests highly actionable goals centered around standard industry metrics.",
                  "All references can be reviewed directly by typing custom questions in the Q&A Chat tab."
                ],
                actionItems: [
                  { text: `Review the core elements of ${fileName}`, done: false },
                  { text: "Confirm data validity and share summary outcomes with the team", done: false }
                ],
                suggestedQuestions: [
                  "What is the main objective of this document?",
                  "Can you outline the core topics discussed?",
                  "Who is the target audience for these findings?"
                ],
                chatPreset: [
                  {
                    question: "What is the main objective of this document?",
                    answer: `The primary objective of ${fileName} is to establish structured guidelines and analyze operational parameters relating to its title subject. It sets out specific milestones and outlines performance standards.`
                  },
                  {
                    question: "Can you outline the core topics discussed?",
                    answer: "Based on my semantic indexing, the core topics center on custom analysis, resource allocation, baseline metrics, and risk assessment pathways."
                  },
                  {
                    question: "Who is the target audience for these findings?",
                    answer: "The findings are tailored for project decision-makers, core executors, and analysts seeking to understand high-level structural parameters and implement direct strategies."
                  }
                ]
              }
            };

            setDocuments(prev => [newDoc, ...prev]);
            setChatHistories(prev => ({
              ...prev,
              [docId]: [{ role: "assistant", content: `Hi! I've successfully analyzed your uploaded file "${fileName}". What questions can I answer for you?` }]
            }));
            setActiveDocId(docId);
            setUploadState("idle");
            setActiveTab("overview");
          }, 400);
          return 100;
        }

        if (next < 40) {
          setUploadStatusText("Reading binary PDF streams...");
        } else if (next < 70) {
          setUploadStatusText("Synthesizing structural insights...");
        } else {
          setUploadStatusText("Assembling interactive summary models...");
        }

        return next;
      });
    }, 120);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      triggerMockUpload(files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      triggerMockUpload(files[0].name);
    }
  };

  // Chat handling
  const handleChatSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { role: "user" as const, content: chatInput };
    const docChat = chatHistories[activeDocId] || [];
    
    setChatHistories(prev => ({
      ...prev,
      [activeDocId]: [...docChat, userMessage]
    }));
    
    const userQuery = chatInput;
    setChatInput("");

    // Simulate AI response
    setTimeout(() => {
      const docHistory = chatHistories[activeDocId] || [];
      // Check if userQuery matches a suggested preset
      const presetMatch = activeDoc.summary.chatPreset.find(
        p => p.question.toLowerCase().includes(userQuery.toLowerCase()) || 
             userQuery.toLowerCase().includes(p.question.toLowerCase())
      );

      let aiResponseText = `I have searched the document database for "${userQuery}". Based on active pages, the core models indicate steady progress, though specific quantitative parameters would require custom back-end API indexing. Let me know if you would like me to summarize any other sections!`;
      
      if (presetMatch) {
        aiResponseText = presetMatch.answer;
      }

      setChatHistories(prev => ({
        ...prev,
        [activeDocId]: [...(prev[activeDocId] || []), { role: "assistant", content: aiResponseText }]
      }));
    }, 850);
  };

  const handleSuggestedQuestionClick = (question: string) => {
    setChatInput(question);
  };

  // Filter docs
  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.summary.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-slate-50 flex flex-col">
      <BgGradient />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row container mx-auto px-4 py-8 sm:px-6 lg:px-8 gap-8 relative z-10">
        
        {/* Left Side: File Explorer & Uploader */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          
          {/* Dashboard Profile widget */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center font-bold text-rose-700">
                AB
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 leading-tight">Amal Biju</h3>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Workspace Creator</p>
              </div>
            </div>
            <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-[10px] font-bold text-rose-700 ring-1 ring-inset ring-rose-600/10">
              Pro Account
            </span>
          </div>

          {/* Upload Drop Zone / Progress Bar */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={cn(
              "border-2 border-dashed border-slate-200 bg-white rounded-2xl p-6 text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[160px] shadow-xs relative overflow-hidden",
              uploadState === "uploading" ? "border-rose-500" : "hover:border-rose-500 hover:bg-rose-50/5 cursor-pointer"
            )}
            onClick={() => uploadState !== "uploading" && fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileSelect} 
              accept=".pdf"
              className="hidden" 
            />

            {uploadState === "idle" && (
              <div className="space-y-3 animate-in fade-in duration-200 flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Upload New PDF</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Drag and drop or click to browse</p>
                </div>
              </div>
            )}

            {uploadState === "uploading" && (
              <div className="w-full space-y-4 animate-in fade-in duration-200 flex flex-col items-center">
                <div className="relative h-10 w-10 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-rose-100 animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-2 border-t-rose-600 animate-spin" />
                  <FileText className="w-4 h-4 text-rose-600" />
                </div>
                <div className="w-full space-y-1">
                  <p className="text-[10px] font-bold text-slate-900 truncate max-w-[200px] mx-auto">{uploadFileName}</p>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-rose-600 h-full rounded-full transition-all duration-100" 
                      style={{ width: `${uploadProgress}%` }} 
                    />
                  </div>
                  <div className="flex justify-between text-[8px] font-semibold text-slate-400">
                    <span>{uploadProgress}%</span>
                    <span>{uploadStatusText}</span>
                  </div>
                </div>
              </div>
            )}

            {uploadState === "error" && (
              <div className="space-y-2 animate-in fade-in duration-200 flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-rose-600">Unsupported File</h4>
                  <p className="text-[9px] text-slate-500 mt-0.5">Please drop valid PDF documents only</p>
                </div>
              </div>
            )}
          </div>

          {/* Library Section */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden flex-1 flex flex-col min-h-[300px]">
            <div className="p-4 border-b border-slate-100 flex flex-col gap-3">
              <h4 className="font-bold text-xs text-slate-900 tracking-wide uppercase">Your Document Library</h4>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search PDFs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:border-rose-500 transition-colors"
                />
              </div>
            </div>

            {/* Document list explorer */}
            <div className="flex-1 overflow-y-auto max-h-[320px] divide-y divide-slate-100">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => {
                  const isActive = doc.id === activeDocId;
                  return (
                    <button
                      key={doc.id}
                      onClick={() => {
                        setActiveDocId(doc.id);
                        setActiveTab("overview");
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 p-3.5 text-left transition-colors duration-200 hover:bg-slate-50/50",
                        isActive && "bg-rose-50/20 border-l-2 border-rose-600"
                      )}
                    >
                      <div className={cn(
                        "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border",
                        isActive ? "bg-rose-100/50 border-rose-200 text-rose-600" : "bg-slate-50 border-slate-200 text-slate-500"
                      )}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-xs font-bold truncate", isActive ? "text-rose-600" : "text-slate-900")}>
                          {doc.name}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          {doc.pages} pages &bull; {doc.size}
                        </p>
                      </div>
                      <ChevronRight className={cn("w-3.5 h-3.5 text-slate-400 shrink-0", isActive && "text-rose-500")} />
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center text-slate-400 space-y-2">
                  <AlertCircle className="w-6 h-6 mx-auto text-slate-300" />
                  <p className="text-xs font-semibold">No PDFs matched your search</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Side: Tab Workspace */}
        <div className="flex-1 bg-white border border-slate-200/80 rounded-3xl shadow-xl overflow-hidden flex flex-col min-h-[500px]">
          
          {/* Header Panel */}
          <div className="bg-slate-50/50 border-b border-slate-100 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase text-rose-600 tracking-wider">
                <Sparkles className="w-3 h-3 text-rose-500 animate-pulse" />
                <span>AI Workspace</span>
              </span>
              <h2 className="font-extrabold text-slate-900 text-lg sm:text-xl truncate max-w-[420px]">
                {activeDoc.summary.title}
              </h2>
            </div>

            <div className="flex gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-[10px] font-semibold text-emerald-700">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Parsed successfully</span>
              </span>
            </div>
          </div>

          {/* Tabs Menu */}
          <div className="flex border-b border-slate-100 bg-slate-50/30 px-6 py-1.5 text-xs font-bold text-slate-500 overflow-x-auto gap-4 scrollbar-none shrink-0">
            <button
              onClick={() => setActiveTab("overview")}
              className={cn(
                "py-3 border-b-2 border-transparent transition-all hover:text-slate-900 shrink-0",
                activeTab === "overview" && "border-rose-600 text-rose-600 font-extrabold"
              )}
            >
              Executive Summary
            </button>
            <button
              onClick={() => setActiveTab("takeaways")}
              className={cn(
                "py-3 border-b-2 border-transparent transition-all hover:text-slate-900 shrink-0",
                activeTab === "takeaways" && "border-rose-600 text-rose-600 font-extrabold"
              )}
            >
              Key Insights
            </button>
            <button
              onClick={() => setActiveTab("actionItems")}
              className={cn(
                "py-3 border-b-2 border-transparent transition-all hover:text-slate-900 shrink-0",
                activeTab === "actionItems" && "border-rose-600 text-rose-600 font-extrabold"
              )}
            >
              Action Items ({activeDoc.summary.actionItems.filter(i => !i.done).length})
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={cn(
                "py-3 border-b-2 border-transparent transition-all hover:text-slate-900 shrink-0 flex items-center gap-1 shrink-0",
                activeTab === "chat" && "border-rose-600 text-rose-600 font-extrabold"
              )}
            >
              <MessageSquare className="w-3.5 h-3.5 text-rose-500" />
              <span>Ask AI Chat</span>
            </button>
          </div>

          {/* Active Panel View */}
          <div className="flex-grow p-6 overflow-y-auto leading-relaxed">
            
            {/* OVERVIEW PANEL */}
            {activeTab === "overview" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
                    <div className="h-9 w-9 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Read Time</p>
                      <p className="text-sm font-extrabold text-slate-900 mt-0.5">{activeDoc.summary.readTime}</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
                    <div className="h-9 w-9 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                      <BarChart2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Time Saved</p>
                      <p className="text-sm font-extrabold text-emerald-600 mt-0.5">{activeDoc.summary.savedTime}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
                    <div className="h-9 w-9 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Page Length</p>
                      <p className="text-sm font-extrabold text-slate-900 mt-0.5">{activeDoc.pages} pages</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">Document Summary</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {activeDoc.summary.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">Mapped Conceptual Themes</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeDoc.summary.themes.map((theme, i) => (
                      <span 
                        key={i} 
                        className="bg-rose-50/50 border border-rose-100 rounded-xl px-3 py-1 text-xs font-semibold text-rose-700 shadow-xs"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAKEAWAYS PANEL */}
            {activeTab === "takeaways" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 mb-4">
                  <List className="w-4 h-4 text-rose-600" />
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">Extracted Core Takeaways</h3>
                </div>
                <div className="space-y-4">
                  {activeDoc.summary.takeaways.map((takeaway, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-50/30 border border-slate-150 rounded-2xl p-4 hover:bg-slate-50 transition-colors">
                      <span className="h-6 w-6 rounded-lg bg-rose-50 text-rose-600 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{takeaway}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ACTION ITEMS PANEL */}
            {activeTab === "actionItems" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 mb-4">
                  <CheckSquare className="w-4 h-4 text-rose-600" />
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">Document Checklist</h3>
                </div>
                <p className="text-xs text-slate-500 mb-2">Check off tasks as you review them contextually. Changes are saved locally.</p>
                <div className="space-y-2">
                  {activeDoc.summary.actionItems.map((item, i) => (
                    <div 
                      key={i} 
                      onClick={() => toggleActionItem(i)}
                      className={cn(
                        "flex items-center gap-3.5 p-4 rounded-2xl border cursor-pointer select-none transition-all duration-200",
                        item.done 
                          ? "bg-slate-50/50 border-slate-100 text-slate-400 line-through" 
                          : "bg-white border-slate-200/80 hover:border-rose-500/30 hover:bg-rose-50/5 text-slate-700"
                      )}
                    >
                      <button type="button" className="shrink-0 text-rose-600 focus:outline-none">
                        {item.done ? (
                          <div className="h-5 w-5 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                            <Check className="w-3.5 h-3.5 font-bold" />
                          </div>
                        ) : (
                          <div className="h-5 w-5 rounded border border-slate-300 bg-white" />
                        )}
                      </button>
                      <span className="text-xs sm:text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CHAT PANEL */}
            {activeTab === "chat" && (
              <div className="h-[360px] flex flex-col justify-between animate-in fade-in duration-200">
                {/* Messages Hub */}
                <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 pb-4 scrollbar-thin">
                  {(chatHistories[activeDocId] || []).map((msg, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex flex-col max-w-[80%] rounded-2xl p-4 shadow-xs text-xs sm:text-sm",
                        msg.role === "assistant"
                          ? "bg-slate-50 border border-slate-200 self-start text-slate-800"
                          : "bg-rose-600 text-white self-end ml-auto"
                      )}
                    >
                      <span className={cn(
                        "font-extrabold text-[9px] uppercase tracking-wider mb-1",
                        msg.role === "assistant" ? "text-rose-600" : "text-rose-200"
                      )}>
                        {msg.role === "assistant" ? "AI Companion" : "You"}
                      </span>
                      <p className="leading-relaxed font-medium">{msg.content}</p>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Question suggestions */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <HelpCircle className="w-3 h-3 text-rose-500" />
                    <span>Suggested Questions</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDoc.summary.suggestedQuestions.map((q, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSuggestedQuestionClick(q)}
                        className="bg-slate-50 hover:bg-rose-50 border border-slate-200/80 hover:border-rose-200 rounded-xl px-3 py-1.5 text-[10px] sm:text-xs font-semibold text-slate-600 hover:text-rose-700 transition-colors text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input box */}
                <form onSubmit={handleChatSend} className="flex gap-2.5 mt-3 pt-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask standard questions or type a new query about this document..."
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-rose-500 focus:bg-white transition-all"
                  />
                  <button
                    type="submit"
                    className="bg-slate-900 text-white hover:bg-rose-600 px-5 rounded-2xl transition-all shadow-md flex items-center justify-center shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
