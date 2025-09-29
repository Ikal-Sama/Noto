"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { EditForm } from "./edit-form";
import { getNoteByIdQuery } from "@/lib/queries/noteQueries";
import { useDeleteNoteMutation } from "@/lib/mutations/useDeleteNoteMutation";
import { useMarkAsCompleted } from "@/lib/mutations/useMarkCompleted";
import { useQuery } from "@tanstack/react-query";

function NoteOptions({ noteId }: { noteId: string }) {
  const { data: note } = useQuery(getNoteByIdQuery(noteId));

  const { mutate: deleteNoteMutation } = useDeleteNoteMutation();
  const { mutate: markAsCompleted } = useMarkAsCompleted();

  const handleDelete = async (id: string) => {
    deleteNoteMutation({ id });
  };

  const handleMarkComplete = async (id: string) => {
    markAsCompleted({ id });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className=" hover:bg-slate-200 cursor-pointer  p-1 rounded-md transition-all duration-200 ease-in-out">
          <Ellipsis className="size-4 text-slate-500" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="w-full"
          onSelect={(e) => e.preventDefault()}
          asChild
        >
          <EditForm note={note?.note || null} />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500"
          onClick={() => handleDelete(note?.note?.id || "")}
        >
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleMarkComplete(note?.note?.id || "")}
        >
          Mark as completed
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NoteOptions;
