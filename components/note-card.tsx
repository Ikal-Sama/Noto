import FormattedDate from "@/lib/utils/formatDate";
import NoteOptions from "./note-options";

interface NoteCardProps {
  note: {
    id: string;
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    isComplete: boolean;
  };
  colorClass?: string;
}

export default function NoteCard({
  note,
  colorClass = "bg-white",
}: NoteCardProps) {
  return (
    <div
      className={`border rounded-lg px-4 ${colorClass} hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full`}
    >
      <div className="flex justify-between items-center mt-1">
        <p className="text-xs text-muted-foreground">
          {note.isComplete ? (
            <span className="text-primary">Completed</span>
          ) : (
            <span className="text-amber-500">Pending</span>
          )}
        </p>
        <NoteOptions noteId={note.id} />
      </div>
      <div className="py-4">
        <div className="flex flex-col">
          <div className=" text-xs text-gray-500">
            Created: <FormattedDate date={note.createdAt} />
          </div>
          <h3 className="font-semibold text-lg text-gray-800">{note.title}</h3>
        </div>

        <p className="text-gray-700 mt-5">
          {note.body.length > 100
            ? `${note.body.substring(0, 100)}...`
            : note.body}
        </p>
      </div>
    </div>
  );
}
