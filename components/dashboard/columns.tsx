"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Note } from "@/types/note";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

export const columns: ColumnDef<Note>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "isComplete",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          row.getValue("isComplete")
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {row.getValue("isComplete") ? "Completed" : "Pending"}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString();
    },
  },
];
