import axios from 'axios';
import { api_url } from './api-links';
import { Medication } from '../types/medication';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const getAllMedications = async (): Promise<Medication[]> => {
  await new Promise((r) => setTimeout(r, 2000)); // this is just to show is loading (DONT ADD ANYWHERE ELSE)
  const response = await axios.get(`${api_url}/medications`);
  return response.data;
};

export const addMedication = async (med: Medication) => {
  await axios.post(`${api_url}/medications`, {
    medication_id: med.medication_id,
    medication_name: med.medication_name
  });
};

export function useMedicationQuery() {
  const queryClient = useQueryClient();

  const {
    data: medications,
    isLoading: medicationsIsLoading,
    isError: medicationsIsError
  } = useQuery<Medication[], Error>({
    queryKey: ['medList'], // if querying with a value add values here ex. ['medList', {search}]
    queryFn: getAllMedications,
    staleTime: 5000, // marks the data is obsolete or stale
    refetchInterval: 5000 // Will refetch the data every 5 seconds
  });

  const { mutate: addMedicationMutation } = useMutation({
    mutationFn: (med: Medication) => addMedication(med),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['medList'],
        exact: true,
        refetchType: 'active'
      });
    }
  });

  return {
    medications,
    medicationsIsLoading,
    medicationsIsError,
    addMedicationMutation
  };
}
