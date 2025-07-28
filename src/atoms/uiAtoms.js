import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Filter state for task list
export const filterAtom = atom('all'); // 'all', 'completed', 'pending'

// Theme state - persisted in localStorage
export const themeAtom = atomWithStorage('theme', 'light');

// UI control atoms
export const sidebarOpenAtom = atom(false);
export const modalOpenAtom = atom(false);
export const loadingAtom = atom(false);

// Search functionality
export const searchTermAtom = atom('');

// Sort options
export const sortByAtom = atom('createdAt'); // 'createdAt', 'priority', 'title'
export const sortOrderAtom = atom('desc'); // 'asc', 'desc'

// View mode
export const viewModeAtom = atom('list'); // 'list', 'grid', 'compact'

// Settings
export const settingsAtom = atomWithStorage('settings', {
  showCompletedTasks: true,
  autoSave: true,
  notifications: true,
  compactMode: false
});