"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTasks } from "@/contexts/useTask";
import { useTask } from "@/hooks/task";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {useToast} from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

interface AssignTaskFormProps {
  close: (open: boolean) => void;
  open: boolean;
  taskId: string | undefined;
}

export default function AssignTaskForm({
  close,
  taskId,
}: AssignTaskFormProps): React.ReactNode {
  const { assignTask } = useTask();
  const { refetchTasks } = useTasks();
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
    const res = await assignTask(taskId as string, values.email);
    toast({
      // title: 'Task assigned to user.',
      description: 'Task assigned successfully.'
    })
    refetchTasks();
    close(false);
    } catch (e) {
      toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Not a valid email. Enter a valid email.",
        })
    close(false);
      // console.log(e)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-7xl"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem style={{ margin: 0 }}>
              <FormLabel>User email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>
                Please enter the email of the user.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className={"flex justify-between gap-2 py-2"}>
          <Button
            className="w-full"
            type="button"
            variant={"outline"}
            size={"sm"}
            onClick={() => close(false)}
          >
            Cancel
          </Button>
          <Button className="w-full" size={"sm"}>
            Assign
          </Button>
        </div>
      </form>
    </Form>
  );
}
