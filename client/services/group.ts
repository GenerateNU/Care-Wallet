import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { GroupRole } from '../types/group';
import { api_url } from './api-links';

const getUserGroup = async (userId: string): Promise<number> => {
  const { data } = await axios.get(`${api_url}/group/member/${userId}`);
  return data;
};

const getGroupRoles = async (groupId: number): Promise<GroupRole[]> => {
  const { data } = await axios.get(`${api_url}/group/${groupId}/roles`);
  return data;
};

export const useUserGroup = (userId: string) => {
  const { data: groupId, isLoading: groupIdIsLoading } = useQuery({
    queryKey: ['groupId', userId],
    queryFn: () => getUserGroup(userId),
    refetchInterval: 10000
  });

  return { groupId, groupIdIsLoading };
};

export const useGroup = (groupId: number) => {
  const { data: roles, isLoading: rolesAreLoading } = useQuery({
    queryKey: ['roles', groupId],
    queryFn: () => getGroupRoles(groupId),
    refetchInterval: 10000
  });

  return { roles, rolesAreLoading };
};
