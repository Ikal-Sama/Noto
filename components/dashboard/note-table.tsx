import React from "react";
import { DataTable } from "../data-table";
import { columns } from "./columns";
import { NoteTableProps } from "@/types/note";
import { Card, CardHeader, CardTitle } from "../ui/card";

export default function NoteTable({ data }: NoteTableProps) {
  if (!data || data.length === 0) {
    return <div>No notes found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Notes</CardTitle>
      </CardHeader>
      <DataTable columns={columns} data={data} />
    </Card>
  );
}
