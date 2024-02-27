import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

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

  const { data: medications, isLoading: medicationsIsLoading } = useQuery<
    Medication[]
  >({
    queryKey: ['medList'], // if querying with a value add values here ex. ['medList', {id}]
    queryFn: getAllMedications
  });

  const { mutate: addMedicationMutation } = useMutation({
    mutationFn: (med: Medication) => addMedication(med),
    //Optimistically update the medlist so it looks like the mutation has been completed
    onMutate: async (newMed) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite the optimistic update)
      await queryClient.cancelQueries({
        queryKey: ['medList', newMed.medication_id]
      });

      // Snapshot the previous value
      const previousMedication = queryClient.getQueryData(['medList']);

      // Optimistically update to the new value
      queryClient.setQueryData(['medList'], (old: Medication[]) => [
        ...old,
        newMed
      ]);

      // Return a context with the previous and new todo
      return { previousMedication };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['medList'] // mark medlist as stale so it refetches
      });
      return;
    },
    // If the mutation fails, use the context we returned above to return to the previous state
    onError: (err, newMed, context) => {
      console.log('ERROR: Failed to Add Medication...');
      queryClient.setQueryData(['medList'], context?.previousMedication);
    }
  });

  return {
    medications,
    medicationsIsLoading,
    addMedicationMutation
  };
};
