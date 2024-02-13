import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Task } from '../types/task';
import { api_url } from './api-links';

const getTasksByGroup = async (groupId: string): Promise<Task[]> => {
  const { data } = await axios.get(`${api_url}/tasks/filtered`, {
    params: { groupID: groupId }
  });
  return data;
};

export const useTask = (groupId: string) => {
  //   const queryClient = useQueryClient();

  const { data: taskList, isLoading: tasksIsLoading } = useQuery<Task[], Error>(
    {
      queryKey: ['taskList'], // if querying with a value add values here ex. ['tasks', {id}]
      queryFn: () => getTasksByGroup(groupId),
      refetchInterval: 20000 // Will refetch the data every 20 seconds
    }
  );

  return {
    taskList,
    tasksIsLoading
  };
};
