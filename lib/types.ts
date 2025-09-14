export interface User {
  id: string
  email: string
  password: string
  role: "admin" | "member"
  tenantId: string
  subscription: "free" | "pro"
  createdAt: Date
  updatedAt: Date
}

export interface Tenant {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface Note {
  id: string
  title: string
  content: string
  userId: string
  tenantId: string
  createdAt: Date
  updatedAt: Date
}

export interface AuthToken {
  userId: string
  email: string
  role: "admin" | "member"
  tenantId: string
  subscription: "free" | "pro"
  iat: number
  exp: number
}
