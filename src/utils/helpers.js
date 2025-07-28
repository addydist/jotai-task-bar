import { PRIORITY_LEVELS, TASK_LIMITS } from './constants';

/**
 * Date formatting utilities
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  
  if (diffMinutes < 60) {
    return diffMinutes === 0 ? 'Just now' : `${diffMinutes}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

export const isToday = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isThisWeek = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  return date >= weekAgo && date <= today;
};

/**
 * Task validation utilities
 */
export const validateTaskTitle = (title) => {
  const errors = [];
  
  if (!title || !title.trim()) {
    errors.push('Task title is required');
  }
  
  if (title && title.length > TASK_LIMITS.MAX_TITLE_LENGTH) {
    errors.push(`Task title cannot exceed ${TASK_LIMITS.MAX_TITLE_LENGTH} characters`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const sanitizeTaskTitle = (title) => {
  return title.trim().replace(/\s+/g, ' ');
};

/**
 * Priority utilities
 */
export const getPriorityOrder = (priority) => {
  const orders = {
    [PRIORITY_LEVELS.LOW]: 1,
    [PRIORITY_LEVELS.MEDIUM]: 2,
    [PRIORITY_LEVELS.HIGH]: 3
  };
  return orders[priority] || 0;
};

export const comparePriorities = (a, b) => {
  return getPriorityOrder(b) - getPriorityOrder(a); // High to low
};

/**
 * Search and filter utilities
 */
export const searchTasks = (tasks, searchTerm) => {
  if (!searchTerm || !searchTerm.trim()) {
    return tasks;
  }
  
  const term = searchTerm.toLowerCase().trim();
  
  return tasks.filter(task => 
    task.title.toLowerCase().includes(term) ||
    task.priority.toLowerCase().includes(term) ||
    (task.tags && task.tags.some(tag => tag.toLowerCase().includes(term)))
  );
};

export const filterTasksByCompletion = (tasks, showCompleted = true, showPending = true) => {
  return tasks.filter(task => {
    if (task.completed && !showCompleted) return false;
    if (!task.completed && !showPending) return false;
    return true;
  });
};

export const filterTasksByPriority = (tasks, priorities = []) => {
  if (priorities.length === 0) return tasks;
  return tasks.filter(task => priorities.includes(task.priority));
};

/**
 * Sort utilities
 */
export const sortTasks = (tasks, sortBy, sortOrder = 'desc') => {
  const sorted = [...tasks].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'priority':
        comparison = comparePriorities(a.priority, b.priority);
        break;
      case 'createdAt':
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
        break;
      case 'updatedAt':
        comparison = new Date(a.updatedAt || a.createdAt) - new Date(b.updatedAt || b.createdAt);
        break;
      default:
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  return sorted;
};

/**
 * Statistics utilities
 */
export const calculateTaskStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  const priorityStats = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {
    [PRIORITY_LEVELS.HIGH]: 0,
    [PRIORITY_LEVELS.MEDIUM]: 0,
    [PRIORITY_LEVELS.LOW]: 0
  });
  
  return {
    total,
    completed,
    pending,
    completionRate,
    priorityStats
  };
};

export const getProductivityStats = (tasks) => {
  const today = new Date();
  const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
  const todayTasks = tasks.filter(task => isToday(task.createdAt));
  const weekTasks = tasks.filter(task => new Date(task.createdAt) >= thisWeek);
  const monthTasks = tasks.filter(task => new Date(task.createdAt) >= thisMonth);
  
  return {
    today: calculateTaskStats(todayTasks),
    week: calculateTaskStats(weekTasks),
    month: calculateTaskStats(monthTasks)
  };
};

/**
 * Local storage utilities
 */
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    return false;
  }
};

export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return defaultValue;
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Failed to remove from localStorage:', error);
    return false;
  }
};

export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
    return false;
  }
};

/**
 * ID generation utilities
 */
export const generateId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

export const generateTaskId = () => {
  return `task_${generateId()}`;
};

/**
 * Array utilities
 */
export const moveArrayItem = (array, fromIndex, toIndex) => {
  const newArray = [...array];
  const [removed] = newArray.splice(fromIndex, 1);
  newArray.splice(toIndex, 0, removed);
  return newArray;
};

export const removeArrayItem = (array, index) => {
  return array.filter((_, i) => i !== index);
};

export const updateArrayItem = (array, index, updates) => {
  return array.map((item, i) => 
    i === index ? { ...item, ...updates } : item
  );
};

/**
 * String utilities
 */
export const truncateText = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength - 3) + '...';
};

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Theme utilities
 */
export const getSystemTheme = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

export const applyTheme = (theme) => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

/**
 * Keyboard shortcut utilities
 */
export const createKeyboardHandler = (shortcuts) => {
  return (event) => {
    const key = event.key.toLowerCase();
    const hasModifier = event.ctrlKey || event.metaKey || event.altKey;
    
    // Don't trigger shortcuts when typing in inputs
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      return;
    }
    
    if (shortcuts[key] && !hasModifier) {
      event.preventDefault();
      shortcuts[key]();
    }
  };
};

/**
 * Animation utilities
 */
export const fadeIn = (element, duration = 300) => {
  element.style.opacity = 0;
  element.style.display = 'block';
  
  const start = performance.now();
  
  const animate = (currentTime) => {
    const elapsed = currentTime - start;
    const progress = elapsed / duration;
    
    if (progress < 1) {
      element.style.opacity = progress;
      requestAnimationFrame(animate);
    } else {
      element.style.opacity = 1;
    }
  };
  
  requestAnimationFrame(animate);
};

/**
 * Export/Import utilities
 */
export const exportTasksToJSON = (tasks) => {
  const dataStr = JSON.stringify(tasks, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `tasks-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
};

export const importTasksFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const tasks = JSON.parse(e.target.result);
        resolve(tasks);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

/**
 * Performance utilities
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};