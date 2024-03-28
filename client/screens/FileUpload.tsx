import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { DocumentPickerAsset, getDocumentAsync } from 'expo-document-picker';
import DropDownPicker from 'react-native-dropdown-picker';

import { ChooseFileButton } from '../components/ChooseFileButton';
import { BackButton } from '../components/nav_buttons/BackButton';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { useFile } from '../services/file';

// TODO: Add SVGs to background and button, and add functionality for Title, Label, Notes
export default function FileUploadScreen() {
  const { user, group } = useCareWalletContext();
  const { uploadFileMutation } = useFile();
  const [open, setOpen] = useState(false);
  const [fileTitle, setFileTitle] = useState('');
  const [label, setLabel] = useState('Medication');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [pickedFile, setPickedFile] = useState<DocumentPickerAsset | null>(
    null
  );

  const handleFileTitleChange = (text: string) => {
    setFileTitle(text);
  };

  const handleAdditionalNotesChange = (text: string) => {
    setAdditionalNotes(text);
  };

  const pickDocument = async () => {
    try {
      await getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false
      }).then((res) => {
        if (!res.canceled) {
          setPickedFile(res.assets[0]);
        }
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  const submitFile = async () => {
    try {
      if (pickedFile) {
        uploadFileMutation({
          file: pickedFile,
          userId: user.userID,
          groupId: group.groupID
        });
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  // TODO: Choosefile border color, dropdown styling, fonts, choose file svg
  return (
    <View className="flex h-full flex-col items-start bg-carewallet-white p-6">
      <View className="w-full flex-row items-center">
        <BackButton />
        <View className="flex-1">
          <Text className="mr-20 text-center text-xl font-medium text-carewallet-blue">
            File Upload
          </Text>
        </View>
      </View>
      <ChooseFileButton onPress={pickDocument} />
      <View className="mt-4 flex flex-row">
        <View className="mr-4 flex-1">
          <Text className="text-md mb-2 text-carewallet-black">File Title</Text>
          <TextInput
            className="rounded-md border border-carewallet-gray p-4"
            placeholder="Text here"
            value={fileTitle}
            onChangeText={handleFileTitleChange}
          />
        </View>
        <View className="flex-1">
          <Text className="text-md mb-2 text-carewallet-black">File Label</Text>
          <DropDownPicker
            style={{
              backgroundColor: 'carewallet-blue',
              borderColor: 'carewallet-lightgray',
              position: 'relative',
              zIndex: 10
            }}
            open={open}
            value={label}
            items={[
              { label: 'Medication', value: 'Medication' },
              { label: 'Financial', value: 'Financial' },
              { label: 'Appointments', value: 'Appointments' },
              { label: 'Household', value: 'Household' }
            ]}
            setOpen={setOpen}
            setValue={setLabel}
            placeholder="Select Label"
          />
        </View>
      </View>
      <View className="mt-4 flex flex-row">
        <View className="flex-1">
          <Text className="text-md mb-2 text-carewallet-black">
            Additional Notes
          </Text>
          <TextInput
            className="w-full rounded-md border border-carewallet-gray p-8"
            placeholder="Text here"
            value={additionalNotes}
            onChangeText={handleAdditionalNotesChange}
          />
        </View>
      </View>
      <View className="mt-2 flex flex-row">
        <View className="flex-1">
          <TouchableOpacity
            className="mt-2 rounded-lg bg-carewallet-blue px-8 py-5"
            onPress={submitFile}
          >
            <Text className="text-center text-base text-carewallet-white">
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
