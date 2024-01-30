import axios from 'axios';
import { api_url } from './api-links';
import { Medication } from '../types/medication';

export const getAllMedications = async (): Promise<Medication[]> => {
  const response = await axios.get(`${api_url}/medications`);
  return response.data;
};
