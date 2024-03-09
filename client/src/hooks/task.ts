"use client";

import axios from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import {CreateTask, Task} from "@/lib/types/Task";
import { useAuth } from "@/hooks/auth";
import {AxiosResponse} from "axios";

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
      return response.data?.tasks;
    } catch (error) {
      // @ts-ignore
      throw error;
    }
  };

  const fetchAssignedTasks = async (): Promise<Task[]> => {
    await csrf();
    try {
      const response = await axios.get(`/api/v1/users/${user?.id}/assigned`);
      return response.data?.tasks;
    } catch (error) {
      // @ts-ignore
      throw error;
    }
  }

  const createTask = async ({ setErrors, ...props }: CreateTask) => {
    await csrf();
    try {
      const res = await axios.post(`/api/v1/users/${user?.id}/tasks`, props);
        return res.data.data;
    } catch (error: AxiosResponse | any) {
      console.log(error)
      if (error?.response && error?.response?.status === 422) {
          setErrors(error.response.data.errors);
      } else {
      throw error;
      }
    }
  };

  const updateTask = async ({ setErrors, ...props }: CreateTask) => {
    await csrf();

    try {
      const res = await axios.patch(`/api/v1/tasks/${props.id}`, props);
      return res.data;
    } catch (error: AxiosResponse | any) {
      if (error?.response && error?.response?.status === 422) {
          setErrors(error.response.data.errors);
      } else {
      throw error;
      }
    }
  };

  const deleteTask = async (id: string) => {
    await csrf();

    try {
      await axios.delete(`/api/v1/tasks/${id}`);
    } catch (error: AxiosResponse | any) {
      if (error?.response && error?.response?.status === 422) {
          return error.response.data.errors;
      } else {
      throw error;
      }
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

  const assignTask = async (id: string, email: string) => {
    await csrf();

    try {
      const response = await axios.patch(`/api/v1/tasks/${id}/assign`, { email });
      return response.data;
    } catch (error) {
      // @ts-ignore
      throw error;
    }
  }

  return { createTask, updateTask, deleteTask, fetchTasks, fetchAssignedTasks, assignTask, getTask};
};
