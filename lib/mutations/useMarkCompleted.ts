import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserNote, markAsCompleted } from "@/app/server/note.action";
import { toast } from "sonner";

export function useMarkAsCompleted() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id}: { id: string }) => 
      markAsCompleted(id),
    onSuccess: () => {
      // Invalidate and refetch the notes query
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note mark as completed successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update note");
    },
  });
}
