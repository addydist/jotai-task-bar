import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Make sure you have Tailwind CSS imported here

// Performance monitoring (optional)
const measurePerformance = (name, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
  return result;
};

// Error boundary for better error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Task Dashboard Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The task dashboard encountered an unexpected error.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Reload Page
            </button>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 p-4 bg-gray-800 text-green-400 text-xs rounded overflow-auto">
                  {this.state.error?.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Initialize the app
const initializeApp = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  
  // Check for browser compatibility
  const isModernBrowser = () => {
    return (
      typeof window !== 'undefined' &&
      'localStorage' in window &&
      'Promise' in window &&
      'fetch' in window
    );
  };
  
  if (!isModernBrowser()) {
    root.render(
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Browser Not Supported
          </h1>
          <p className="text-gray-600 mb-4">
            This application requires a modern browser with support for localStorage, 
            Promises, and the Fetch API.
          </p>
          <p className="text-sm text-gray-500">
            Please update your browser or try using Chrome, Firefox, Safari, or Edge.
          </p>
        </div>
      </div>
    );
    return;
  }
  
  // Render the app with error boundary
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
  
  // Register service worker for PWA (optional)
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

// Performance measurement
measurePerformance('App Initialization', initializeApp);

// Hot module replacement for development
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', () => {
    console.log('Hot reloading App component...');
    initializeApp();
  });
}

// Log app info in development
if (process.env.NODE_ENV === 'development') {
  console.log('🚀 Task Dashboard started in development mode');
  console.log('📊 Jotai atoms are being tracked in React DevTools');
  console.log('🎨 Tailwind CSS classes are available');
  console.log('⌨️  Keyboard shortcuts: N (new task), T (toggle theme)');
}