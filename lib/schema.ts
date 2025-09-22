import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(60),
  body: z.string().min(5, "Description must be at least 5 characters"),
});