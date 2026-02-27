// "use client";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "@/redux/authSlice";

// export default function LoginPage() {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const handleLogin = () => {
//     dispatch(loginSuccess({ name: "Employee" }));
//     router.push("/employee/dashboard");
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-900">
//       <button
//         onClick={handleLogin}
//         className="bg-blue-600 px-6 py-2 rounded text-white"
//       >
//         Login
//       </button>
//     </div>
//   );
// }




// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "@/redux/authSlice";

// export default function LoginPage() {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // TEMP LOGIN (later connect API)
//     dispatch(loginSuccess({ name: username || "Employee" }));
//     router.push("/employee/dashboard");
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-[#0f172a] bg-cover bg-center"
//       style={{
//         backgroundImage: "url('/images/login-bg.png')",
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 "></div>

//       {/* Login Card */}
//       <div className="relative z-10 w-full max-w-md bg-black rounded-2xl p-8 shadow-xl">
        
//         {/* Logo */}
//         <div className="flex flex-col items-center mb-6">
//           <img
//             src="/images/vm3logo.png"
//             alt="Logo"
//             className="h-30 mb-2"
//           />
//           <h2 className="text-2xl font-semibold text-gray-200">
//             Employee Dashboard
//           </h2>
//           <p className="text-gray-400 text-sm">
//             Sign in to access your dashboard
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleLogin} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-1">
//               Username
//             </label>
//             <input
//               type="text"
//               placeholder="Enter your username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold transition"
//           >
//             Sign In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/authSlice"; // adjust path if needed
import { useRouter } from "next/navigation";

export default function EmployeeLogin() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/employee/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,   // username field ko email ki tarah use kar rahe
        password: password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      // Token save karo
      localStorage.setItem("token", data.token);

      // Redux me user save karo (structure change nahi kar rahe)
      dispatch(
        loginSuccess({
          name: data.name,
          emp_id: data.emp_id,
          token: data.token,
        })
      );

      router.push("/employee/dashboard");
    } else {
      alert(data.msg || "Login failed");
    }

  } catch (error) {
    console.error("Login error:", error);
    alert("Server error");
  }

  setLoading(false);
};
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login-bg.png')" }}
    >
      {/* LOGIN CARD */}
      <div className="bg-black/95 p-10 rounded-2xl w-[420px] shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/images/vm3logo.png"
            alt="VM3 Logo"
            className="h-20 object-contain"
          />
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-300">
          Employee Dashboard
        </h2>
        <p className="text-center text-gray-400 text-sm mb-8">
          Sign in to access your dashboard
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block mb-1 text-gray-300 font-medium">
              Username
            </label>
            <div className="flex items-center bg-gray-100 rounded-lg px-3 border border-gray-300">
              <input
                type="text"
                className="w-full py-3 bg-transparent focus:outline-none text-gray-900"
                placeholder="employee123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-300 font-medium">
              Password
            </label>
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

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
