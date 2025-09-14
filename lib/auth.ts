import type { AuthToken, User } from "./types"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export function hashPassword(password: string): string {
  // Simple hash implementation for demo - in production use proper hashing
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash.toString()
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

export function generateToken(user: User): string {
  const payload: Omit<AuthToken, "iat" | "exp"> = {
    userId: user.id,
    email: user.email,
    role: user.role,
    tenantId: user.tenantId,
    subscription: user.subscription,
  }

  const now = Math.floor(Date.now() / 1000)
  const tokenData = {
    ...payload,
    iat: now,
    exp: now + 7 * 24 * 60 * 60, // 7 days
  }

  // Simple base64 encoding for demo - in production use proper JWT
  return btoa(JSON.stringify(tokenData))
}

export function verifyToken(token: string): AuthToken | null {
  try {
    const decoded = JSON.parse(atob(token)) as AuthToken

    // Check if token is expired
    const now = Math.floor(Date.now() / 1000)
    if (decoded.exp < now) {
      return null
    }

    return decoded
  } catch {
    return null
  }
}

export function extractTokenFromRequest(request: Request): AuthToken | null {
  const authHeader = request.headers.get("authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return null
  }

  const token = authHeader.substring(7)
  return verifyToken(token)
}
