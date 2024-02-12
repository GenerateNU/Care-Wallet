import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useMutation } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';

import { api_url } from './api-links';

interface UploadFileProps {
  file: DocumentPicker.DocumentPickerAsset;
  userId: string;
  groupId: number;
}

const uploadFile = async ({
  file,
  userId,
  groupId
}: UploadFileProps): Promise<FileSystem.FileSystemUploadResult | undefined> => {
  const uploadResumable = FileSystem.createUploadTask(
    `${api_url}/files/upload`,
    file.uri,
    {
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'file_data',
      parameters: {
        upload_by: userId,
        group_id: groupId.toString()
      }
    }
  );

  return await uploadResumable.uploadAsync();
};

export const useFile = () => {
  const { mutate: uploadFileMutation } = useMutation({
    mutationFn: (fileUploadProps: UploadFileProps) =>
      uploadFile(fileUploadProps),
    onSuccess: (result) => {
      // This is needed for file upload since it seems to use fetch instead of axios
      // axios results in error if the status is 400+
      if (result && result.status === HttpStatusCode.Ok) {
        console.log('File Uploaded...');
        return;
      }
      console.log('Failed to Upload File...');
    },
    onError: (error) => {
      console.log('Server Error: ', error.message);
    }
  });

  return {
    uploadFileMutation
  };
};
