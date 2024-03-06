"use client";

import axios from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import { Task } from "@/lib/types/Task";
import { useAuth } from "@/hooks/auth";

export const useTask = () => {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth({
    middleware: "auth",
  });

  const csrf = async () => {
    await axios.get("/sanctum/csrf-cookie");
  };
  const fetchTasks = async (): Promise<Task[]> => {
    await csrf();
    try {
      const response = await axios.get(`/api/v1/users/${user?.id}/tasks`);
      return response.data?.data;
    } catch (error) {
      // @ts-ignore
      throw error;
    }
  };

  const createTask = async ({ ...props }: Task) => {
    await csrf();

    try {
      await axios.post("/tasks", props);
    } catch (error) {
      // if (error.response && error.response.status === 422) {
      //     setErrors(error.response.data.errors);
      // } else {
      throw error;
      // }
    }
  };

  const updateTask = async ({ ...props }: Task) => {
    await csrf();

    try {
      const res = await axios.put(`/tasks/${props.id}`, props);
      return res.data;
    } catch (error) {
      // if (error.response && error.response.status === 422) {
      //     setErrors(error.response.data.errors);
      // } else {
      //     throw error;
      // }
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    await csrf();

    try {
      await axios.delete(`/task/${id}`);
    } catch (error) {
      // if (error.response && error.response.status === 422) {
      //     // Handle error as needed
      // } else {
      //     throw error;
      // }
      throw error;
    }
  };

  const getTask = async (id: string) => {
    await csrf();

    try {
      const response = await axios.get(`/task/${id}`);
      return response.data;
    } catch (error) {
      // @ts-ignore
      throw error;
    }
  };

  return { createTask, updateTask, deleteTask, fetchTasks };
};
