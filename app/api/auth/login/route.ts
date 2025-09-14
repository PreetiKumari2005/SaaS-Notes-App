import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { verifyPassword, generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = await db.findUserByEmail(email)
    if (!user || !verifyPassword(password, user.password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = generateToken(user)
    const tenant = await db.findTenantById(user.tenantId)

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        subscription: user.subscription,
        tenantId: user.tenantId,
        tenantName: tenant?.name || "Unknown",
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
