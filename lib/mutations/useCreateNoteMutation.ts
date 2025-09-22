import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/app/server/note.action";
import { toast } from "sonner";

export function useCreateNoteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      // Invalidate and refetch the notes query
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note created successfully");
      // Close the dialog after successful submission
      document.getElementById("close-dialog")?.click();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create note");
    },
  });
}
