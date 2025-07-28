import React from 'react';
import { useAtomValue } from 'jotai';
import { themeAtom } from '../../atoms';

export default function StatCard({ icon, label, value, color = 'default' }) {
  const theme = useAtomValue(themeAtom);
  
  const colorClasses = {
    default: theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900',
    blue: theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-50 text-blue-900',
    green: theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-50 text-green-900',
    red: theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-50 text-red-900',
    yellow: theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-50 text-yellow-900'
  };
  
  return (
    <div className={`p-4 rounded-lg transition-colors ${colorClasses[color]}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <span className="text-sm font-medium truncate">{label}</span>
      </div>
      <div className="text-2xl font-bold">
        {value}
      </div>
    </div>
  );
}