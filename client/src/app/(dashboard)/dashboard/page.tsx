'use client'
import {useTasks} from "@/contexts/useTask";
import TaskStateCard from "@/components/dashboard/task-state-card";
import React, {useState} from "react";
import FilterMenu from "@/components/dashboard/task-filter";
import TaskList from "@/components/dashboard/task-list";
import {Button} from "@/components/ui/button";
import { FaPlusCircle} from "react-icons/fa";
import CreateTask from "@/components/dashboard/modals/create-task";
import {useAuth} from "@/hooks/auth";

export default function Page(): React.ReactNode {
    const {tasks, assignedTasks} = useTasks()
    const { user } = useAuth()
    const [status, setStatus] = useState<string>('All')
    const [open, setOpen] = useState(false)

    const handleStatus = (status: string) => {
        setStatus(status)
    }

    const handleCreateModal = () => {
        setOpen(!open)
    }

    if (!user) return null

    return (
        <div className='lg:container px-2 py-10 w-full'>
            <div className='flex justify-between items-center py-5'>
                <h1 className='text-2xl font-bold'>
                    Tasks
                </h1>
                <Button variant='default' size='sm' onClick={handleCreateModal}>
                    <FaPlusCircle className={'mr-2'}/>
                    Create Task
                </Button>
            </div>
            {tasks && (
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:flex-row'>
                    <TaskStateCard state='All'/>
                    <TaskStateCard state='in_progress'/>
                    <TaskStateCard state='Pending'/>
                    <TaskStateCard state='Completed'/>
                    <div className='col-span-2 lg:col-span-2'>
                        <TaskStateCard assigned={assignedTasks} state='Assigned'/>
                    </div>
                </div>
            )}
            <div className={'py-10'}>
                <FilterMenu cb={handleStatus}/>
                {!!tasks && (
                    <TaskList type={status}/>
                )}
            </div>
            <CreateTask open={open} setOpen={handleCreateModal} />
        </div>
    )
}
