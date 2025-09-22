import { getUserNotes } from "@/app/server/note.action";
import { NoteForm } from "@/components/note-form";
import NoteList from "@/components/note-list";
import { getQueryClient } from "@/lib/queries/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
export default async function NotesPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: getUserNotes,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="py-12">
        <div className="flex justify-between items-center border-b border-slate-200 pb-5">
          <h1 className="text-2xl font-bold text-slate-800">My Notes</h1>
          <NoteForm />
        </div>
        <div>
          <NoteList />
        </div>
      </div>
    </HydrationBoundary>
  );
}
