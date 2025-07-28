
import { useState }from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { CheckCircle, Circle, Trash2, Edit3, Calendar, Flag, X } from 'lucide-react';
import { toggleTaskAtom, deleteTaskAtom, themeAtom, editTaskAtom } from '../../atoms';
import Button from '../common/Button';
// Edit Modal Component
function EditTaskModal({ task, isOpen, onClose, onSave }) {
  const [title, setTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);
  const theme = useAtomValue(themeAtom);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSave({
        title: title.trim(),
        priority: priority
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className={`w-full max-w-md rounded-lg shadow-xl ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2
            className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Edit Task
          </h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Task Title */}
            <div>
              <label
                htmlFor="task-title"
                className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Task Title
              </label>
              <input
                id="task-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Enter task title..."
                required
              />
            </div>

            {/* Priority */}
            <div>
              <label
                htmlFor="task-priority"
                className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Priority
              </label>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="low">🟢 Low Priority</option>
                <option value="medium">🟡 Medium Priority</option>
                <option value="high">🔴 High Priority</option>
              </select>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default function TaskItem({ task, viewMode = 'list' }) {
    const toggleTask = useSetAtom(toggleTaskAtom);
    const deleteTask = useSetAtom(deleteTaskAtom);
    const editTask = useSetAtom(editTaskAtom);
    const theme = useAtomValue(themeAtom);
    
    // Modal state
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
    const priorityConfig = {
      low: {
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        icon: '🟢',
        border: 'border-green-200 dark:border-green-800',
      },
      medium: {
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        icon: '🟡',
        border: 'border-yellow-200 dark:border-yellow-800',
      },
      high: {
        color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        icon: '🔴',
        border: 'border-red-200 dark:border-red-800',
      },
    };
  
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      return date.toLocaleDateString();
    };
  
    // Handle edit save
    const handleEditSave = (updates) => {
      editTask({ taskId: task.id, updates });
    };
  
    // 👉 Grid view
    if (viewMode === 'grid') {
      return (
        <>
          <div
            className={`p-4 rounded-lg border transition-all hover:shadow-md ${
              task.completed
                ? theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 opacity-75'
                  : 'bg-gray-50 border-gray-200 opacity-75'
                : theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            } ${priorityConfig[task.priority].border}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex-shrink-0 transition-colors ${
                  task.completed
                    ? 'text-green-500'
                    : theme === 'dark'
                    ? 'text-gray-400 hover:text-green-400'
                    : 'text-gray-400 hover:text-green-500'
                }`}
              >
                {task.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
              </button>
  
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Edit3 size={14} />}
                  onClick={() => setIsEditModalOpen(true)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Trash2 size={14} />}
                  onClick={() => deleteTask(task.id)}
                />
              </div>
            </div>
  
            {/* Task Content */}
            <div className="mb-3">
              <h3
                className={`font-medium mb-2 ${
                  task.completed
                    ? `line-through ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`
                    : theme === 'dark'
                    ? 'text-white'
                    : 'text-gray-900'
                }`}
              >
                {task.title}
              </h3>
            </div>
  
            {/* Footer */}
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${priorityConfig[task.priority].color}`}
              >
                <Flag size={12} />
                {task.priority}
              </span>
  
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar size={12} />
                {formatDate(task.createdAt)}
              </div>
            </div>
          </div>
  
          {/* Edit Modal */}
          <EditTaskModal
            task={task}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleEditSave}
          />
        </>
      );
    }
  
    // 👉 List view (default)
    return (
      <>
        <div
          className={`group p-4 border-b flex items-center gap-4 transition-colors hover:bg-opacity-50 ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
              : 'bg-white border-gray-200 hover:bg-gray-50'
          } ${task.completed ? 'opacity-75' : ''}`}
        >
          {/* Checkbox */}
          <button
            onClick={() => toggleTask(task.id)}
            className={`flex-shrink-0 transition-all duration-200 ${
              task.completed
                ? 'text-green-500 scale-110'
                : theme === 'dark'
                ? 'text-gray-400 hover:text-green-400 hover:scale-110'
                : 'text-gray-400 hover:text-green-500 hover:scale-110'
            }`}
          >
            {task.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
          </button>
  
          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p
                  className={`text-base font-medium truncate ${
                    task.completed
                      ? `line-through ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`
                      : theme === 'dark'
                      ? 'text-white'
                      : 'text-gray-900'
                  }`}
                >
                  {task.title}
                </p>
  
                <div className="flex items-center gap-3 mt-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${priorityConfig[task.priority].color}`}
                  >
                    <Flag size={10} />
                    {task.priority} priority
                  </span>
  
                  <div
                    className={`flex items-center gap-1 text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <Calendar size={12} />
                    {formatDate(task.createdAt)}
                  </div>
  
                  <span
                    className={`text-xs font-mono ${
                      theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
                    }`}
                  >
                    #{task.id.toString().slice(-4)}
                  </span>
                </div>
              </div>
            </div>
          </div>
  
          {/* Action Buttons */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              icon={<Edit3 size={16} />}
              onClick={() => setIsEditModalOpen(true)}
            />
            <Button
              variant="ghost"
              size="sm"
              icon={<Trash2 size={16} />}
              onClick={() => deleteTask(task.id)}
              className="hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900"
            />
          </div>
        </div>
  
        {/* Edit Modal */}
        <EditTaskModal
          task={task}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditSave}
        />
      </>
    );
  }