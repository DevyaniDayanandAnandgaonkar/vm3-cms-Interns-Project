"use client";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="h-14 bg-gray-800 text-white flex justify-between px-6 items-center">
      <span>Hello, {user?.name}</span>
      <div className="flex gap-4">
        <span>🔔</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

// "use client";

// export default function Topbar() {
//   return (
//     <header className="h-16 flex items-center justify-between px-6 border-b border-gray-800 bg-black">
//       <h1 className="text-lg font-medium">Hello, User</h1>

//       <div className="flex items-center gap-4">
//         <span className="cursor-pointer">🔔</span>
//         <button className="text-sm text-gray-300 hover:text-white">
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }





