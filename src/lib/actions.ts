"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./db";
import {
  createTaskSchema,
  updateTaskSchema,
  deleteTaskSchema,
  toggleTaskSchema,
  type CreateTaskInput,
  type UpdateTaskInput,
  type ToggleTaskInput,
} from "./validations";

// Type for action results
type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

// CREATE - Add a new task
export async function createTask(
  input: CreateTaskInput
): Promise<ActionResult> {
  try {
    const validated = createTaskSchema.parse(input);

    await prisma.task.create({
      data: {
        title: validated.title,
        description: validated.description,
        priority: validated.priority,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to create task" };
  }
}

// READ - Get all tasks
export async function getTasks() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
    return tasks;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
}

// UPDATE - Update a task
export async function updateTask(
  input: UpdateTaskInput
): Promise<ActionResult> {
  try {
    const validated = updateTaskSchema.parse(input);
    const { id, ...data } = validated;

    await prisma.task.update({
      where: { id },
      data,
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to update task" };
  }
}

// UPDATE - Toggle task completion
export async function toggleTask(
  input: ToggleTaskInput
): Promise<ActionResult> {
  try {
    const validated = toggleTaskSchema.parse(input);

    await prisma.task.update({
      where: { id: validated.id },
      data: { completed: validated.completed },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to toggle task" };
  }
}

// DELETE - Delete a task
export async function deleteTask(id: string): Promise<ActionResult> {
  try {
    const validated = deleteTaskSchema.parse({ id });

    await prisma.task.delete({
      where: { id: validated.id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to delete task" };
  }
}
