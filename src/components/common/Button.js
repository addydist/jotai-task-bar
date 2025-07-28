import React from 'react';
import { useAtomValue } from 'jotai';
import { themeAtom } from '../../atoms';

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  icon,
  className = ''
}) {
  const theme = useAtomValue(themeAtom);
  
  const baseClasses = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary: theme === 'dark' 
      ? "bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-gray-500"
      : "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
    outline: theme === 'dark'
      ? "border border-gray-600 text-gray-300 hover:bg-gray-700 focus:ring-gray-500"
      : "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    ghost: theme === 'dark'
      ? "text-gray-300 hover:bg-gray-700 focus:ring-gray-500"
      : "text-gray-700 hover:bg-gray-100 focus:ring-gray-500"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}