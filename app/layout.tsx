import "./globals.css";
import { Inter } from "next/font/google";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

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
import ThemeToggle from "./components/ThemeToggle";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ThemeProvider>
          <nav className="navbar">
            <div className="nav-container">
              <h1 className="logo">Ashoka Motors</h1>
              <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/vehicles">Vehicles</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/ai-recommend" style={{ color: 'var(--yamaha-blue)', fontWeight: 'bold' }}>AI Recommend</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><ThemeToggle /></li>
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
