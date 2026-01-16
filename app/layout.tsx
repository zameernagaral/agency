// app/layout.tsx
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "AGENCY — Design & Development Studio",
  description:
    "We design and build high-performance digital products for startups.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">
        <Navbar />
        {/* ✅ client component */}
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
