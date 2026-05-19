'use client';

import { useState, useEffect } from "react";
import { Upload, FileText, ArrowRight, CheckCircle, RefreshCw, MessageSquare, List, Sparkles, Send } from "lucide-react";
import { Button } from "../ui/button";

type DemoState = "idle" | "uploading" | "completed";
type Tab = "overview" | "takeaways" | "chat";

const SAMPLE_DOCS = [
  { name: "Global_Warming_Report_2026.pdf", pages: 18, size: "2.4 MB" },
  { name: "SaaS_Growth_Playbook_v4.pdf", pages: 34, size: "4.1 MB" }
];

export default function DemoSection() {
  const [demoState, setDemoState] = useState<DemoState>("idle");
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [selectedDoc, setSelectedDoc] = useState("");
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Uploading file...");
  
  // Chat state
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "Hi! I've fully indexed this document. What would you like to know?" }
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleStartDemo = (docName: string) => {
    setSelectedDoc(docName);
    setDemoState("uploading");
    setProgress(0);
  };

  useEffect(() => {
    if (demoState !== "uploading") return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDemoState("completed");
          }, 400);
          return 100;
        }

        // Change text states as progress advances
        if (next < 30) {
          setStatusText("Extracting PDF text and document formatting...");
        } else if (next < 60) {
          setStatusText("Analyzing document hierarchy and outline...");
        } else if (next < 85) {
          setStatusText("Synthesizing core takeaways and AI highlights...");
        } else {
          setStatusText("Building interactive semantic index...");
        }

        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [demoState]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = { role: "user", content: inputVal };
    setChatMessages((prev) => [...prev, userMsg]);
    setInputVal("");

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "I analyzed the document and found that the main findings support a 24% increase in operating margins, with primary growth driven by expansion in APAC and software-as-a-service recurring revenues.";
      if (selectedDoc.includes("Global_Warming")) {
        aiResponse = "Based on page 7 of the report, carbon emissions decreased by 4.2% globally in 2025, but cumulative ocean heat content reached a record high, warming by 12 zettajoules compared to 2024 levels.";
      }
      setChatMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
    }, 800);
  };

  return (
    <section id="demo" className="py-16 sm:py-24 relative overflow-hidden bg-slate-50/40">
      {/* Background shape */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-rose-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-rose-50 border border-rose-100 mb-4 animate-bounce">
            <Sparkles className="w-5 h-5 text-rose-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            See the Magic in Action
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Don't take our word for it. Try uploading a sample document below to see how our AI summarizes it in seconds.
          </p>
        </div>

        {/* Dynamic Interactive Demo Box */}
        <div className="bg-white border border-slate-200 shadow-xl rounded-3xl overflow-hidden min-h-[460px] flex flex-col transition-all duration-300">
          
          {/* Top window headers */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="flex gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-rose-500" />
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500" />
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
            </div>
            <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
              AI SUMMARIZER PLAYGROUND
            </span>
            <div className="w-16" />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10">
            
            {/* IDLE state */}
            {demoState === "idle" && (
              <div className="w-full max-w-xl text-center space-y-8 animate-in fade-in zoom-in-95 duration-200">
                <div 
                  onClick={() => handleStartDemo(SAMPLE_DOCS[0].name)}
                  className="border-2 border-dashed border-slate-200 hover:border-rose-500 hover:bg-rose-50/10 cursor-pointer rounded-2xl p-8 sm:p-12 transition-all group flex flex-col items-center justify-center gap-4"
                >
                  <div className="h-14 w-14 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Drag & Drop your PDF here</h3>
                    <p className="text-sm text-slate-500 mt-1">or click to choose a file from your device</p>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Supports PDF files up to 100MB</span>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    Or try these sample documents
                  </span>
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    {SAMPLE_DOCS.map((doc, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleStartDemo(doc.name)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-rose-500 hover:bg-rose-50/30 text-left transition-all duration-200"
                      >
                        <FileText className="w-5 h-5 text-rose-500 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-900 truncate max-w-[180px]">{doc.name}</p>
                          <p className="text-[10px] text-slate-500 font-medium">{doc.pages} pages &bull; {doc.size}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 ml-auto" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* UPLOADING state */}
            {demoState === "uploading" && (
              <div className="w-full max-w-md space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
                <div className="relative inline-flex items-center justify-center h-16 w-16">
                  <div className="absolute inset-0 rounded-full border-4 border-rose-100 animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-rose-600 animate-spin" />
                  <FileText className="w-6 h-6 text-rose-600 relative" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-lg">Analyzing document...</h3>
                  <p className="text-sm text-slate-500 truncate max-w-[320px] mx-auto font-medium">{selectedDoc}</p>
                </div>
                <div className="space-y-1">
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-rose-600 h-full rounded-full transition-all duration-100 ease-out" 
                      style={{ width: `${progress}%` }} 
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 font-semibold px-0.5">
                    <span>{progress}% complete</span>
                    <span>{statusText}</span>
                  </div>
                </div>
              </div>
            )}

            {/* COMPLETED state */}
            {demoState === "completed" && (
              <div className="w-full animate-in fade-in zoom-in-95 duration-300 flex flex-col lg:flex-row gap-6">
                
                {/* PDF details sidebar */}
                <div className="lg:w-1/3 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-6 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Successfully Summarized</h4>
                        <p className="text-xs text-slate-500 font-medium truncate max-w-[160px]">{selectedDoc}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Pages processed</span>
                        <span className="font-bold text-slate-900">
                          {selectedDoc.includes("Global_Warming") ? "18" : "34"} pages
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Est. reading time</span>
                        <span className="font-bold text-slate-900 line-through text-slate-400 mr-1.5">
                          {selectedDoc.includes("Global_Warming") ? "54" : "102"}m
                        </span>
                        <span className="font-bold text-rose-600">
                          {selectedDoc.includes("Global_Warming") ? "3" : "5"}m summary
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">AI model utilized</span>
                        <span className="font-bold text-slate-900">Gemini 3.5 Flash</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setDemoState("idle");
                      setChatMessages([{ role: "assistant", content: "Hi! I've fully indexed this document. What would you like to know?" }]);
                    }}
                    variant="outline"
                    className="w-full text-xs font-semibold gap-2 border-slate-200 text-slate-600 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Upload New File</span>
                  </Button>
                </div>

                {/* Summarizer workspace tab panels */}
                <div className="flex-1 flex flex-col min-h-[320px]">
                  
                  {/* Tab selectors */}
                  <div className="flex bg-slate-100/80 p-1 rounded-xl mb-4 text-xs font-bold text-slate-500">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                        activeTab === "overview" ? "bg-white text-slate-900 shadow-sm font-extrabold" : "hover:text-slate-800"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5 text-rose-500" />
                      <span>Overview</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("takeaways")}
                      className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                        activeTab === "takeaways" ? "bg-white text-slate-900 shadow-sm font-extrabold" : "hover:text-slate-800"
                      }`}
                    >
                      <List className="w-3.5 h-3.5 text-rose-500" />
                      <span>Takeaways</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("chat")}
                      className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                        activeTab === "chat" ? "bg-white text-slate-900 shadow-sm font-extrabold" : "hover:text-slate-800"
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-rose-500" />
                      <span>Chat with PDF</span>
                    </button>
                  </div>

                  {/* Tab Panel contents */}
                  <div className="flex-1 bg-slate-50 border border-slate-200/50 rounded-xl p-4 text-slate-700 text-sm overflow-y-auto max-h-[260px] leading-relaxed">
                    
                    {activeTab === "overview" && (
                      <div className="space-y-4 animate-in fade-in duration-200">
                        <div>
                          <span className="rounded-full bg-rose-100 text-rose-700 font-extrabold text-[10px] uppercase px-2 py-0.5 tracking-wider">
                            Executive Summary
                          </span>
                          <h4 className="font-bold text-slate-900 text-base mt-2">
                            {selectedDoc.includes("Global_Warming")
                              ? "Critical Analysis of Carbon Abatement Pathways"
                              : "Strategic Manual for SaaS Scaling & Traction Paths"}
                          </h4>
                        </div>
                        <p className="text-slate-600 text-xs">
                          {selectedDoc.includes("Global_Warming")
                            ? "This document details climate metrics across 2025-2026. It underscores that while global carbon emissions dropped marginally by 4.2% due to renewable grid transitions, deep warming triggers continue to break historical boundaries. The study insists that standard offsetting plans are failing and outlines 3 vital pathways for aggressive immediate industrial carbon remediation."
                            : "A comprehensive SaaS growth playbook that focuses on optimizing Customer Acquisition Cost (CAC), maximizing Net Revenue Retention (NRR), and driving expansion pipelines. It highlights case study statistics demonstrating that top-quartile SaaS providers grow through expansion mechanics and data-driven product experimentation rather than pure high-velocity sales acquisition."}
                        </p>
                        <div className="border-t border-slate-200/60 pt-3">
                          <h5 className="font-bold text-slate-900 text-xs mb-1.5">Key Core Themes</h5>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedDoc.includes("Global_Warming") ? (
                              <>
                                <span className="bg-white border border-slate-200 rounded px-2 py-0.5 text-[10px] font-semibold text-slate-600">Carbon Abatement</span>
                                <span className="bg-white border border-slate-200 rounded px-2 py-0.5 text-[10px] font-semibold text-slate-600">Renewable Grid Shift</span>
                                <span className="bg-white border border-slate-200 rounded px-2 py-0.5 text-[10px] font-semibold text-slate-600">Ocean Warming</span>
                              </>
                            ) : (
                              <>
                                <span className="bg-white border border-slate-200 rounded px-2 py-0.5 text-[10px] font-semibold text-slate-600">NRR Expansion</span>
                                <span className="bg-white border border-slate-200 rounded px-2 py-0.5 text-[10px] font-semibold text-slate-600">CAC Payback Period</span>
                                <span className="bg-white border border-slate-200 rounded px-2 py-0.5 text-[10px] font-semibold text-slate-600">PLG Sales Playbook</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "takeaways" && (
                      <div className="space-y-3 animate-in fade-in duration-200">
                        <span className="rounded-full bg-rose-100 text-rose-700 font-extrabold text-[10px] uppercase px-2 py-0.5 tracking-wider">
                          Key Insights
                        </span>
                        <ul className="space-y-3.5 text-xs text-slate-600 mt-2 list-none">
                          {selectedDoc.includes("Global_Warming") ? (
                            <>
                              <li className="flex items-start gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                <span><strong>Ocean Acidification Thresholds:</strong> Sea surface heat has increased by 12 zettajoules, showing critical indicators of marine habitat risk (Page 4).</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                <span><strong>Renewables Growth Speed:</strong> Wind and solar capacity grew by 28% in 2025, explaining the 4.2% drop in global carbon outputs (Page 9).</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                <span><strong>Policy Recommendation:</strong> Immediate adoption of carbon tariffs on high-emission imports is proposed to stimulate clean production (Page 14).</span>
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="flex items-start gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                <span><strong>NRR is the Core Engine:</strong> Top SaaS firms maintain NRR rates above 120%, ensuring organic recurring revenue growth without new additions (Page 11).</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                <span><strong>CAC Payback Target:</strong> Keep CAC payback under 12 months for SMBs, and under 18 months for mid-market contracts to sustain cash flow (Page 19).</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                <span><strong>Frictionless Onboarding:</strong> Reducing initial product activation friction by 3 steps increases conversion and upgrades by 18% (Page 27).</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    )}

                    {activeTab === "chat" && (
                      <div className="flex flex-col h-full min-h-[220px] justify-between animate-in fade-in duration-200">
                        {/* Messages panel */}
                        <div className="space-y-2 flex-grow overflow-y-auto pr-1 pb-3 scrollbar-thin">
                          {chatMessages.map((msg, i) => (
                            <div
                              key={i}
                              className={`flex flex-col max-w-[85%] rounded-xl p-2.5 text-xs ${
                                msg.role === "assistant"
                                  ? "bg-white border border-slate-200 self-start text-slate-800"
                                  : "bg-rose-600 text-white self-end ml-auto"
                              }`}
                            >
                              <span className={`font-bold mb-0.5 text-[10px] ${msg.role === "assistant" ? "text-rose-600" : "text-rose-200"}`}>
                                {msg.role === "assistant" ? "AI Summarizer" : "You"}
                              </span>
                              <p className="leading-relaxed">{msg.content}</p>
                            </div>
                          ))}
                        </div>

                        {/* Input panel */}
                        <form onSubmit={handleSendChat} className="flex gap-2 pt-2 border-t border-slate-200/60 mt-2 shrink-0">
                          <input
                            type="text"
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            placeholder="Ask about this document..."
                            className="bg-white text-xs rounded-lg px-3 py-2 border border-slate-200 focus:outline-none focus:border-rose-500 flex-grow"
                          />
                          <button
                            type="submit"
                            className="bg-slate-900 text-white hover:bg-rose-600 p-2 rounded-lg transition-colors flex items-center justify-center shrink-0"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>
                    )}

                  </div>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}