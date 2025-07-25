import type { Metadata } from "next";
import { Source_Sans_3 as FontSans  } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

const geistSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200","300","400","500","600","700","800","900"],
});


export const metadata: Metadata = {
  title: "AI-Summarizer",
  description: "Summarize your PDF files with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} font-sans  antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
        <Header />
       <main className="flex-1">{children}</main>
        <Footer />
        </div>
      </body>
    </html>
  );
  }
