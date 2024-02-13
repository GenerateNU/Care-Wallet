import axios from 'axios';

import { api_url } from './api-links';

// Create a care group
export const createCareGroup = async (groupName: string): Promise<number> => {
  try {
    const response = await axios.post(
      `${api_url}/care-groups/${groupName}`,
      {}
    );
    console.log('response:', response);
    return response.data;
  } catch (error) {
    console.error('Error creating care group:', error);
    throw error;
  }
};

// Add a user to a care group
export const addUserToCareGroup = async (
  userId: string,
  groupId: string,
  role: string
): Promise<number> => {
  try {
    const response = await axios.post(
      `${api_url}/care-groups/addUser/${userId}/${groupId}/${role}`,
      {}
    );
    console.log('response:', response);
    return response.data;
  } catch (error) {
    console.error('Error creating care group:', error);
    throw error;
  }
};

// Get all members of a care group
export const getGroupMembers = async (groupId: string): Promise<string[]> => {
  const response = await axios.get(
    `${api_url}/care-groups/get-members/${groupId}`
  );
  return response.data;
};
