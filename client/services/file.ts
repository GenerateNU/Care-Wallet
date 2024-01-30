import axios, { HttpStatusCode } from 'axios';
import { api_url } from './api-links';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export const uploadFile = async (
  file: DocumentPicker.DocumentPickerAsset,
  userId: number,
  groupId: number
) => {
  const uploadResumable = FileSystem.createUploadTask(
    `${api_url}/files/upload`,
    file.uri,
    {
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'file_data',
      headers: {
        'user_id': userId.toString(),
        'group_id': groupId.toString()
      }
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