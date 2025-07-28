import React from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Filter, Search, SortAsc, SortDesc, Grid, List, MoreHorizontal } from 'lucide-react';
import { 
  filterAtom, 
  searchTermAtom, 
  sortByAtom, 
  sortOrderAtom, 
  viewModeAtom,
  themeAtom,
  clearCompletedTasksAtom 
} from '../../atoms';
import Button from '../common/Button';

export default function TaskFilters() {
  const [filter, setFilter] = useAtom(filterAtom);
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  const [viewMode, setViewMode] = useAtom(viewModeAtom);
  const theme = useAtomValue(themeAtom);
  const clearCompleted = useSetAtom(clearCompletedTasksAtom);
  
  const filters = [
    { key: 'all', label: 'All Tasks', count: '∞' },
    { key: 'pending', label: 'Pending', count: '○' },
    { key: 'completed', label: 'Completed', count: '✓' }
  ];
  
  const sortOptions = [
    { key: 'createdAt', label: 'Date Created' },
    { key: 'title', label: 'Title' },
    { key: 'priority', label: 'Priority' }
  ];
  
  return (
    <div className={`p-4 border-b space-y-4 ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      {/* Main Filter Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search 
            size={18} 
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`} 
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tasks..."
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>
        
        {/* Filter Buttons */}
        <div className="flex items-center gap-2">
          <Filter size={18} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
          <div className="flex gap-1">
            {filters.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${
                  filter === key
                    ? 'bg-blue-500 text-white'
                    : theme === 'dark'
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{count}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Secondary Controls Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        
        {/* Sort Controls */}
        <div className="flex items-center gap-3">
          <span className={`text-sm font-medium ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Sort by:
          </span>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            {sortOptions.map(({ key, label }) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className={`p-1.5 rounded-md transition-colors ${
              theme === 'dark'
                ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
            title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          >
            {sortOrder === 'asc' ? <SortAsc size={18} /> : <SortDesc size={18} />}
          </button>
        </div>
        
        {/* View and Action Controls */}
        <div className="flex items-center gap-2">
          
          {/* View Mode Toggle */}
          <div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-500 text-white'
                  : theme === 'dark'
                  ? 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
              title="List View"
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-500 text-white'
                  : theme === 'dark'
                  ? 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
              title="Grid View"
            >
              <Grid size={16} />
            </button>
          </div>
          
          {/* Quick Actions */}
          <Button
            variant="outline"
            size="sm"
            onClick={clearCompleted}
          >
            Clear Completed
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            icon={<MoreHorizontal size={16} />}
          >
            More
          </Button>
        </div>
      </div>
      
      {/* Active Filters Display */}
      {(searchTerm || filter !== 'all') && (
        <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          <span className={`text-xs font-medium ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Active filters:
          </span>
          
          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
              Search: "{searchTerm}"
              <button
                onClick={() => setSearchTerm('')}
                className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5"
              >
                ×
              </button>
            </span>
          )}
          
          {filter !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
              Filter: {filter}
              <button
                onClick={() => setFilter('all')}
                className="ml-1 hover:bg-green-200 dark:hover:bg-green-800 rounded-full p-0.5"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}