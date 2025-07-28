// App Constants

// Priority levels
export const PRIORITY_LEVELS = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high'
  };
  
  export const PRIORITY_CONFIG = {
    [PRIORITY_LEVELS.LOW]: {
      label: 'Low Priority',
      color: 'green',
      icon: '🟢',
      order: 1
    },
    [PRIORITY_LEVELS.MEDIUM]: {
      label: 'Medium Priority',
      color: 'yellow',
      icon: '🟡',
      order: 2
    },
    [PRIORITY_LEVELS.HIGH]: {
      label: 'High Priority',
      color: 'red',
      icon: '🔴',
      order: 3
    }
  };
  
  // Filter types
  export const FILTER_TYPES = {
    ALL: 'all',
    PENDING: 'pending',
    COMPLETED: 'completed'
  };
  
  // Sort options
  export const SORT_OPTIONS = {
    CREATED_AT: 'createdAt',
    TITLE: 'title',
    PRIORITY: 'priority',
    UPDATED_AT: 'updatedAt'
  };
  
  export const SORT_ORDERS = {
    ASC: 'asc',
    DESC: 'desc'
  };
  
  // View modes
  export const VIEW_MODES = {
    LIST: 'list',
    GRID: 'grid',
    COMPACT: 'compact'
  };
  
  // Theme options
  export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system'
  };
  
  // Local storage keys
  export const STORAGE_KEYS = {
    TASKS: 'tasks',
    THEME: 'theme',
    SETTINGS: 'settings',
    VIEW_PREFERENCES: 'viewPreferences'
  };
  
  // Animation durations (in ms)
  export const ANIMATIONS = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500
  };
  
  // Breakpoints (matching Tailwind defaults)
  export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536
  };
  
  // Task limits
  export const TASK_LIMITS = {
    MAX_TITLE_LENGTH: 200,
    MAX_DESCRIPTION_LENGTH: 1000,
    MAX_TASKS_PER_USER: 1000
  };
  
  // Sample tasks for demo/testing
  export const SAMPLE_TASKS = [
    { title: 'Review project documentation', priority: PRIORITY_LEVELS.MEDIUM },
    { title: 'Schedule team meeting', priority: PRIORITY_LEVELS.HIGH },
    { title: 'Update project status', priority: PRIORITY_LEVELS.LOW },
    { title: 'Fix responsive design issues', priority: PRIORITY_LEVELS.HIGH },
    { title: 'Write unit tests', priority: PRIORITY_LEVELS.MEDIUM },
    { title: 'Deploy to staging environment', priority: PRIORITY_LEVELS.MEDIUM },
    { title: 'Code review for feature branch', priority: PRIORITY_LEVELS.HIGH },
    { title: 'Update dependencies', priority: PRIORITY_LEVELS.LOW },
    { title: 'Optimize database queries', priority: PRIORITY_LEVELS.MEDIUM },
    { title: 'Create user documentation', priority: PRIORITY_LEVELS.LOW }
  ];
  
  // Quick task templates
  export const QUICK_TASKS = [
    '📚 Review documentation',
    '👥 Schedule meeting',
    '📊 Update status',
    '🐛 Fix bug',
    '✅ Write tests',
    '🚀 Deploy changes',
    '📝 Write notes',
    '📞 Make call',
    '📧 Send email',
    '🔄 Follow up'
  ];
  
  // Keyboard shortcuts
  export const KEYBOARD_SHORTCUTS = {
    ADD_TASK: 'n',
    SEARCH: '/',
    TOGGLE_THEME: 't',
    TOGGLE_VIEW: 'v',
    CLEAR_COMPLETED: 'c'
  };
  
  // Error messages
  export const ERROR_MESSAGES = {
    TASK_TOO_LONG: `Task title cannot exceed ${TASK_LIMITS.MAX_TITLE_LENGTH} characters`,
    TASK_EMPTY: 'Task title cannot be empty',
    TASK_LIMIT_REACHED: `Cannot exceed ${TASK_LIMITS.MAX_TASKS_PER_USER} tasks`,
    STORAGE_FULL: 'Local storage is full. Please clear some data.',
    GENERIC_ERROR: 'Something went wrong. Please try again.'
  };
  
  // Success messages
  export const SUCCESS_MESSAGES = {
    TASK_ADDED: 'Task added successfully',
    TASK_COMPLETED: 'Task marked as completed',
    TASK_DELETED: 'Task deleted successfully',
    TASKS_CLEARED: 'Completed tasks cleared',
    SETTINGS_SAVED: 'Settings saved successfully'
  };
  
  // API endpoints (for future backend integration)
  export const API_ENDPOINTS = {
    TASKS: '/api/tasks',
    USERS: '/api/users',
    AUTH: '/api/auth'
  };
  
  // Feature flags (for gradual rollouts)
  export const FEATURE_FLAGS = {
    COLLABORATION: false,
    ANALYTICS: false,
    CLOUD_SYNC: false,
    ADVANCED_SEARCH: true,
    TASK_CATEGORIES: false
  };