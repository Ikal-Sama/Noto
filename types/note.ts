export interface Note {
  id: string;
  body: string;
  title: string;
  isComplete: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteTableProps {
  data: Note[];
}
