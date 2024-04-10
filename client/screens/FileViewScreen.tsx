import React from 'react';
import { FlatList, Text, View } from 'react-native';

import FileTile from '../components/file_management/FileTile';
import Header from '../components/file_management/Header';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { useAllFileByGroup } from '../services/file';

export interface FileViewProps {
  fileID: number;
  fileName: string;
  labelName: string;
  url: string;
}

type RenderItemProps = {
  item: FileViewProps;
};

function FileViewScreen() {
  const { group } = useCareWalletContext();
  const { data } = useAllFileByGroup(group.groupID);

  const renderItem = ({ item }: RenderItemProps) => (
    <FileTile name={item.fileName} label={item.labelName} url={item.url} />
  );

  // Adjusted keyExtractor to handle potentially undefined fileID
  const keyExtractor = (item: FileViewProps) =>
    item.fileID?.toString() ?? 'unknown';

  return (
    <View>
      <Header />
      {data && data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      ) : (
        <View className="flex h-[50vh] items-center justify-center">
          <Text>No files have been uploaded.</Text>
        </View>
      )}
    </View>
  );
}

export default FileViewScreen;
