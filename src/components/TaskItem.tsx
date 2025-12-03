"use client";

import { useState } from "react";
import { toggleTask, deleteTask, updateTask } from "@/lib/actions";
import type { Task } from "@prisma/client";

type Props = {
  task: Task;
};

export default function TaskItem({ task }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  async function handleToggle() {
    setIsLoading(true);
    const result = await toggleTask({ id: task.id, completed: !task.completed });
    setIsLoading(false);
    if (!result.success) {
      setError(result.error);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this task?")) return;
    setIsLoading(true);
    const result = await deleteTask(task.id);
    setIsLoading(false);
    if (!result.success) {
      setError(result.error);
    }
  }

  async function handleUpdate(formData: FormData) {
    setIsLoading(true);
    setError(null);

    const result = await updateTask({
      id: task.id,
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || null,
      priority: formData.get("priority") as "low" | "medium" | "high",
    });

    setIsLoading(false);

    if (result.success) {
      setIsEditing(false);
    } else {
      setError(result.error);
    }
  }

  if (isEditing) {
    return (
      <form
        action={handleUpdate}
        className="bg-white rounded-lg shadow-md p-4 space-y-3"
      >
        {error && (
          <div className="p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        <input
          type="text"
          name="title"
          defaultValue={task.title}
          required
          maxLength={100}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="description"
          defaultValue={task.description || ""}
          rows={2}
          maxLength={500}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <select
          name="priority"
          defaultValue={task.priority}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm font-medium"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="py-2 px-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 transition-opacity ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      {error && (
        <div className="p-2 mb-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          disabled={isLoading}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className={`font-medium text-gray-800 ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.title}
            </h3>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                priorityColors[task.priority as keyof typeof priorityColors]
              }`}
            >
              {task.priority}
            </span>
          </div>

          {task.description && (
            <p className="mt-1 text-sm text-gray-600">{task.description}</p>
          )}

          <p className="mt-2 text-xs text-gray-400">
            Created {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => setIsEditing(true)}
            disabled={isLoading}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
