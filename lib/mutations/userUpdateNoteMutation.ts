import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserNote } from "@/app/server/note.action";
import { toast } from "sonner";
import { z } from "zod";
import { noteSchema } from "@/lib/schema";

export function useUpdateNoteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...values }: { id: string } & z.infer<typeof noteSchema>) => 
      updateUserNote(id, values),
    onSuccess: () => {
      // Invalidate and refetch the notes query
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note updated successfully");
      // Close the dialog after successful submission
      document.getElementById("close-dialog")?.click();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update note");
    },
  });
}
