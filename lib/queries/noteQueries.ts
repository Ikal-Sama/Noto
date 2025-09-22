import { getUserNotes, getNoteById } from "@/app/server/note.action"
import {  useQuery } from "@tanstack/react-query"


export const getNotesQuery = () => ({
    queryKey: ['notes'],
    queryFn: getUserNotes
})

export const getNoteByIdQuery = (noteId: string) => useQuery({
    queryKey: ['note', noteId],  // Remove 'as const'
    queryFn: () => getNoteById(noteId),
  });