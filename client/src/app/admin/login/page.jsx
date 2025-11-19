"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Save in Redux
      dispatch(
        loginSuccess({
          user: { email },
          token: data.token,
        })
      );

      // Redirect
      router.push("/admin/dashboard");

    } catch (err) {
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#111] p-6 rounded-xl w-96 text-white shadow-xl border border-zinc-800">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
