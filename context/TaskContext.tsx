import React, { createContext, useContext } from 'react';
import { useTasks } from '../hooks/useTasks';

type TaskContextType = ReturnType<typeof useTasks>;

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const taskState = useTasks();
    return <TaskContext.Provider value={taskState}>{children}</TaskContext.Provider>;
}

export function useTaskContext(): TaskContextType {
    const ctx = useContext(TaskContext);
    if (!ctx) throw new Error('useTaskContext must be inside <TaskProvider>');
    return ctx;
}
