import { z } from "zod"
 
export const editProfileFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email().optional(),
})

export const editPasswordFormSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8, "Password must be at least 8 characters long").max(50),
  confirmNewPassword: z.string().min(8, "Password must be at least 8 characters long").max(50),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"], // This shows the error on the confirmNewPassword field
});