import {useTasks} from "@/contexts/useTask";
import {Task} from "@/lib/types/Task";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import TaskStatusBadge from "@/components/dashboard/task-status-badge";
import TaskCard from "@/components/dashboard/task-card";


export default function TaskList({type}: { type?: string }) {
    const {tasks, assignedTasks} = useTasks()

    const allTask = tasks.filter((task) => task.status === 'pending')

    const getTaskType = (type: string): Task[] => {
        switch (type) {
            case 'pending':
                return tasks.filter((task) => task.status === 'pending')
            case 'completed':
                return tasks.filter((task) => task.status === 'completed')
            case 'assigned':
                return assignedTasks
            case 'in_progress':
                return tasks.filter((task) => task.status === 'in_progress')
            default:
                return tasks
        }
    }

    return (
        <>
            {getTaskType(type as string).map((task: Task) => (
                <div key={task.id} className='py-2 px-2'>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <div className='flex py-2 gap-4 justify-center items-center max-w-80'>
                                    <p className='truncate text-sm lg:text-md'>
                                        {task.title}
                                    </p>
                                    <TaskStatusBadge status={task.status as string}/>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <TaskCard task={task}/>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            ))}
        </>
    )
}