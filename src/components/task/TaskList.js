import React from 'react';
import { useAtomValue } from 'jotai';
import { Circle, CheckCircle2, Search } from 'lucide-react';
import { sortedTasksAtom, viewModeAtom, themeAtom, searchTermAtom, filterAtom } from '../../atoms';
import TaskItem from './TaskItem';

export default function TaskList() {
  const tasks = useAtomValue(sortedTasksAtom);
  const viewMode = useAtomValue(viewModeAtom);
  const theme = useAtomValue(themeAtom);
  const searchTerm = useAtomValue(searchTermAtom);
  const filter = useAtomValue(filterAtom);
  
  // Empty state messages
  const getEmptyStateMessage = () => {
    if (searchTerm) {
      return {
        icon: <Search size={48} className="opacity-50" />,
        title: "No tasks found",
        message: `No tasks match your search for "${searchTerm}"`
      };
    }
    
    switch (filter) {
      case 'completed':
        return {
          icon: <CheckCircle2 size={48} className="opacity-50" />,
          title: "No completed tasks",
          message: "Complete some tasks to see them here!"
        };
      case 'pending':
        return {
          icon: <Circle size={48} className="opacity-50" />,
          title: "No pending tasks",
          message: "Great job! All tasks are completed."
        };
      default:
        return {
          icon: <Circle size={48} className="opacity-50" />,
          title: "No tasks yet",
          message: "Add your first task above to get started!"
        };
    }
  };
  
  // Loading state (you can add loading atom later)
  const isLoading = false;
  
  if (isLoading) {
    return (
      <div className={`p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className={`ml-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading tasks...
          </span>
        </div>
      </div>
    );
  }
  
  // Empty state
  if (tasks.length === 0) {
    const emptyState = getEmptyStateMessage();
    
    return (
      <div className={`p-12 text-center ${
        theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'
      }`}>
        <div className="flex flex-col items-center">
          {emptyState.icon}
          <h3 className={`text-xl font-semibold mt-4 mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {emptyState.title}
          </h3>
          <p className="text-sm max-w-md">
            {emptyState.message}
          </p>
          
          {/* Quick action buttons for empty state */}
          {filter === 'all' && !searchTerm && (
            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => console.log('Add sample tasks')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Sample Tasks
              </button>
              <button
                onClick={() => console.log('Import tasks')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Import Tasks
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Grid view
  if (viewMode === 'grid') {
    return (
      <div className={`p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} viewMode="grid" />
          ))}
        </div>
        
        {/* Task count footer */}
        <div className={`mt-6 pt-4 border-t text-center text-sm ${
          theme === 'dark' ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600'
        }`}>
          Showing {tasks.length} task{tasks.length !== 1 ? 's' : ''}
        </div>
      </div>
    );
  }
  
  // List view (default)
  return (
    <div className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
      {/* Task count header */}
      <div className={`px-6 py-3 border-b text-sm font-medium ${
        theme === 'dark' ? 'border-gray-700 text-gray-300 bg-gray-800' : 'border-gray-200 text-gray-700 bg-gray-50'
      }`}>
        {tasks.length} task{tasks.length !== 1 ? 's' : ''} 
        {searchTerm && ` matching "${searchTerm}"`}
        {filter !== 'all' && ` (${filter})`}
      </div>
      
      {/* Task list */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className="animate-fadeIn"
          >
            <TaskItem task={task} viewMode="list" />
          </div>
        ))}
      </div>
      
      {/* Performance info (for development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className={`px-6 py-2 text-xs border-t ${
          theme === 'dark' ? 'border-gray-700 text-gray-500 bg-gray-800' : 'border-gray-200 text-gray-400 bg-gray-50'
        }`}>
          Rendered {tasks.length} tasks • Last updated: {new Date().toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}