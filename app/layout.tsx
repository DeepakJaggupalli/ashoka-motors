import "./globals.css";
import { Inter } from "next/font/google";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ashoka Motors",
  description: "Official Yamaha Dealership in Hyderabad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="logo">Ashoka Motors</h1>
            <ul className="nav-links">
              <li><a href="/">Home</a></li>
              <li><a href="/vehicles">Vehicles</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </nav>
        {children}
        <Chatbot />
        <Footer />
      </body>
    </html>
  );
}
