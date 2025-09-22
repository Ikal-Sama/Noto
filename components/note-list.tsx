"use client";

import { getUserNotes } from "@/app/server/note.action";
import NoteCard from "./note-card";
import { useQuery } from "@tanstack/react-query";

// Array of Tailwind background color classes
const noteColors = [
  "bg-blue-50",
  "bg-green-50",
  "bg-yellow-50",
  "bg-pink-50",
  "bg-purple-50",
  "bg-indigo-50",
  "bg-teal-50",
  "bg-orange-50",
];

export default function NoteList() {
  const { data } = useQuery({
    queryKey: ["notes"],
    queryFn: getUserNotes,
  });

  // Function to get a random color class
  const getColorForNote = (id: string) => {
    // Simple hash function to convert string to a number
    const hash = id.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    // Use absolute value and modulo to get a valid index
    const index = Math.abs(hash) % noteColors.length;
    return noteColors[index];
  };

  return (
    <div>
      {data?.notes && data?.notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {data.notes.map((note) => (
            <div key={note.id}>
              <NoteCard note={note} colorClass={getColorForNote(note.id)} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-10">
          <p className="text-slate-600 text-xl font-bold">
            You have no notes yet.
          </p>
        </div>
      )}
    </div>
  );
}
