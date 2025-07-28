import React from 'react';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import { Plus } from 'lucide-react';
import { newTaskAtom, priorityAtom, addTaskAtom, themeAtom } from '../../atoms';
import Button from '../common/Button';

export default function TaskForm() {
  const [newTask, setNewTask] = useAtom(newTaskAtom);
  const [priority, setPriority] = useAtom(priorityAtom);
  const addTask = useSetAtom(addTaskAtom);
  const theme = useAtomValue(themeAtom);
  
  const handleSubmit = () => {
    addTask(newTask);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  return (
    <div className={`p-6 border-b ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Task Input */}
        <div className="flex-1">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What needs to be done?"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>
        
        {/* Priority Select */}
        <div className="sm:w-48">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="low">🟢 Low Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="high">🔴 High Priority</option>
          </select>
        </div>
        
        {/* Add Button */}
        <Button
          onClick={handleSubmit}
          disabled={!newTask.trim()}
          icon={<Plus size={20} />}
          size="lg"
        >
          Add Task
        </Button>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setNewTask('Review project documentation')}
          className={`px-3 py-1 text-xs rounded-full transition-colors ${
            theme === 'dark'
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          📚 Review docs
        </button>
        <button
          onClick={() => setNewTask('Schedule team meeting')}
          className={`px-3 py-1 text-xs rounded-full transition-colors ${
            theme === 'dark'
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          👥 Team meeting
        </button>
        <button
          onClick={() => setNewTask('Update project status')}
          className={`px-3 py-1 text-xs rounded-full transition-colors ${
            theme === 'dark'
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          📊 Status update
        </button>
      </div>
    </div>
  );
}