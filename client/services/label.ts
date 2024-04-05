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

export const useLabelsByGroup = (groupID: number) => {
  const { data: labels, isLoading: labelsIsLoading } = useQuery<TaskLabel[]>({
    queryKey: ['labels', groupID],
    queryFn: () => getLabelsByGroup(groupID)
  });

  return { labels, labelsIsLoading };
};
