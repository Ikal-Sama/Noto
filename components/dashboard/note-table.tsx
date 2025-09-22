import React from "react";
import { DataTable } from "../data-table";
import { columns } from "./columns";
import { NoteTableProps } from "@/types/note";
import { Card, CardHeader, CardTitle } from "../ui/card";

export default function NoteTable({ data }: NoteTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Notes</CardTitle>
      </CardHeader>
      <DataTable columns={columns} data={data || []} />
    </Card>
  );
}
