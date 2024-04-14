import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { HttpStatusCode } from 'axios';
import { DocumentPickerAsset } from 'expo-document-picker';
import {
  createUploadTask,
  FileSystemUploadResult,
  FileSystemUploadType
} from 'expo-file-system';

import { FileViewProps } from '../screens/FileViewScreen';
import { api_url } from './api-links';

// For uploading files
interface UploadFileProps {
  file: DocumentPickerAsset;
  userId: string;
  groupId: number;
  label: string;
  notes: string;
}

const uploadFile = async ({
  file,
  userId,
  groupId,
  label,
  notes
}: UploadFileProps): Promise<FileSystemUploadResult | undefined> => {
  const uploadResumable = createUploadTask(
    `${api_url}/files/upload`,
    file.uri,
    {
      httpMethod: 'POST',
      uploadType: FileSystemUploadType.MULTIPART,
      fieldName: 'file_data',
      parameters: {
        upload_by: userId,
        group_id: groupId.toString(),
        label_name: label,
        notes: notes
      }
    }
  );

  return await uploadResumable.uploadAsync();
};

// For removing files
interface RemoveFileProps {
  groupId: number;
  fileName: string;
}

const removeFile = async ({
  groupId,
  fileName
}: RemoveFileProps): Promise<string> => {
  const response = await axios.delete(
    `${api_url}/files/${groupId}/${fileName}`
  );

  return response.data;
};

// For getting files
interface GetFileProps {
  groupId: number;
  fileId: number;
}

const getFile = async ({ groupId, fileId }: GetFileProps): Promise<string> => {
  const response = await axios.get(`${api_url}/files/${groupId}/${fileId}`);

  return response.data;
};

const getAllFile = async (groupId: number): Promise<FileViewProps[]> => {
  const response = await axios.get(`${api_url}/files/${groupId}`);

  return response.data;
};

// Hook to use these operations
export const useFile = () => {
  const queryClient = useQueryClient();
  const { mutate: uploadFileMutation } = useMutation({
    mutationFn: uploadFile,
    onSuccess: (result, variables) => {
      // This is needed for file upload since it seems to use fetch instead of axios
      // axios results in error if the status is 400+
      if (result && result.status === HttpStatusCode.Ok) {
        console.log('File Uploaded...');
        queryClient.invalidateQueries({
          queryKey: ['getAllFile', variables.groupId]
        });
      } else if (result && result.status !== HttpStatusCode.Ok) {
        console.log(
          `Files did not upload. Unexpected status: ${result.status}`
        );
      }
    },
    onError: (error) => {
      console.log('Server Error: ', error.message);
    }
  });

  const { mutate: removeFileMutation } = useMutation({
    mutationFn: removeFile,
    onSuccess: () => {
      console.log('File Removed...');
    },
    onError: (error) => {
      console.log('Server Error: ', error.message);
    }
  });

  return {
    uploadFileMutation,
    removeFileMutation
  };
};

export const useFileByGroup = (groupId: number, fileId: number) => {
  const { data: file } = useQuery({
    queryFn: () => getFile({ groupId, fileId }),
    queryKey: ['getFile', groupId, fileId]
  });

  return { file };
};

export const useAllFileByGroup = (groupId: number) => {
  const {
    data: groupFiles,
    refetch: reloadFiles,
    isLoading
  } = useQuery({
    queryFn: () => getAllFile(groupId),
    queryKey: ['getAllFile', groupId]
  });

  return { groupFiles, reloadFiles, isLoading };
};
