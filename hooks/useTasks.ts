import { useCallback, useEffect, useState } from 'react';
import { loadTasks, saveTasks } from '../lib/storage';
import { FilterType, Task } from '../types/task';

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<FilterType>('All');
    const [isLoaded, setIsLoaded] = useState(false);

    // Load persisted tasks on mount
    useEffect(() => {
        loadTasks().then((persisted) => {
            setTasks(persisted);
            setIsLoaded(true);
        });
    }, []);

    // Persist whenever tasks change (after initial load)
    useEffect(() => {
        if (isLoaded) {
            saveTasks(tasks);
        }
    }, [tasks, isLoaded]);

    const addTask = useCallback((title: string) => {
        const trimmed = title.trim();
        if (!trimmed) return false; // signal validation failure

        const newTask: Task = {
            id: Date.now().toString(),
            title: trimmed,
            completed: false,
            createdAt: Date.now(),
        };

        setTasks((prev) => [newTask, ...prev]);
        return true;
    }, []);

    const toggleTask = useCallback((id: string) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
        );
    }, []);

    const updateTask = useCallback((id: string, title: string) => {
        const trimmed = title.trim();
        if (!trimmed) return false;
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, title: trimmed } : t)),
        );
        return true;
    }, []);

    const deleteTask = useCallback((id: string) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const filteredTasks = tasks.filter((t) => {
        if (filter === 'Active') return !t.completed;
        if (filter === 'Completed') return t.completed;
        return true;
    });

    const counts = {
        all: tasks.length,
        active: tasks.filter((t) => !t.completed).length,
        completed: tasks.filter((t) => t.completed).length,
    };

    return {
        tasks,
        filteredTasks,
        counts,
        filter,
        setFilter,
        isLoaded,
        addTask,
        toggleTask,
        updateTask,
        deleteTask,
    };
}
