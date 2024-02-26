import axios from 'axios';

import { api_url } from './api-links';

// Retrieve task label (just call the route)
export const getTaskLabel = async (tid: string): Promise<string> => {
  try {
    const response = await axios.post(`${api_url}/tasks/${tid}/labels`, {});
    console.log('response:', response);
    return response.data;
  } catch (error) {
    console.error('Error retrieving the task label', error);
    throw error;
  }
};

// Retrieve task id and retrieve the json to retrieve notes, task_type, created_date, and map to category type/task type
export const getTaskId = async (
  tid: string
): Promise<{
  created_date: string;
  task_id: string;
  task_info: string;
  task_type: string;
  notes: string;
}> => {
  try {
    const response = await axios.post(`${api_url}/tasks/${tid}`, {});
    console.log('response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching task id', error);
    throw error;
  }
};

// Assigning users to a task
export const addTaskToUser = async (taskId: string): Promise<string> => {
  try {
    const response = await axios.post(`${api_url}/tasks/${taskId}/assign`, {});
    console.log('response:', response);
    return response.data;
  } catch (error) {
    console.error('Error assigning task:', error);
    throw error;
  }
};
