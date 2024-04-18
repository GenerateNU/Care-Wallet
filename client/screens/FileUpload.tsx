import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { DocumentPickerAsset, getDocumentAsync } from 'expo-document-picker';

import { ChooseFileButton } from '../components/ChooseFileButton';
import { CWDropdown } from '../components/Dropdown';
import { BackButton } from '../components/nav_buttons/BackButton';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { MainLayout } from '../layouts/MainLayout';
import { useFile } from '../services/file';
import { useLabelsByGroup } from '../services/label';

export default function FileUploadScreen() {
  const { user, group } = useCareWalletContext();
  const { uploadFileMutation } = useFile();
  const [fileTitle, setFileTitle] = useState('');
  const [label, setLabel] = useState({ label: 'Select Label', value: '' });
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [pickedFile, setPickedFile] = useState<DocumentPickerAsset | null>(
    null
  );
  const { labels } = useLabelsByGroup(group.groupID);

  const handleFileTitleChange = (text: string) => {
    setFileTitle(text);
  };

  const handleAdditionalNotesChange = (text: string) => {
    setAdditionalNotes(text);
  };

  useEffect(() => {
    setFileTitle(pickedFile?.name || '');
  }, [pickedFile]);

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
          groupId: group.groupID,
          label: label.value,
          notes: additionalNotes
        });

        setFileTitle('');
        setLabel({ label: 'Select Label', value: '' });
        setAdditionalNotes('');
        setPickedFile(null);
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <ScrollView className="flex flex-col align-middle">
      <View>
        <View className="h-[8vh] bg-carewallet-white" />
        <MainLayout>
          <View>
            <View className="flex w-[100vw] flex-row items-center bg-carewallet-white">
              <BackButton />
              <View className="flex-1 items-center">
                <Text className="mr-16 text-center font-carewallet-manrope-bold text-2xl text-carewallet-blue">
                  Upload File
                </Text>
              </View>
            </View>
            <View className="mx-2">
              <ChooseFileButton onPress={pickDocument} picked={pickedFile} />
            </View>
            <View className="relative z-20  mx-2 mt-4 flex flex-row">
              <View className="mr-4 flex-1">
                <Text className="text-md mb-2 font-carewallet-manrope-bold text-carewallet-black">
                  FILE TITLE
                </Text>
                <TextInput
                  className="rounded-md border border-carewallet-gray p-4 font-carewallet-manrope"
                  placeholder="Text here"
                  value={fileTitle}
                  onChangeText={handleFileTitleChange}
                />
              </View>
              <View className="relative z-20 flex-1">
                <Text className="mb-2 font-carewallet-manrope-bold text-carewallet-black">
                  FILE LABEL
                </Text>
                <CWDropdown
                  selected={label.label}
                  items={labels?.map((label) => ({
                    label: label.label_name,
                    value: label.label_name
                  }))}
                  setLabel={setLabel}
                />
              </View>
            </View>
            <View className="relative z-10  mx-2 mt-4 flex flex-row">
              <View className="flex-1">
                <Text className="mb-2 font-carewallet-manrope-bold text-carewallet-black">
                  ADDITIONAL NOTES
                </Text>
                <TextInput
                  className="w-full rounded-md border border-carewallet-gray p-10 font-carewallet-manrope"
                  placeholder="Text here"
                  value={additionalNotes}
                  onChangeText={handleAdditionalNotesChange}
                />
              </View>
            </View>
            <View className="mx-2 mb-2 mt-2 flex flex-row">
              <View className="flex-1">
                <TouchableOpacity
                  className="mt-2 rounded-lg bg-carewallet-blue px-8 py-5"
                  onPress={submitFile}
                >
                  <Text className="text-center font-carewallet-manrope text-base text-carewallet-white">
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </MainLayout>
      </View>
    </ScrollView>
  );
}
