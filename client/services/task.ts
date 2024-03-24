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
    queryKey: ['filteredTaskList', queryParams],
    queryFn: () => getFilteredTasks(queryParams),
    refetchInterval: 20000
  });
  return {
    tasks,
    tasksIsLoading
  };
};

export const useTaskById = (id: string) => {
  const { data: task, isLoading: taskIsLoading } = useQuery<Task>({
    queryKey: ['task', id],
    queryFn: () => getTask(id),
    refetchInterval: 20000
  });

  const { data: taskLabels, isLoading: taskLabelsIsLoading } = useQuery<
    TaskLabel[]
  >({
    queryKey: ['taskLabels', id],
    queryFn: () => getTaskLabels(id),
    refetchInterval: 20000
  });

  const { data: taskByUser, isLoading: taskByUserIsLoading } = useQuery<Task[]>(
    {
      queryKey: ['tasks', id],
      queryFn: () => getTaskByAssigned(id),
      refetchInterval: 20000
    }
  );

  return {
    task,
    taskIsLoading,
    taskLabels,
    taskLabelsIsLoading,
    taskByUser,
    taskByUserIsLoading
  };
};
