import React, { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { themeAtom, loadingAtom } from './atoms';
import { useTheme } from './hooks/useTheme';
import { createKeyboardHandler } from './utils/helpers';
import { KEYBOARD_SHORTCUTS } from './utils/constants';

// Layout Components
import Header from './components/layout/Header';

// Task Components
import TaskForm from './components/task/TaskForm';
import TaskFilters from './components/task/TaskFilters';
import TaskList from './components/task/TaskList';

// CSS for animations (you can add this to your global CSS)
const globalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export default function App() {
  const theme = useAtomValue(themeAtom);
  const isLoading = useAtomValue(loadingAtom);
  const { toggleTheme } = useTheme();
  
  // Keyboard shortcuts
  useEffect(() => {
    const shortcuts = {
      [KEYBOARD_SHORTCUTS.ADD_TASK]: () => {
        const input = document.querySelector('input[placeholder*="What needs to be done"]');
        if (input) input.focus();
      },
      [KEYBOARD_SHORTCUTS.SEARCH]: () => {
        const searchInput = document.querySelector('input[placeholder*="Search"]');
        if (searchInput) searchInput.focus();
      },
      [KEYBOARD_SHORTCUTS.TOGGLE_THEME]: toggleTheme,
      // Add more shortcuts as needed
    };
    
    const handleKeyboard = createKeyboardHandler(shortcuts);
    document.addEventListener('keydown', handleKeyboard);
    
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [toggleTheme]);
  
  // Add global styles
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = globalStyles;
    document.head.appendChild(styleSheet);
    
    return () => document.head.removeChild(styleSheet);
  }, []);
  
  // Loading state
  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            Loading your tasks...
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      {/* Main Container */}
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <Header />
        
        {/* Task Form Section */}
        <TaskForm />
        
        {/* Filters Section */}
        <TaskFilters />
        
        {/* Task List Section */}
        <TaskList />
        
        {/* Footer */}
        <footer className={`p-6 text-center border-t ${
          theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-600'
        }`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm">
              <span>Built with Jotai State Management</span>
              <span>•</span>
              <span>React 18</span>
              <span>•</span>
              <span>Tailwind CSS</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <kbd className={`px-2 py-1 rounded text-xs ${
                theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
                N
              </kbd>
              <span>New Task</span>
              <span>•</span>
              <kbd className={`px-2 py-1 rounded text-xs ${
                theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
                T
              </kbd>
              <span>Toggle Theme</span>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Debug Panel (Development Only) */}
      {process.env.NODE_ENV === 'development' && <DebugPanel />}
    </div>
  );
}

// Debug Panel Component (for development)
function DebugPanel() {
  const theme = useAtomValue(themeAtom);
  const [isOpen, setIsOpen] = React.useState(false);
  
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 p-2 rounded-full shadow-lg text-xs ${
          theme === 'dark' ? 'bg-gray-800 text-gray-300 border border-gray-700' : 'bg-white text-gray-600 border'
        }`}
      >
        🐛
      </button>
    );
  }
  
  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-xs max-w-xs ${
      theme === 'dark' ? 'bg-gray-800 text-gray-300 border border-gray-700' : 'bg-white text-gray-600 border'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className="font-bold">Debug Panel</div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-1">
        <div>Theme: <span className="font-mono">{theme}</span></div>
        <div>Environment: <span className="font-mono">{process.env.NODE_ENV}</span></div>
        <div>React Version: <span className="font-mono">{React.version}</span></div>
        <div>Timestamp: <span className="font-mono">{new Date().toLocaleTimeString()}</span></div>
      </div>
      
      <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500">
          Press <kbd>T</kbd> to toggle theme
        </div>
        <div className="text-xs text-gray-500">
          Press <kbd>N</kbd> to focus new task
        </div>
      </div>
    </div>
  );
}