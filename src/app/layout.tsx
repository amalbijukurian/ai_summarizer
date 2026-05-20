import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import BgGradient from "@/components/common/bg-gradient";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
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
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body className="${geistSans.variable} font-sans  antialiased">
          <div className="relative flex min-h-screen flex-col">
            <BgGradient>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </BgGradient>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
