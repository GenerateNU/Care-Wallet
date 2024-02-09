import axios, { HttpStatusCode } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Medication } from '../types/medication';
import { api_url } from './api-links';

const getAllMedications = async (): Promise<Medication[]> => {
  await new Promise((r) => setTimeout(r, 2000)); // this is just to show is loading (DONT ADD ANYWHERE ELSE)
  const { data } = await axios.get(`${api_url}/medications`);
  return data;
};

const addMedication = async (med: Medication): Promise<number> => {
  const { status } = await axios.post(`${api_url}/medications`, {
    medication_id: med.medication_id,
    medication_name: med.medication_name
  });

  return status;
};

export const useMedication = () => {
  const queryClient = useQueryClient();

  const {
    data: medications,
    isLoading: medicationsIsLoading,
    isError: medicationsIsError,
    refetch: medicationsRefetch
  } = useQuery<Medication[], Error>({
    queryKey: ['medList'], // if querying with a value add values here ex. ['medList', {id}]
    queryFn: getAllMedications,
    refetchInterval: 20000 // Will refetch the data every 20 seconds
  });

  const { mutate: addMedicationMutation } = useMutation({
    mutationFn: (med: Medication) => addMedication(med),
    onSuccess: (status) => {
      if (status === HttpStatusCode.Ok) {
        queryClient.invalidateQueries({
          queryKey: ['medList'] // mark medlist as stale so it refetches
        });
        return;
      }

      console.log('Failed to Add Medication...');
    },
    onError: (error) => {
      console.log('Server Error: ', error.message);
    }
  });

  return {
    medications,
    medicationsIsLoading,
    medicationsIsError,
    medicationsRefetch,
    addMedicationMutation
  };
};
