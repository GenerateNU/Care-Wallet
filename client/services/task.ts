import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { TaskLabel } from '../types/label';
import { Task } from '../types/task';
import { api_url } from './api-links';

type TaskQueryParams = {
  taskID?: string;
  groupID?: string;
  createdBy?: string;
  taskStatus?: string;
  taskType?: string;
  startDate?: string;
  endDate?: string;
};

const getFilteredTasks = async (
  queryParams: TaskQueryParams
): Promise<Task[]> => {
  const { data } = await axios.get(`${api_url}/tasks/filtered?`, {
    params: queryParams
  });
  return data;
};

export const getTaskLabels = async (taskID: string): Promise<TaskLabel[]> => {
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

export const getTaskLabel = async (tid: string): Promise<TaskLabel> => {
  const response = await axios.post(`${api_url}/tasks/${tid}/labels`, {});
  return response.data;
};

export const getTaskId = async (tid: string): Promise<Task> => {
  const response = await axios.post(`${api_url}/tasks/${tid}`, {});
  return response.data;
};

export const getTaskType = async (tid: string) => {
  const response = await axios.post(`${api_url}/tasks/${tid}`, {});
  return response.data.task_type;
};
