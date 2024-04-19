import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { TaskLabel } from '../types/label';
import { api_url } from './api-links';

// This is used to get unique labels used by a group it should not be used for fetching labels for a task or other items
const getLabelsByGroup = async (groupID: number): Promise<TaskLabel[]> => {
  const { data } = await axios.get(`${api_url}/group/${groupID}/labels`);

  const uniques = (data as TaskLabel[]).filter((item, index, self) => {
    return (
      self.findIndex((obj) => obj.label_name === item.label_name) === index
    );
  });

  return uniques;
};

const getLabelsByTasks = async (task_ids: number[]): Promise<TaskLabel[]> => {
  if (task_ids.length === 0) return [];
  const taskIDs = task_ids.map((id) => id);
  const { data } = await axios.get(`${api_url}/tasks/labels/tasks`, {
    params: { taskIDs: taskIDs.join(',') }
  });

  console.log('data: ', data);

  return data;
};

export const useLabelsByGroup = (groupID: number) => {
  const { data: labels, isLoading: labelsIsLoading } = useQuery<TaskLabel[]>({
    queryKey: ['labels', groupID],
    queryFn: () => getLabelsByGroup(groupID)
  });

  return { labels, labelsIsLoading };
};

export const useLabelsByTasks = (task_ids: number[]) => {
  const { data: labels, isLoading: labelsIsLoading } = useQuery<TaskLabel[]>({
    queryKey: ['labels', task_ids],
    queryFn: () => getLabelsByTasks(task_ids),
    enabled: task_ids.length > 0
  });

  return { labels, labelsIsLoading };
};
