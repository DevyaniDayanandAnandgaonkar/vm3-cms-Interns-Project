import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/custom/Sidebar";
import Header from "@/components/custom/Header";

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
        <div className="grid min-h-screen grid-cols-[270px_1fr] grid-rows-[64px_1fr]">
          {/* Sidebar */}
          <aside className="row-span-2 bg-gray-50 border-r p-4">
            <Sidebar />
          </aside>

          {/* Header */}
          <header className="bg-gray-50 border-b  flex items-center">
            <Header />
          </header>

          {/* Main */}
          <main className="bg-gray-100 p-7 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
