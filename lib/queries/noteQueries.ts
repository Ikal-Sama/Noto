import { getUserNotes, getNoteById } from "@/app/server/note.action"


export const getNotesQuery = () => ({
    queryKey: ['notes'],
    queryFn: getUserNotes
})

export const getNoteByIdQuery = (noteId: string) => ({
    queryKey: ['note', noteId],  // Remove 'as const'
    queryFn: () => getNoteById(noteId),
  });