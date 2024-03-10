import {User} from "@/lib/types/User";

export interface Task {
    id?: string;
    title: string;
    description: string;
    status?: 'pending' | 'completed' | 'in_progress';
    user?: User;
    createdAt?: string;
    updatedAt?: string;
    dueDate?: string | Date | undefined;
    due_date?: string | Date | undefined;
    priority?: 'low' | 'mid' | 'high';
    assignedBy?: User;
    assignedTo?: User;
}

export interface CreateTask extends Task {
    setErrors: (errors: string[]) => void;
}