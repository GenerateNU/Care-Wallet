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

export const getTask = async (taskID: string): Promise<Task> => {
  const { data } = await axios.get(`${api_url}/tasks/${taskID}`);
  return data;
};

const getFilteredTasks = async (
  queryParams: TaskQueryParams
): Promise<Task[]> => {
  const { data } = await axios.get(`${api_url}/tasks/filtered`, {
    params: queryParams
  });

  console.log('filtered tasks', data);
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
    refetchInterval: 10000
  });
  return {
    tasks,
    tasksIsLoading
  };
};

export const useTaskLabels = (taskID: string) => {
  const { data: taskLabels, isLoading: taskLabelsIsLoading } = useQuery<
    TaskLabel[]
  >({
    queryKey: ['taskLabels', taskID],
    queryFn: () => getTaskLabels(taskID),
    refetchInterval: 10000
  });
  return {
    taskLabels,
    taskLabelsIsLoading
  };
};
