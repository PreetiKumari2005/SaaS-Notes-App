import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { extractTokenFromRequest } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const auth = extractTokenFromRequest(request)
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In a real app, this would integrate with Stripe
    // For demo purposes, we'll just upgrade the user
    const updatedUser = await db.updateUser(auth.userId, {
      subscription: "pro",
    })

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Successfully upgraded to Pro!",
      subscription: "pro",
    })
  } catch (error) {
    console.error("Upgrade error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
