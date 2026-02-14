"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';

export default function ClientLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // TEMP: replace with real auth call
    setTimeout(() => {
      // set a simple client token to denote authenticated state
      try {
        localStorage.setItem("client_token", "1");
      } catch (err) {
        // ignore localStorage errors
      }
      setLoading(false);
      router.push("/profile");
    }, 600);
  };

  return (
    // fixed full-screen overlay so login covers the existing dashboard shell
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login-bg.png')" }}
    >
      <div className="bg-black/95 p-10 rounded-2xl w-[420px] shadow-2xl">
        <div className="flex justify-center mb-6">
          <img src="/images/vm3logo.png" alt="VM3 Logo" className="h-20 object-contain" />
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-300">Client Dashboard</h2>
        <p className="text-center text-gray-400 text-sm mb-8">Sign in to access your dashboard</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-300 font-medium">Username</label>
            <div className="flex items-center bg-gray-100 rounded-lg px-3 border border-gray-300">
              <input
                type="text"
                className="w-full py-3 bg-transparent focus:outline-none text-gray-900"
                placeholder="client@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-gray-300 font-medium">Password</label>
            <div className="flex items-center bg-gray-100 rounded-lg px-3 border border-gray-300">
              <input
                type="password"
                className="w-full py-3 bg-transparent focus:outline-none text-gray-900"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full mt-2 py-3 font-semibold rounded-lg">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
