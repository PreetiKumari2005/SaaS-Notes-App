import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { extractTokenFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = extractTokenFromRequest(request)
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const note = await db.findNoteById(params.id, auth.tenantId)
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    // Users can only access their own notes unless they're admin
    if (note.userId !== auth.userId && auth.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json({ note })
  } catch (error) {
    console.error("Get note error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = extractTokenFromRequest(request)
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content } = await request.json()

    const existingNote = await db.findNoteById(params.id, auth.tenantId)
    if (!existingNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    // Users can only edit their own notes unless they're admin
    if (existingNote.userId !== auth.userId && auth.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const note = await db.updateNote(params.id, auth.tenantId, {
      title: title || existingNote.title,
      content: content || existingNote.content,
    })

    return NextResponse.json({ note })
  } catch (error) {
    console.error("Update note error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = extractTokenFromRequest(request)
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const existingNote = await db.findNoteById(params.id, auth.tenantId)
    if (!existingNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    // Users can only delete their own notes unless they're admin
    if (existingNote.userId !== auth.userId && auth.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const deleted = await db.deleteNote(params.id, auth.tenantId)
    if (!deleted) {
      return NextResponse.json({ error: "Failed to delete note" }, { status: 500 })
    }

    return NextResponse.json({ message: "Note deleted successfully" })
  } catch (error) {
    console.error("Delete note error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
