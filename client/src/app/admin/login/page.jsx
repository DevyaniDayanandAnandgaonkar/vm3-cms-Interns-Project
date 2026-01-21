"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import ElectricBorder from "@/components/ui/electric-border"; // <-- ADD THIS
import {useSelector} from "react-redux";
import { apiRoutes } from "@/redux/apiRoutes";

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
      const res = await fetch(apiRoutes.auth.login, {
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

      dispatch(
        loginSuccess({
          user: { email },
          token: data.token,
        })
      );

      router.push("/admin/dashboard");
    } catch (err) {
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login-bg.png')" }}
    >

      <ElectricBorder
        color="#ff0000"       // Change glow color if you want
        speed={1}
        chaos={0.6}
        thickness={3}
        style={{ borderRadius: 20, padding: 0 }}  // Keep padding 0 so your card looks clean
      >

        {/* LOGIN CARD */}
        <div className="bg-black/95 p-10 rounded-2xl w-[420px] shadow-2xl">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/images/Logo.png"
              alt="VM3 Logo"
              className="h-20 object-contain"
            />
          </div>

          <h2 className="text-center text-2xl font-bold text-gray-300">
            Admin Dashboard
          </h2>
          <p className="text-center text-gray-300 text-sm mb-8">
            Sign in to access your dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-4">

            {/* Email */}
            <div>
              <label className="text-blue-100 block mb-1 font-medium">
                Email
              </label>
              <div className="flex items-center bg-gray-100 rounded-lg px-3 border border-gray-300">
                <i className="fas fa-envelope text-gray-500 mr-2"></i>
                <input
                  type="email"
                  className="w-full py-3 bg-transparent focus:outline-none"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-blue-100 block mb-1 font-medium">
                Password
              </label>
              <div className="flex items-center bg-gray-100 rounded-lg px-3 border border-gray-300">
                <i className="fas fa-lock text-gray-500 mr-2"></i>
                <input
                  type="password"
                  className="w-full py-3 bg-transparent focus:outline-none"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </form>

        </div>
      </ElectricBorder>
    </div>
  );
}










// src/app/admin/login/page.jsx
// "use client";

// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "@/redux/features/authSlice";
// import { useRouter } from "next/navigation";

// export default function AdminLogin() {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch(apiRoutes.auth.login, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Login failed");
//         setLoading(false);
//         return;
//       }

//       dispatch(
//         loginSuccess({
//           user: { email },
//           token: data.token,
//         })
//       );

//       router.push("/admin/dashboard");
//     } catch (err) {
//       alert("Server error");
//     }

//     setLoading(false);
//   };

//   return (
//     <div
//       className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
//       style={{ backgroundImage: "url('/images/login-bg.png')" }} // PATH TO BACKGROUND
//     >
//       <div className="bg-white/95 p-10 rounded-2xl w-[420px] shadow-2xl border border-gray-200">
        
//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           <img
//             src="/images/vm3-logo.png" // PATH TO LOGO
//             alt="VM3 Logo"
//             className="h-20 object-contain"
//           />
//         </div>

//         <h2 className="text-center text-2xl font-bold text-gray-800">
//           Admin Dashboard
//         </h2>
//         <p className="text-center text-gray-500 text-sm mb-8">
//           Sign in to access your dashboard
//         </p>

//         <form onSubmit={handleLogin} className="space-y-4">
          
//           {/* Email */}
//           <div>
//             <label className="text-gray-700 block mb-1 font-medium">
//               Email
//             </label>
//             <div className="flex items-center bg-gray-100 rounded-lg px-3 border border-gray-300">
//               <i className="fas fa-envelope text-gray-500 mr-2"></i>
//               <input
//                 type="email"
//                 className="w-full py-3 bg-transparent focus:outline-none"
//                 placeholder="admin@gmail.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-gray-700 block mb-1 font-medium">
//               Password
//             </label>
//             <div className="flex items-center bg-gray-100 rounded-lg px-3 border border-gray-300">
//               <i className="fas fa-lock text-gray-500 mr-2"></i>
//               <input
//                 type="password"
//                 className="w-full py-3 bg-transparent focus:outline-none"
//                 placeholder="********"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
//           >
//             {loading ? "Logging in..." : "Sign In"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
