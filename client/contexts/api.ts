import axios from 'axios';

import { api_url } from '../services/api-links';
import { GroupRole } from '../types/group';

export const getUserGroup = async (userId: string): Promise<GroupRole> => {
  const { data } = await axios.get(`${api_url}/group/member/${userId}`);
  return data;
};
