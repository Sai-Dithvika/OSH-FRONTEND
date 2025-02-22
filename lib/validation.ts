import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  tags: z
    .string()
    .transform((val) => val.split(",").map((tag) => tag.trim())) // Converts to array
    .or(z.array(z.string())) // Supports both string and array formats
    .optional(),
  id: z.string().optional(),
});

export type PostValues = z.infer<typeof postSchema>;
