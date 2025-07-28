import React, { useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { BarChart3, CheckCircle, Circle, Settings, Moon, Sun } from 'lucide-react';
import { statsAtom, themeAtom } from '../../atoms';
import StatCard from '../common/StatCard';
import Button from '../common/Button';
import SettingsModal from './Setting';

export default function Header() {
  const stats = useAtomValue(statsAtom);
  const [theme, setTheme] = useAtom(themeAtom);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <>
    <header className={`p-6 border-b ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      {/* Header Top */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Task Dashboard
          </h1>
          <p className={`text-sm mt-1 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Manage your tasks efficiently with Jotai state management
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            icon={<Settings size={18} />}
            onClick={() => setIsSettingsOpen(true)}
          >
            Settings
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            icon={theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            onClick={toggleTheme}
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </Button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<BarChart3 size={20} />}
          label="Total Tasks" 
          value={stats.total}
          color="blue"
        />
        <StatCard 
          icon={<CheckCircle size={20} />}
          label="Completed" 
          value={stats.completed}
          color="green"
        />
        <StatCard 
          icon={<Circle size={20} />}
          label="Pending" 
          value={stats.pending}
          color="yellow"
        />
        <StatCard 
          icon={<BarChart3 size={20} />}
          label="Completion Rate" 
          value={`${stats.completionRate}%`}
          color="default"
        />
      </div>
      
      {/* Priority Breakdown */}
      {stats.total > 0 && (
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-6 text-sm">
        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          Priority Breakdown:
        </span>
        <div className="flex items-center gap-4">
          <span className={`flex items-center gap-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            High: {stats.priorityStats.high}
          </span>
          <span className={`flex items-center gap-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            Medium: {stats.priorityStats.medium}
          </span>
          <span className={`flex items-center gap-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            Low: {stats.priorityStats.low}
          </span>
        </div>
      </div>
    </div>
      )}
       <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </header>
    </>
  );
}