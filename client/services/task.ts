import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Import your Router component
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

const addNewTask = async (newTask: Task): Promise<Task> => {
  const response = await axios.post(`${api_url}/tasks`, newTask);
  return response.data;
};

export const useTask = (userIDs: string[]) => {
  const queryClient = useQueryClient();

  const { data: tasks, isLoading: tasksIsLoading } = useQuery<Task[]>({
    queryKey: ['taskList'],
    queryFn: () => getTasksByUsers(userIDs),
    refetchInterval: 20000
  });

  const { mutate: addTaskMutation } = useMutation({
    mutationFn: (newTask: Task) => addNewTask(newTask),
    onMutate: async (newTask) => {
      await queryClient.cancelQueries(['taskList']);
      const previousTasks = queryClient.getQueryData(['taskList']);
      queryClient.setQueryData(['taskList'], (old: Task[]) => [
        ...old,
        newTask
      ]);
      return { previousTasks };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['taskList']);
      return;
    },
    onError: (err, newTask, context) => {
      console.error('ERROR: Failed to Add Task. Code:', err);
      queryClient.setQueryData(['taskList'], context?.previousTasks);
    }
  });

  return {
    tasks,
    tasksIsLoading,
    userHasTasks,
    addTaskMutation
  };
};
