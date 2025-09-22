import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserNote } from "@/app/server/note.action";
import { toast } from "sonner";

export function useDeleteNoteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id}: { id: string }) => 
      deleteUserNote(id),
    onSuccess: () => {
      // Invalidate and refetch the notes query
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete note");
    },
  });
}
