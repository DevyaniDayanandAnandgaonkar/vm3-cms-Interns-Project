"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginClient, clearError } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";

export default function ClientLogin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    const result = await dispatch(loginClient({ email, password }));

    if (loginClient.fulfilled.match(result)) {
      router.push("/dashboard");
    }
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

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-300 font-medium">Email</label>
            <div className="flex items-center bg-gray-100 rounded-lg px-3 border border-gray-300">
              <input
                type="email"
                className="w-full py-3 bg-transparent focus:outline-none text-gray-900"
                placeholder="client@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
