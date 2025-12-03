import { getTasks } from "@/lib/actions";
import TaskItem from "./TaskItem";

export default async function TaskList() {
  const tasks = await getTasks();

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-2">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-gray-500">No tasks yet. Create your first task!</p>
      </div>
    );
  }

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <div className="space-y-6">
      {activeTasks.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            Active ({activeTasks.length})
          </h2>
          {activeTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            Completed ({completedTasks.length})
          </h2>
          {completedTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
