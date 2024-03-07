"use client";

import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext, useEffect,
    useMemo,
    useState,
} from 'react';

  import { Task } from '@/lib/types/Task'
import useSWR, { mutate } from "swr";
import { useTask} from "@/hooks/task";
import { useAuth} from "@/hooks/auth";



  interface TaskProps{
    tasks: Task[];
    setTasks: Dispatch<SetStateAction<Task[]>>;
    assignedTasks: Task[];
    setAssignedTasks: Dispatch<SetStateAction<Task[]>>;
    refetchTasks: () => void;
  }

  interface TaskProviderProps {
    children: ReactNode;
  }

  const TaskContext = createContext<TaskProps | undefined>(undefined);

  export function TaskProvider({ children }: TaskProviderProps) {
    const [tasks, setTasks] = useState<Task[]>([] as Task[]);
    const [assignedTasks, setAssignedTasks] = useState<Task[]>([] as Task[]);

    const { user } = useAuth({ middleware: 'auth' })
    const { fetchTasks, fetchAssignedTasks } = useTask()
    const { data, error } = useSWR<Task[]>(user?.id ? 'allTasks' : null, fetchTasks)
    const { data: assigned } = useSWR<Task[]>(user?.id ? 'assignedTasks' : null, fetchAssignedTasks)
    const refetchTasks = () => {
        mutate('allTasks')
        mutate('assignedTasks')
    }

    useEffect(() => {
        if (data) {
            setTasks(data)
        }

        if (assigned) {
            setAssignedTasks(assigned)
        }
    }, [data, assigned])

    const contextValue = useMemo(() => ({ tasks, setTasks, assignedTasks, setAssignedTasks, refetchTasks }), [tasks, setTasks, assignedTasks, setAssignedTasks])

    return (
      <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
    );
  }

  export const useTasks = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
      throw new Error('useTasks must be within a valid provider');
    }
    return context;
  };
