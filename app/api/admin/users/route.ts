import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { extractTokenFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const auth = extractTokenFromRequest(request)
    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const users = await db.getUsersByTenant(auth.tenantId)
    const usersWithoutPasswords = users.map(({ password, ...user }) => user)

    return NextResponse.json({ users: usersWithoutPasswords })
  } catch (error) {
    console.error("Get users error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
