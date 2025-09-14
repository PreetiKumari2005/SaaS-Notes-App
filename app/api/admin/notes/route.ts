import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { extractTokenFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const auth = extractTokenFromRequest(request)
    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const notes = await db.getNotesByTenant(auth.tenantId)
    return NextResponse.json({ notes })
  } catch (error) {
    console.error("Get all notes error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
