import { z } from "zod";

// Schema for creating a new task
export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

// Schema for updating a task
export const updateTaskSchema = z.object({
  id: z.string().cuid(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters")
    .optional(),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .nullable()
    .optional(),
  completed: z.boolean().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

// Schema for deleting a task
export const deleteTaskSchema = z.object({
  id: z.string().cuid(),
});

// Schema for toggling task completion
export const toggleTaskSchema = z.object({
  id: z.string().cuid(),
  completed: z.boolean(),
});

// Infer TypeScript types from Zod schemas
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type DeleteTaskInput = z.infer<typeof deleteTaskSchema>;
export type ToggleTaskInput = z.infer<typeof toggleTaskSchema>;
