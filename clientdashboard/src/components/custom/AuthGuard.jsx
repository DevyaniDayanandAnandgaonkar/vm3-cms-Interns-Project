"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // simple localStorage-based auth flag
    let token = null;
    try {
      token = localStorage.getItem("client_token");
    } catch (err) {
      token = null;
    }

    if (!token && pathname !== "/login") {
      router.push("/login");
      return;
    }

    if (token && pathname === "/login") {
      // already authenticated, send to root/profile
      router.push("/");
    }
  }, [pathname, router]);

  return children;
}
