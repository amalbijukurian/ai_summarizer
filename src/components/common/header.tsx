import Link from "next/link";
import { Button } from "../ui/button";
import { FileText } from 'lucide-react';
export default function Header() {
  const isLoggedin=false;
  return(
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
        <div className="flex lg:flex-1">
        <Link href="/" className="flex items-center gap-1 lg:gap-2 shrink-0 ">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out"/>
            <span className="font-extrabold lg:text-xl text-gray-900">AI Summarizer</span>
            </Link>
        </div>

        <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
            <Link href="/#pricing">Pricing</Link>
            {isLoggedin && <Link href="/dashboard">Your summaries</Link>}
        </div>

        <div className="flex justify-end lg:flex-1">
          {isLoggedin ?(
          <div className="flex gap-2 items-center">
            <Link href="/#upload">Upload PDF</Link>
            <div>Pro</div>
            <Button>User</Button>
          </div>):(
            <Link href="/#sign-in">Sign-in</Link>
          )}
        </div>
    </nav>
  );
}