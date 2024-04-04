import { useMutation } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';
import { DocumentPickerAsset } from 'expo-document-picker';
import {
  createUploadTask,
  FileSystemUploadResult,
  FileSystemUploadType
} from 'expo-file-system';

import { api_url } from './api-links';

// For uploading files
interface UploadFileProps {
  file: DocumentPickerAsset;
  userId: string;
  groupId: number;
}

const uploadFile = async ({
  file,
  userId,
  groupId
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
        group_id: groupId.toString()
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
}: RemoveFileProps): Promise<Response> => {
  const response = await fetch(
    `${api_url}/files/remove?groupId=${groupId}&fileName=${fileName}`,
    {
      method: 'DELETE'
    }
  );

  if (!response.ok) {
    throw new Error('Failed to remove file');
  }

  return response;
};

// For getting files
interface GetFileProps {
  groupId: number;
  fileName: string;
}

const getFile = async ({
  groupId,
  fileName
}: GetFileProps): Promise<string> => {
  const response = await fetch(
    `${api_url}/files/get?groupId=${groupId}&fileName=${fileName}`,
    {
      method: 'GET'
    }
  );

  if (!response.ok) {
    throw new Error('Failed to get file');
  }

  // Check the Content-Type header
  const contentType = response.headers.get('Content-Type');

  if (contentType?.includes('application/json')) {
    // Handle JSON response
    const data = await response.json();
    return data.url; // Assuming it's a JSON containing a URL
  } else {
    // Assuming the response is a file - handle accordingly
    // For direct file response, handling might be different, e.g., downloading the file
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    return url; // Returns a local URL to access the file
  }
};

// Hook to use these operations
export const useFile = () => {
  const { mutate: uploadFileMutation } = useMutation({
    mutationFn: uploadFile,
    onSuccess: (result) => {
      if (result && result.status === HttpStatusCode.Ok) {
        console.log('File Uploaded...');
      } else {
        console.log('Failed to Upload File...');
      }
    },
    onError: (error: any) => {
      console.log('Server Error: ', error.message);
    }
  });

  const { mutate: removeFileMutation } = useMutation({
    mutationFn: removeFile,
    onSuccess: () => {
      console.log('File Removed...');
    },
    onError: (error: any) => {
      console.log('Server Error: ', error.message);
    }
  });

  const { mutate: getFileMutation } = useMutation({
    mutationFn: getFile,
    onSuccess: (url: string) => {
      console.log('File URL: ', url);
      window.location.href = url; // Or handle the URL as needed
    },
    onError: (error: any) => {
      console.log('Server Error: ', error.message);
    }
  });

  return {
    uploadFileMutation,
    removeFileMutation,
    getFileMutation
  };
};
