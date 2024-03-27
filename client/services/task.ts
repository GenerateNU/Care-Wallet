import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { TaskLabel } from '../types/label';
import { Task } from '../types/task';
import { api_url } from './api-links';

type TaskQueryParams = {
  taskID?: string;
  groupID?: number;
  createdBy?: string;
  taskStatus?: string;
  taskType?: string;
  startDate?: string;
  endDate?: string;
  quickTask?: boolean;
};

const getTask = async (taskID: string): Promise<Task> => {
  const { data } = await axios.get(`${api_url}/tasks/${taskID}`);
  return data;
};

const getTaskByAssigned = async (userId: string): Promise<Task[]> => {
  const { data } = await axios.get(
    `${api_url}/tasks/assigned?userIDs=${userId}`
  );

  return data;
};

const getFilteredTasks = async (
  queryParams: TaskQueryParams
): Promise<Task[]> => {
  if (!queryParams.groupID) [];
  const { data } = await axios.get(`${api_url}/tasks/filtered`, {
    params: queryParams
  });

  return data;
};

const getTaskLabels = async (taskID: string): Promise<TaskLabel[]> => {
  const { data } = await axios.get(`${api_url}/tasks/${taskID}/labels`);
  return data;
};

export const useFilteredTasks = (queryParams: TaskQueryParams) => {
  const { data: tasks, isLoading: tasksIsLoading } = useQuery<Task[]>({
    queryKey: ['filteredTaskList'],
    queryFn: () => getFilteredTasks(queryParams),
    refetchInterval: 20000
  });
  return {
    tasks,
    tasksIsLoading
  };
};

export const useTaskByAssigned = (userId: string) => {
  const { data: taskByUser, isLoading: taskByUserIsLoading } = useQuery<Task[]>(
    {
      queryKey: ['tasks', userId],
      queryFn: () => getTaskByAssigned(userId)
    }
  );

  return { taskByUser, taskByUserIsLoading };
};

export const useTaskById = (taskId: string) => {
  const { data: task, isLoading: taskIsLoading } = useQuery<Task>({
    queryKey: ['task', taskId],
    queryFn: () => getTask(taskId)
  });

  const { data: taskLabels, isLoading: taskLabelsIsLoading } = useQuery<
    TaskLabel[]
  >({
    queryKey: ['taskLabels', taskId],
    queryFn: () => getTaskLabels(taskId)
  });

  return {
    task,
    taskIsLoading,
    taskLabels,
    taskLabelsIsLoading
  };
};
