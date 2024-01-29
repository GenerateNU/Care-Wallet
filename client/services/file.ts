import axios from 'axios';
import { api_url } from './api-links';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export const uploadFile = async (
  file: DocumentPicker.DocumentPickerAsset,
  userId: number
) => {
  // create a new FormData object and append the file to it
  const formData = new FormData();
  formData.append("file_data", file.uri);
  formData.append("user_id", userId.toString());
  formData.append("group_id", "1");

  console.log("Uploading file to server...")

  // TODO This will always send 307 err atm...
  const response = await axios.post(`${api_url}/files`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
  console.log('Response code:' + response);

  if (response && response.status === 200) {
    console.log('File uploaded!');
    return response;
  } else {
    console.log('Upload failed! (inside file.ts)');
    throw new Error('Upload failed!');
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
