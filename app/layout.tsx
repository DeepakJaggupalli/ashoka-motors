import "./globals.css";
import { Outfit } from "next/font/google";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });

export const metadata = {
  title: "Ashoka Motors | Official Yamaha Dealership in Hyderabad",
  description: "Book a test ride and explore the latest Yamaha bikes like R15 V4, MT-15, and FZ-X at Ashoka Motors, Secunderabad.",
  keywords: "Yamaha, Ashoka Motors, R15, MT-15, Hyderabad, Secunderabad, Test Ride, Dealership",
  openGraph: {
    title: "Ashoka Motors | Official Yamaha Dealership",
    description: "Explore the latest Yamaha bikes at Ashoka Motors, Secunderabad.",
    url: "https://ashoka-motors.vercel.app",
    siteName: "Ashoka Motors",
    locale: "en_US",
    type: "website",
  }
};

import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./components/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ThemeProvider>
          <nav className="navbar">
            <div className="nav-container">
              <h1 className="logo">Ashoka Motors</h1>
              <ul className="nav-links" style={{ alignItems: 'center' }}>
                <li><a href="/">Home</a></li>
                <li><a href="/vehicles">Vehicles</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                <li>
                  <a href="/ai-recommend" style={{ 
                    background: 'var(--accent-gradient)', 
                    color: 'white', 
                    padding: '0.6rem 1.2rem', 
                    borderRadius: '30px', 
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(0, 210, 255, 0.3)'
                  }}>
                    ✨ AI Matchmaker
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          {children}
          <Chatbot />
          <Toaster position="bottom-right" />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
