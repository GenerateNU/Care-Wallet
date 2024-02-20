import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Task } from '../types/task';
import { api_url } from './api-links';

// Const to indicate if a user has any tasks assigned
// True by default, reassigned to false if grabbing tasks by user returns null
let userHasTasks = true;

const getTasksByUsers = async (userIDs: string[]): Promise<Task[]> => {
  try {
    const response = await axios.get(`${api_url}/tasks/assigned`, {
      params: { userIDs: userIDs }
    });
    const data = response.data;

    // Check if data is null or empty array
    if (data === null || data.length === 0) {
      userHasTasks = false;
      console.log('userIDs: ', userIDs, 'have no tasks assigned');
      // Return indication that there are no tasks assigned
      return []; // Or you can throw an error if necessary
    }

    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export const useTask = (userIDs: string[]) => {
  const { data: tasks, isLoading: tasksIsLoading } = useQuery<Task[]>({
    queryKey: ['taskList'], // if querying with a value add values here ex. ['medList', {id}]
    queryFn: getTasksByUsers(userIDs),
    refetchInterval: 20000 // Will refetch the data every 20 seconds
  });

  return {
    tasks,
    tasksIsLoading,
    userHasTasks
  };
};
