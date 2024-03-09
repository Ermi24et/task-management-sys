export interface Task {
    id?: string;
    title: string;
    description: string;
    status?: 'pending' | 'completed' | 'in_progress';
    user?: string;
    createdAt?: string;
    updatedAt?: string;
    dueDate?: string | Date | undefined;
    due_date?: string | Date | undefined;
    priority?: 'low' | 'mid' | 'high';
    assignedBy?: string;
    assignedTo?: string;
}

export interface CreateTask extends Task {
    setErrors: (errors: string[]) => void;
}