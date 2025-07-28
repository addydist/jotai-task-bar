import { atom } from 'jotai';
import { tasksAtom } from './taskAtoms';
import { filterAtom, searchTermAtom, sortByAtom, sortOrderAtom } from './uiAtoms';

// Filtered tasks based on current filter
export const filteredTasksAtom = atom((get) => {
  const tasks = get(tasksAtom);
  const filter = get(filterAtom);
  
  switch (filter) {
    case 'completed':
      return tasks.filter(task => task.completed);
    case 'pending':
      return tasks.filter(task => !task.completed);
    default:
      return tasks;
  }
});

// Search filtered tasks
export const searchFilteredTasksAtom = atom((get) => {
  const filteredTasks = get(filteredTasksAtom);
  const searchTerm = get(searchTermAtom);
  
  if (!searchTerm.trim()) {
    return filteredTasks;
  }
  
  return filteredTasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
});

// Sorted tasks
export const sortedTasksAtom = atom((get) => {
  const tasks = get(searchFilteredTasksAtom);
  const sortBy = get(sortByAtom);
  const sortOrder = get(sortOrderAtom);
  
  const sorted = [...tasks].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        break;
      case 'createdAt':
      default:
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  return sorted;
});

// Task statistics
export const statsAtom = atom((get) => {
  const tasks = get(tasksAtom);
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  // Priority breakdown
  const priorityStats = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, { high: 0, medium: 0, low: 0 });
  
  return { 
    total, 
    completed, 
    pending, 
    completionRate,
    priorityStats
  };
});

// Tasks by priority (derived atom)
export const tasksByPriorityAtom = atom((get) => {
  const tasks = get(tasksAtom);
  
  return {
    high: tasks.filter(task => task.priority === 'high'),
    medium: tasks.filter(task => task.priority === 'medium'),
    low: tasks.filter(task => task.priority === 'low')
  };
});

// Today's tasks (if you add date filtering)
export const todaysTasksAtom = atom((get) => {
  const tasks = get(tasksAtom);
  const today = new Date().toDateString();
  
  return tasks.filter(task => 
    new Date(task.createdAt).toDateString() === today
  );
});

// Overdue tasks (if you add due dates)
export const overdueTasksAtom = atom((get) => {
  const tasks = get(tasksAtom);
  const now = new Date();
  
  return tasks.filter(task => 
    task.dueDate && 
    new Date(task.dueDate) < now && 
    !task.completed
  );
});