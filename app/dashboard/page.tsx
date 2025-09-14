"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PlusIcon, LogOutIcon, CrownIcon, UsersIcon } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import type { Note } from "@/lib/types"
import { NoteCard } from "@/components/note-card"
import { CreateNoteDialog } from "@/components/create-note-dialog"

export default function DashboardPage() {
  const { user, token, logout, loading } = useAuth()
  const [notes, setNotes] = useState<Note[]>([])
  const [notesLoading, setNotesLoading] = useState(true)
  const [error, setError] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }

    if (user && token) {
      fetchNotes()
    }
  }, [user, token, loading, router])

  const fetchNotes = async () => {
    try {
      const response = await fetch("/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch notes")
      }

      const data = await response.json()
      setNotes(data.notes)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load notes")
    } finally {
      setNotesLoading(false)
    }
  }

  const handleUpgrade = async () => {
    try {
      const response = await fetch("/api/subscription/upgrade", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Upgrade failed")
      }

      // Refresh the page to update subscription status
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upgrade failed")
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (loading || notesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const canCreateNote = user.subscription === "pro" || notes.length < 3

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">SaaS Notes</h1>
            <p className="text-sm text-muted-foreground">{user.tenantName}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={user.subscription === "pro" ? "default" : "secondary"}>
              {user.subscription === "pro" ? (
                <>
                  <CrownIcon className="w-3 h-3 mr-1" />
                  Pro
                </>
              ) : (
                "Free"
              )}
            </Badge>
            <Badge variant={user.role === "admin" ? "default" : "outline"}>
              {user.role === "admin" ? (
                <>
                  <UsersIcon className="w-3 h-3 mr-1" />
                  Admin
                </>
              ) : (
                "Member"
              )}
            </Badge>
            {user.role === "admin" && (
              <Button variant="outline" onClick={() => router.push("/admin")}>
                Admin Panel
              </Button>
            )}
            <Button variant="outline" onClick={handleLogout}>
              <LogOutIcon className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">My Notes</h2>
            <p className="text-muted-foreground">
              {user.subscription === "free"
                ? `${notes.length}/3 notes used (Free plan)`
                : `${notes.length} notes (Pro plan)`}
            </p>
          </div>
          <div className="flex gap-2">
            {user.subscription === "free" && (
              <Button
                onClick={handleUpgrade}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <CrownIcon className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Button>
            )}
            <Button onClick={() => setShowCreateDialog(true)} disabled={!canCreateNote}>
              <PlusIcon className="w-4 h-4 mr-2" />
              New Note
            </Button>
          </div>
        </div>

        {!canCreateNote && (
          <Alert className="mb-6">
            <AlertDescription>
              You've reached the 3-note limit for free accounts. Upgrade to Pro for unlimited notes!
            </AlertDescription>
          </Alert>
        )}

        {notes.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
                <p className="text-muted-foreground mb-4">Create your first note to get started</p>
                <Button onClick={() => setShowCreateDialog(true)} disabled={!canCreateNote}>
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Create Note
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} token={token!} onUpdate={fetchNotes} />
            ))}
          </div>
        )}

        <CreateNoteDialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
          token={token!}
          onSuccess={fetchNotes}
        />
      </main>
    </div>
  )
}
