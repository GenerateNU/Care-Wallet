import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { User } from '../types/user';
import { api_url } from './api-links';

const getUser = async (userId: string): Promise<User> => {
  const { data } = await axios.get(`${api_url}/user/${userId}`);
  return data;
};

const getUsers = async (userIds: string[]): Promise<User[]> => {
  const { data } = await axios.get(`${api_url}/user`, {
    params: { userIDs: userIds.join(',') }
  });

  return data;
};

const updateUser = async (user: User): Promise<User> => {
  const { data } = await axios.put(`${api_url}/user/${user.user_id}`, user);
  return data;
};

const addUser = async (user: User): Promise<User> => {
  const { data } = await axios.post(`${api_url}/user/${user.user_id}`, user);
  return data;
};

export const useUser = (userId: string) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading: userIsLoading } = useQuery<User>({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    refetchInterval: 10000
  });

  const { mutate: updateUserMutation } = useMutation({
    mutationFn: (user: User) => updateUser(user),
    onSuccess: (data) => {
      queryClient.setQueryData(['user', userId], data);
    }
  });

  const { mutate: addUserMutation } = useMutation({
    mutationFn: (user: User) => addUser(user),
    onSuccess: (data) => {
      queryClient.setQueryData(['user', userId], data);
    }
  });

  return { user, userIsLoading, updateUserMutation, addUserMutation };
};

export const useUsers = (userIds: string[]) => {
  const { data: users, isLoading: usersAreLoading } = useQuery<User[]>({
    queryKey: ['users', userIds],
    queryFn: () => getUsers(userIds),
    enabled: userIds.length > 0
  });

  return { users, usersAreLoading };
};
