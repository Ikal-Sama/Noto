import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { updateProfileDetails } from "@/app/actions/user";
import { editProfileFormSchema } from "../schemas";

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({ 
    mutationFn: (values : z.infer<typeof editProfileFormSchema>) => 
        updateProfileDetails(values),
    onSuccess: () => {
      // Invalidate and refetch the notes query
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully");
      // Close the dialog after successful submission
      document.getElementById("close-dialog")?.click();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
}
