import { atom } from 'jotai';
import { atomWithStorage, atomWithReset, RESET } from 'jotai/utils';

// Primary task data - persisted in localStorage
export const tasksAtom = atomWithStorage('tasks', []);

// Form state atoms
export const newTaskAtom = atomWithReset('');
export const priorityAtom = atom('medium');

// Write-only atoms for task actions
export const addTaskAtom = atom(null, (get, set, title) => {
  if (title.trim()) {
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      priority: get(priorityAtom) // Get current priority
    };
    set(tasksAtom, prev => [...prev, newTask]);
    set(newTaskAtom, RESET);
  }
});

export const toggleTaskAtom = atom(null, (get, set, taskId) => {
  set(tasksAtom, prev => 
    prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    )
  );
});

export const deleteTaskAtom = atom(null, (get, set, taskId) => {
  set(tasksAtom, prev => prev.filter(task => task.id !== taskId));
});

// Bulk actions
export const clearCompletedTasksAtom = atom(null, (get, set) => {
  set(tasksAtom, prev => prev.filter(task => !task.completed));
});

export const markAllCompletedAtom = atom(null, (get, set) => {
  set(tasksAtom, prev => prev.map(task => ({ ...task, completed: true })));
});
export const editTaskAtom = atom(null, (get, set, { taskId, updates }) => {
  set(tasksAtom, prev =>
    prev.map(task =>
      task.id === taskId
        ? { ...task, ...updates }
        : task
    )
  );
});
