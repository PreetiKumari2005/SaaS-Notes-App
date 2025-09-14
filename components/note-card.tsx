"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EditIcon, TrashIcon } from "lucide-react"
import type { Note } from "@/lib/types"
import { EditNoteDialog } from "./edit-note-dialog"
import { DeleteNoteDialog } from "./delete-note-dialog"

interface NoteCardProps {
  note: Note
  token: string
  onUpdate: () => void
}

export function NoteCard({ note, token, onUpdate }: NoteCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <>
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg truncate">{note.title}</CardTitle>
              <CardDescription>{new Date(note.createdAt).toLocaleDateString()}</CardDescription>
            </div>
            <div className="flex gap-1 ml-2">
              <Button variant="ghost" size="sm" onClick={() => setShowEditDialog(true)}>
                <EditIcon className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowDeleteDialog(true)}>
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">{note.content}</p>
        </CardContent>
      </Card>

      <EditNoteDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        note={note}
        token={token}
        onSuccess={onUpdate}
      />

      <DeleteNoteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        note={note}
        token={token}
        onSuccess={onUpdate}
      />
    </>
  )
}
