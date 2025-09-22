"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getNotesQuery } from "@/lib/queries/noteQueries";
import NoteTable from "./note-table";

export default function DashboardData() {
  const { data, isLoading, error } = useQuery(getNotesQuery());

  // Calculate statistics
  const totalNotes = data?.notes?.length || 0;
  const completedNotes =
    data?.notes?.filter((note) => note.isComplete).length || 0;
  const uncompletedNotes = totalNotes - completedNotes;

  if (isLoading) {
    return <div className="py-12">Loading statistics...</div>;
  }

  if (error) {
    return (
      <div className="py-12 text-red-500">
        Error loading notes: {error.message}
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="w-full bg-slate-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalNotes}</div>
            <p className="text-xs text-muted-foreground">All your notes</p>
          </CardContent>
        </Card>
        <Card className="w-full bg-white/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {completedNotes}
            </div>
            <p className="text-xs  text-green-700">Tasks completed</p>
          </CardContent>
        </Card>
        <Card className="w-full bg-primary/70">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {uncompletedNotes}
            </div>
            <p className="text-xs  text-gray-100">Tasks to complete</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <NoteTable data={data?.notes || []} />
      </div>
    </div>
  );
}
