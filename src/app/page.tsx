import { Suspense } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">
            Full-stack Next.js app with end-to-end type safety
          </p>
        </header>

        <div className="space-y-6">
          <TaskForm />

          <Suspense
            fallback={
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
                <p className="mt-2 text-gray-500">Loading tasks...</p>
              </div>
            }
          >
            <TaskList />
          </Suspense>
        </div>

        <footer className="mt-12 text-center text-sm text-gray-400">
          <p>Built with Next.js 14, Prisma, Zod & TypeScript</p>
        </footer>
      </div>
    </main>
  );
}
