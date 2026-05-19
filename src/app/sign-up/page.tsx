'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, ArrowRight, Chrome, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import BgGradient from "@/components/common/bg-gradient";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !agreed) return;

    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      localStorage.setItem("user_logged_in", "true");
      window.dispatchEvent(new Event("auth-state-change"));
      setIsLoading(false);
      router.push("/dashboard");
    }, 800);
  };

  const handleOAuthSignUp = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("user_logged_in", "true");
      window.dispatchEvent(new Event("auth-state-change"));
      setIsLoading(false);
      router.push("/dashboard");
    }, 500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <BgGradient />

      <div className="max-w-md w-full space-y-8 bg-white/80 border border-slate-200 shadow-xl rounded-3xl p-8 sm:p-10 backdrop-blur-md relative z-10 animate-in fade-in zoom-in-95 duration-300">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 shadow-md shadow-rose-500/20 group-hover:rotate-6 transform transition duration-300">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">AI Summarizer</span>
          </Link>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create your account</h2>
          <p className="mt-2 text-xs text-slate-500">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-semibold text-rose-600 hover:text-rose-700 transition-colors">
              Sign in here
            </Link>
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-8">
          <Button
            type="button"
            onClick={handleOAuthSignUp}
            variant="outline"
            className="flex items-center justify-center gap-2 py-5 rounded-xl border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 shadow-xs"
          >
            <Chrome className="w-4 h-4 text-rose-500" />
            <span>Google</span>
          </Button>
          <Button
            type="button"
            onClick={handleOAuthSignUp}
            variant="outline"
            className="flex items-center justify-center gap-2 py-5 rounded-xl border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 shadow-xs"
          >
            <Github className="w-4 h-4 text-slate-950" />
            <span>GitHub</span>
          </Button>
        </div>

        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <span className="relative bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            Or register with
          </span>
        </div>

        {/* Form panel */}
        <form className="mt-6 space-y-4" onSubmit={handleSignUp}>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 tracking-wide block">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Amal Biju"
              required
              className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 tracking-wide block">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required
              className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 tracking-wide block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create secure password"
              required
              className="w-full bg-white border border-slate-200/80 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-2.5 py-1">
            <input
              id="agreed"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
              className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500 mt-0.5 cursor-pointer"
            />
            <label htmlFor="agreed" className="text-[11px] text-slate-500 leading-normal cursor-pointer select-none">
              I agree to the{" "}
              <Link href="#" className="font-semibold text-rose-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="font-semibold text-rose-600 hover:underline">
                Privacy Policy
              </Link>
              , including safe storage and secure parsing of my documents.
            </label>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !agreed}
            className="w-full font-bold py-6 text-sm rounded-xl bg-slate-900 text-white hover:bg-rose-600 transition-all shadow-md gap-2 mt-2 disabled:opacity-50 disabled:pointer-events-none"
          >
            <span>{isLoading ? "Creating account..." : "Sign Up"}</span>
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
}
