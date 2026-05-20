"use client";

import NavLink from "./nav-link";
import { Button } from "../ui/button";
import { FileText } from "lucide-react";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      <div className="flex lg:flex-1">
        <NavLink href="/" className="flex items-center gap-2">
          <FileText className="w-6 h-6 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-bold text-xl text-black">AI Summarizer</span>
        </NavLink>
      </div>

      <div className="flex gap-8 items-center">
        <NavLink href="/pricing">Pricing</NavLink>
        {isSignedIn && (
          <NavLink href="/dashboard">Your Summaries</NavLink>
        )}
      </div>

      <div className="flex justify-end lg:flex-1">
        {isSignedIn ? (
          <div className="flex gap-4 items-center">
            <NavLink href="/upload">Upload PDF</NavLink>
            <UserButton/>
          </div>
        ) : (
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
}