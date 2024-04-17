import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { GroupRole } from '../types/group';
import { api_url } from './api-links';

const getUserGroup = async (userId: string): Promise<GroupRole> => {
  const { data } = await axios.get(`${api_url}/group/member/${userId}`);
  return data;
};

const getGroupRoles = async (groupId: number): Promise<GroupRole[]> => {
  const { data } = await axios.get(`${api_url}/group/${groupId}/roles`);
  return data;
};

const addUserToGroup = async (
  userId: string,
  groupId: number,
  role: string
) => {
  const { data } = await axios.post(`${api_url}/group/${groupId}/add`, {
    user_id: userId,
    role
  });

  return data;
};

export const useUserGroup = (userId: string) => {
  const { data: userGroupRole, isLoading: userGroupRoleIsLoading } = useQuery({
    queryKey: ['groupId', userId],
    queryFn: () => getUserGroup(userId)
  });

  return { userGroupRole, userGroupRoleIsLoading };
};

export const useGroup = (groupId: number) => {
  const { data: roles, isLoading: rolesAreLoading } = useQuery({
    queryKey: ['roles', groupId],
    queryFn: () => getGroupRoles(groupId)
  });

  return { roles, rolesAreLoading };
};

export const useGroupMutation = (groupId: number) => {
  const { mutate: addUserToGroupMutation } = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: string }) =>
      addUserToGroup(userId, groupId, role)
  });

  return { addUserToGroupMutation };
};
