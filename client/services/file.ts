import axios from 'axios';
import { api_url } from './api-links';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export const uploadFile = async (file: DocumentPicker.DocumentPickerAsset, userId: number) => {
  try {
    const uploadResumable = FileSystem.createUploadTask(
      `${api_url}/files/${userId}`,
      file.uri,
      {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'file_data'
      }
    );

    const response = await uploadResumable.uploadAsync();
    console.log("Response code:" + response);

    if (response && response.status === 200) {
      console.log('File uploaded!');
      return response;
    } else {
      console.log('Upload failed! (inside file.ts)');
      throw new Error('Upload failed!');
    }
  } catch (error) {
    console.log('Error uploading file (inside file.ts)', error);
    throw new Error('Error uploading file (inside file.ts)');
  }
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
