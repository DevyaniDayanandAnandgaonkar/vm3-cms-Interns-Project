import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/custom/Sidebar";
import Header from "@/components/custom/Header";
import AuthGuard from "@/components/custom/AuthGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Client Dashboard",
  description: "vm3 crm client dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex bg-gray-900 min-h-screen text-gray-100">
          {/* Sidebar */}
          <aside className="w-[270px] bg-gray-900 border-r border-gray-800 p-4">
            <Sidebar />
          </aside>

          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="bg-gray-900 border-b border-gray-800 flex items-center">
              <Header />
            </header>

            {/* Main */}
            <main className="flex-1 p-10 bg-gray-900 text-gray-100">
              <AuthGuard>{children}</AuthGuard>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
