"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeftIcon, UsersIcon, FileTextIcon } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import type { User, Note } from "@/lib/types"

export default function AdminPage() {
  const { user, token, loading } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [usersLoading, setUsersLoading] = useState(true)
  const [notesLoading, setNotesLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/dashboard")
      return
    }

    if (user && token && user.role === "admin") {
      fetchUsers()
      fetchNotes()
    }
  }, [user, token, loading, router])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch users")
      }

      const data = await response.json()
      setUsers(data.users)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users")
    } finally {
      setUsersLoading(false)
    }
  }

  const fetchNotes = async () => {
    try {
      const response = await fetch("/api/admin/notes", {
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

  if (loading || usersLoading || notesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push("/dashboard")}>
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Admin Panel</h1>
              <p className="text-sm text-muted-foreground">{user.tenantName}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Users Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5" />
                Users ({users.length})
              </CardTitle>
              <CardDescription>Manage users in your tenant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{user.email}</p>
                      <p className="text-sm text-muted-foreground">
                        Created: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={user.role === "admin" ? "default" : "outline"}>{user.role}</Badge>
                      <Badge variant={user.subscription === "pro" ? "default" : "secondary"}>{user.subscription}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileTextIcon className="w-5 h-5" />
                All Notes ({notes.length})
              </CardTitle>
              <CardDescription>View all notes in your tenant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {notes.map((note) => {
                  const noteUser = users.find((u) => u.id === note.userId)
                  return (
                    <div key={note.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium truncate">{note.title}</h4>
                        <span className="text-xs text-muted-foreground ml-2">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{note.content}</p>
                      <p className="text-xs text-muted-foreground">By: {noteUser?.email || "Unknown User"}</p>
                    </div>
                  )
                })}
                {notes.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No notes found in this tenant</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
