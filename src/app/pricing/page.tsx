'use client';

import { useState } from "react";
import { Check, HelpCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import BgGradient from "@/components/common/bg-gradient";

const plans = [
  {
    name: "Free",
    description: "Perfect for students and casual readers",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      "Up to 3 documents per month",
      "Maximum 50 pages per document",
      "10 MB upload file size limit",
      "Standard executive summary generation",
      "Basic Q&A chatbot interactions",
    ],
    cta: "Start Free",
    popular: false,
    color: "border-slate-200",
  },
  {
    name: "Pro",
    description: "For professional researchers and active readers",
    monthlyPrice: 15,
    annualPrice: 12,
    features: [
      "Unlimited document uploads",
      "Maximum 2,000 pages per document",
      "100 MB upload file size limit",
      "High-speed prioritized GPU queue",
      "Advanced takeaways & action items checklist",
      "Detailed page citations & reference mapping",
      "Priority customer support (24h turnaround)",
    ],
    cta: "Upgrade to Pro",
    popular: true,
    color: "border-rose-500 shadow-rose-500/10 shadow-lg",
  },
  {
    name: "Enterprise",
    description: "Designed for corporate teams and scaling businesses",
    monthlyPrice: 49,
    annualPrice: 39,
    features: [
      "Everything in Pro, plus:",
      "SSO & SAML security integrations",
      "Shared team workspace & workspaces folders",
      "Dedicated server compute allocation",
      "Custom LLM fine-tuning options",
      "Dedicated account manager",
      "Custom contract & invoice billing support",
    ],
    cta: "Contact Enterprise",
    popular: false,
    color: "border-slate-800",
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const router = useRouter();

  const handleSelectPlan = (planName: string) => {
    if (planName === "Free") {
      router.push("/sign-up");
    } else {
      // For mock checkout, store that they chose Pro/Enterprise and auto-login
      localStorage.setItem("user_logged_in", "true");
      window.dispatchEvent(new Event("auth-state-change"));
      router.push("/dashboard");
    }
  };

  return (
    <div className="relative min-h-screen py-16 sm:py-24 bg-slate-50/50">
      <BgGradient />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-top-4 duration-300">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Choose the plan that fits your reading habits. Upgrade, downgrade, or cancel at any time.
          </p>

          {/* Toggle Switch */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <span className={`text-sm font-semibold transition-colors ${billingCycle === "monthly" ? "text-slate-900" : "text-slate-500"}`}>
              Monthly billing
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
              className="relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 p-[2px] transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              style={{ backgroundColor: billingCycle === "annual" ? "#e11d48" : "#cbd5e1" }}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  billingCycle === "annual" ? "translate-x-5.5" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${billingCycle === "annual" ? "text-slate-900" : "text-slate-500"}`}>
              <span>Annual billing</span>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700 animate-pulse">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch mb-20 animate-in fade-in zoom-in-95 duration-400">
          {plans.map((plan, index) => {
            const isPro = plan.popular;
            const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
            
            return (
              <div
                key={index}
                className={`relative flex flex-col justify-between rounded-3xl bg-white border p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${plan.color}`}
              >
                {isPro && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 px-4 py-1 flex items-center gap-1.5 shadow-md shadow-rose-500/20">
                    <Sparkles className="w-3.5 h-3.5 text-white animate-spin-slow" />
                    <span className="text-xs font-bold text-white tracking-wide uppercase">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                    <p className="mt-2 text-xs text-slate-500 leading-normal min-h-[32px]">
                      {plan.description}
                    </p>
                  </div>

                  <div className="flex items-baseline text-slate-900 border-b border-slate-100 pb-6">
                    <span className="text-3xl font-semibold">$</span>
                    <span className="text-5xl font-extrabold tracking-tight transition-all duration-200">
                      {price}
                    </span>
                    <span className="ml-1 text-sm font-semibold text-slate-500">/month</span>
                  </div>

                  <ul className="space-y-4 text-xs text-slate-600">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <Button
                    onClick={() => handleSelectPlan(plan.name)}
                    className={`w-full font-bold py-6 text-sm rounded-xl transition-all shadow-md ${
                      isPro
                        ? "bg-rose-600 text-white hover:bg-rose-700"
                        : "bg-slate-900 text-white hover:bg-rose-600"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing FAQs Section */}
        <div className="max-w-4xl mx-auto border-t border-slate-200/60 pt-16">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-10">Pricing Plan FAQs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-rose-500" />
                <span>Can I cancel at any time?</span>
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Yes, absolutely. There are no long-term contracts. You can cancel your subscription from your account dashboard instantly, and you won't be charged again.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-rose-500" />
                <span>Are taxes included in the pricing?</span>
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Prices exclude local taxes (e.g., VAT or sales tax) which vary depending on your country of residence and will be added during secure checkout.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-rose-500" />
                <span>What payment methods do you accept?</span>
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                We accept major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay through our secure Stripe portal.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-rose-500" />
                <span>Is there an academic or non-profit discount?</span>
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Yes! We offer a 30% discount on annual plans for students, educators, academic researchers, and registered non-profit organizations. Reach out to support.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
