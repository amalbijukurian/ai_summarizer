'use client';

import Link from "next/link";
import { FileText, Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand block */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">AI Summarizer</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Transforming complex PDFs into bite-sized summaries in seconds. Powered by state-of-the-art AI.
            </p>
            <div className="flex gap-4 mt-2">
              <Link href="https://github.com" className="hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="https://twitter.com" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="https://linkedin.com" className="hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Links 1 - Product */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Product</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Features</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">Workspace</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">API Docs</Link>
              </li>
            </ul>
          </div>

          {/* Links 2 - Support & Resources */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">Resources</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition-colors">Help Center</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter block */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">Stay Updated</h3>
            <p className="text-sm">Subscribe to our newsletter for the latest AI enhancements and updates.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-slate-800 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:outline-none focus:border-rose-500 flex-1"
                required
              />
              <button
                type="submit"
                className="bg-rose-600 text-white hover:bg-rose-700 rounded-lg px-4 py-2 text-sm font-semibold transition-colors shrink-0"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} AI Summarizer. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for developers & readers
          </p>
        </div>
      </div>
    </footer>
  );
}