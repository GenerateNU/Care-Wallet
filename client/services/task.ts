import axios from 'axios';

import { Task } from '../types/task';
import { TaskLabel } from '../types/taskLabel';
import { api_url } from './api-links';

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
