import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { updatePassword } from "@/app/actions/user";
import { editPasswordFormSchema } from "../schemas";

type MutationOptions = {
  onError?: (error: Error) => void;
  onSuccess?: () => void;
};

export function useUpdatePasswordMutation(options?: MutationOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: z.infer<typeof editPasswordFormSchema>) => {
      const response = await updatePassword(values);
      if (!response.success) {
        throw new Error(response.error || 'Failed to update password');
      }
      return response;
    },
    onSuccess: () => {
      // Invalidate and refetch the profile query
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Password updated successfully");
      // Close the dialog after successful submission
      document.getElementById("close-dialog")?.click();
      // Call the provided onSuccess callback if it exists
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      // Call the provided onError callback if it exists, otherwise throw
      if (options?.onError) {
        options.onError(error);
      } else {
        toast.error(error.message);
      }
    },
  });
}
