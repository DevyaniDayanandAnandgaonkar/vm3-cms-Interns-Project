"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { hydrateAuth } from "@/store/slices/authSlice";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Hydrate auth state from localStorage on mount
    dispatch(hydrateAuth());
  }, [dispatch]);

  useEffect(() => {
    // Check localStorage as a fallback (token might not be in Redux yet on first render)
    let localToken = null;
    try {
      localToken = localStorage.getItem("client_token");
    } catch (err) {
      localToken = null;
    }

    const hasAuth = isAuthenticated || localToken;

    if (!hasAuth && pathname !== "/login") {
      router.replace("/login");
      return;
    }

    if (hasAuth && pathname === "/login") {
      router.replace("/dashboard");
    }
  }, [pathname, router, isAuthenticated, token]);

  return children;
}
