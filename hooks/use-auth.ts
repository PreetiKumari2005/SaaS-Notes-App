"use client"

import { useState, useEffect } from "react"
import { verifyToken } from "@/lib/auth"

interface User {
  id: string
  email: string
  role: "admin" | "member"
  subscription: "free" | "pro"
  tenantId: string
  tenantName: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("auth-token")
    if (storedToken) {
      const decoded = verifyToken(storedToken)
      if (decoded) {
        setToken(storedToken)
        // In a real app, you'd fetch user details from the server
        // For demo, we'll reconstruct from token
        setUser({
          id: decoded.userId,
          email: decoded.email,
          role: decoded.role,
          subscription: decoded.subscription,
          tenantId: decoded.tenantId,
          tenantName: "Demo Tenant", // Would be fetched from server
        })
      } else {
        localStorage.removeItem("auth-token")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Login failed")
    }

    const data = await response.json()
    localStorage.setItem("auth-token", data.token)
    setToken(data.token)
    setUser(data.user)
    return data
  }

  const logout = () => {
    localStorage.removeItem("auth-token")
    setToken(null)
    setUser(null)
  }

  return {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }
}
