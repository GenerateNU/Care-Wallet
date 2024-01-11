import axios from 'axios';

import config from '../config.json';

export const getAllMedications = async (): Promise<Medication[]> => {
  const response = await axios.get(`${config['api-link']}/medications`);
  return response.data;
};
