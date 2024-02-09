import axios, { HttpStatusCode } from 'axios';
import { Medication } from '../types/medication';
import { api_url } from './api-links';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const getAllMedications = async (): Promise<Medication[]> => {
  await new Promise((r) => setTimeout(r, 2000)); // this is just to show is loading (DONT ADD ANYWHERE ELSE)
  return (await axios.get(`${api_url}/medications`)).data;
};

const addMedication = async (med: Medication) => {
  return await axios.post(`${api_url}/medications`, {
    medication_id: med.medication_id,
    medication_name: med.medication_name
  });
};

export default function useMedication() {
  const queryClient = useQueryClient();

  const {
    data: medications,
    isLoading: medicationsIsLoading,
    isError: medicationsIsError,
    refetch: medicationsRefetch
  } = useQuery<Medication[], Error>({
    queryKey: ['medList'], // if querying with a value add values here ex. ['medList', {id}]
    queryFn: getAllMedications,
    staleTime: 20000, // marks the data as obsolete or stale
    refetchInterval: 20000 // Will refetch the data every 20 seconds
  });

  const { mutate: addMedicationMutation } = useMutation({
    mutationFn: (med: Medication) => addMedication(med),
    onSuccess: (response) => {
      if (response && response.status === HttpStatusCode.Ok) {
        queryClient.invalidateQueries({
          queryKey: ['medList'] // mark medlist as stale so it refetches
        });
        return;
      }
      console.log('Failed to Add Medication...');
    },
    onError: () => {
      console.log('Failed to Add Medication...');
    }
  });

  return {
    medications,
    medicationsIsLoading,
    medicationsIsError,
    medicationsRefetch,
    addMedicationMutation
  };
}
