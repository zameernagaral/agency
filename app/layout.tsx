"use client";
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
// Remove the import for ReactLenis

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black selection:bg-purple-100">
          <CustomCursor />
          <Navbar />
          
          <main className="min-h-screen">
            {children}
          </main>
          
          <Footer />
      </body>
    </html>
  );
}