"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { isLogin, logout } from "@/app/api/actions";
import { AuthContextType } from "@/types/types";

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const loggedIn = await isLogin();
    setIsAuthenticated(!! loggedIn);
  };

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
  };

  const value = {checkAuth , handleLogout , isAuthenticated}

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
