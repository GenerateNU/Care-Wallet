import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Task } from '../types/task';
import { TypeOfTask } from '../types/type';
import { api_url } from './api-links';

export const getTaskLabel = async (
  taskID: string | undefined
): Promise<string> => {
  const { data } = await axios.get(`${api_url}/tasks/${taskID}/labels`);
  return data.label_name;
};

export const getTask = async (taskID: string): Promise<Task> => {
  const { data } = await axios.get(`${api_url}/tasks/${taskID}`);
  return data;
};

export const useGetTaskLabel = (taskId: string | undefined): string => {
  const { data: label } = useQuery({
    queryKey: ['taskId', taskId],
    queryFn: () => getTaskLabel(taskId)
  });
  return label ?? ''; // Empty string if no label found
};

// Helper Function to get Task Type by ID using getTaskId
export const getTaskType = async (tid: string): Promise<TypeOfTask> => {
  try {
    const task = await getTask(tid);
    return task.task_type;
  } catch (error) {
    console.error('Error fetching task type:', error);
    throw error;
  }
};
