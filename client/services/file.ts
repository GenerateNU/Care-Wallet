import axios, { HttpStatusCode } from 'axios';
import { api_url } from './api-links';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export const uploadFile = async (
  file: DocumentPicker.DocumentPickerAsset,
  userId: number
) => {
  const uploadResumable = FileSystem.createUploadTask(
    `${api_url}/files/upload`,
    file.uri,
    {
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'file_data'
    }
  );

  await uploadResumable.uploadAsync().then((res) => {
    if (res && res.status === HttpStatusCode.Ok) {
      console.log('File uploaded!');
      return res.status;
    }
    console.log('Upload failed!');
    throw new Error('Upload failed!');
  });
};

export const deleteFile = async (fileID: number) => {
  try {
    const response = await axios.delete(`${api_url}/files/${fileID}`);
    if (response.status === 200) {
      console.log('File deleted!');
      return response.status;
    }

    console.log('Delete failed!');
    throw new Error('Delete failed!');
  } catch (error) {
    console.log('Error deleting the file', error);
    throw new Error('Error deleting the file');
  }
};
