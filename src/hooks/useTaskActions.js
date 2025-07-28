import { useSetAtom, useAtomValue } from 'jotai';
import { 
  addTaskAtom, 
  toggleTaskAtom, 
  deleteTaskAtom, 
  clearCompletedTasksAtom,
  markAllCompletedAtom,
  tasksAtom
} from '../atoms';

/**
 * Custom hook that provides task management actions
 * Encapsulates common task operations and provides additional utilities
 */
export function useTaskActions() {
  const addTask = useSetAtom(addTaskAtom);
  const toggleTask = useSetAtom(toggleTaskAtom);
  const deleteTask = useSetAtom(deleteTaskAtom);
  const clearCompleted = useSetAtom(clearCompletedTasksAtom);
  const markAllCompleted = useSetAtom(markAllCompletedAtom);
  const tasks = useAtomValue(tasksAtom);
  
  // Bulk operations
  const bulkToggleTasks = (taskIds) => {
    taskIds.forEach(id => toggleTask(id));
  };
  
  const bulkDeleteTasks = (taskIds) => {
    taskIds.forEach(id => deleteTask(id));
  };
  
  // Add multiple tasks at once
  const addMultipleTasks = (taskTitles) => {
    taskTitles.forEach(title => {
      if (title.trim()) {
        addTask(title.trim());
      }
    });
  };
  
  // Duplicate a task
  const duplicateTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      addTask(`${task.title} (copy)`);
    }
  };
  
  // Quick add with different priorities
  const addHighPriorityTask = (title) => {
    // This would need to be enhanced to set priority
    addTask(title);
  };
  
  const addLowPriorityTask = (title) => {
    // This would need to be enhanced to set priority
    addTask(title);
  };
  
  // Statistics helpers
  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    
    return {
      total,
      completed,
      pending,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };
  
  // Sample data generators (useful for demos/testing)
  const addSampleTasks = () => {
    const sampleTasks = [
      'Review project documentation',
      'Schedule team meeting',
      'Update project status',
      'Fix responsive design issues',
      'Write unit tests',
      'Deploy to staging environment'
    ];
    
    addMultipleTasks(sampleTasks);
  };
  
  return {
    // Basic operations
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
    markAllCompleted,
    
    // Bulk operations
    bulkToggleTasks,
    bulkDeleteTasks,
    addMultipleTasks,
    
    // Utility operations
    duplicateTask,
    addHighPriorityTask,
    addLowPriorityTask,
    
    // Helpers
    getTaskStats,
    addSampleTasks,
    
    // Raw data access
    tasks
  };
}