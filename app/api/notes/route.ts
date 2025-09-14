import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { extractTokenFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const auth = extractTokenFromRequest(request)
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const notes = await db.getNotesByUser(auth.userId, auth.tenantId)
    return NextResponse.json({ notes })
  } catch (error) {
    console.error("Get notes error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = extractTokenFromRequest(request)
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // Check subscription limits
    if (auth.subscription === "free") {
      const existingNotes = await db.getNotesByUser(auth.userId, auth.tenantId)
      if (existingNotes.length >= 3) {
        return NextResponse.json(
          { error: "Free plan limited to 3 notes. Upgrade to Pro for unlimited notes." },
          { status: 403 },
        )
      }
    }

    const note = await db.createNote({
      title,
      content,
      userId: auth.userId,
      tenantId: auth.tenantId,
    })

    return NextResponse.json({ note }, { status: 201 })
  } catch (error) {
    console.error("Create note error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
