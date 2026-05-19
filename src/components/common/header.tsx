'use client';

import { useState, useEffect } from "react";
import NavLink from "./nav-link";
import { Button } from "../ui/button";
import { FileText, Menu, X, LogOut, User, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const loggedIn = localStorage.getItem("user_logged_in") === "true";
    setIsLoggedin(loggedIn);

    // Listen for custom events to update login state instantly
    const handleAuthChange = () => {
      setIsLoggedin(localStorage.getItem("user_logged_in") === "true");
    };
    window.addEventListener("auth-state-change", handleAuthChange);
    return () => window.removeEventListener("auth-state-change", handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_logged_in");
    setIsLoggedin(false);
    setMobileMenuOpen(false);
    window.dispatchEvent(new Event("auth-state-change"));
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rose-500/10 bg-white/80 backdrop-blur-md transition-all">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex lg:flex-1">
          <NavLink href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500 to-rose-600 shadow-md shadow-rose-500/20 group-hover:rotate-6 transform transition duration-300">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold lg:text-xl text-lg tracking-tight bg-gradient-to-r from-slate-900 via-rose-900 to-rose-600 bg-clip-text text-transparent">
              AI Summarizer
            </span>
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-center gap-8 lg:gap-12">
          <NavLink href="/" className="font-medium">Home</NavLink>
          <NavLink href="/pricing" className="font-medium">Pricing</NavLink>
          {mounted && isLoggedin && (
            <NavLink href="/dashboard" className="font-medium flex items-center gap-1">
              <span>Dashboard</span>
              <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            </NavLink>
          )}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex justify-end lg:flex-1">
          {mounted && isLoggedin ? (
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 ring-1 ring-inset ring-rose-600/10">
                Pro Member
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/dashboard")}
                className="gap-2 border-rose-200 text-rose-700 bg-rose-50/50 hover:bg-rose-50"
              >
                <User className="w-4 h-4" />
                <span>Workspace</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-slate-600 hover:text-rose-600 hover:bg-rose-50/50 transition-colors gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink href="/sign-in" className="font-medium text-slate-600 hover:text-rose-600">
                Sign In
              </NavLink>
              <Button
                onClick={() => router.push("/sign-up")}
                className="rounded-full bg-slate-900 text-white hover:bg-rose-600 font-semibold px-5 text-sm shadow-md transition-all duration-300"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2.5 text-slate-700 bg-slate-50 border border-slate-200/60 hover:bg-slate-100 hover:text-rose-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-rose-500/10 bg-white/95 backdrop-blur-lg animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="space-y-1 px-4 py-4 pb-6">
            <NavLink
              href="/"
              className="block rounded-lg px-3 py-2.5 text-base font-semibold text-slate-900 hover:bg-rose-50/50 hover:text-rose-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              href="/pricing"
              className="block rounded-lg px-3 py-2.5 text-base font-semibold text-slate-900 hover:bg-rose-50/50 hover:text-rose-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </NavLink>
            {mounted && isLoggedin && (
              <NavLink
                href="/dashboard"
                className="block rounded-lg px-3 py-2.5 text-base font-semibold text-slate-900 hover:bg-rose-50/50 hover:text-rose-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard Workspace
              </NavLink>
            )}

            <div className="mt-4 pt-4 border-t border-slate-100">
              {mounted && isLoggedin ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-3 py-2 text-sm text-slate-500 font-medium">
                    <span>Account Tier</span>
                    <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-700 ring-1 ring-inset ring-rose-600/10">
                      Pro Member
                    </span>
                  </div>
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      router.push("/dashboard");
                    }}
                    className="w-full justify-center bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl py-3"
                  >
                    Go to Workspace
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-center text-slate-600 hover:text-rose-600 hover:bg-rose-50/50 font-medium py-3 rounded-xl gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <NavLink
                    href="/sign-in"
                    className="block text-center rounded-lg px-3 py-2.5 text-base font-semibold text-slate-900 hover:bg-rose-50/50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </NavLink>
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      router.push("/sign-up");
                    }}
                    className="w-full justify-center bg-slate-900 text-white hover:bg-rose-600 font-semibold rounded-xl py-3 shadow-md"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}