import React, { useCallback } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';

import { FileTile } from '../components/file_management/FileTile';
import { Header } from '../components/file_management/Header';
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

export default function FileViewScreen() {
  const { group } = useCareWalletContext();
  const { groupFiles, reloadFiles, isLoading } = useAllFileByGroup(
    group.groupID
  );

  const onRefresh = useCallback(() => {
    reloadFiles();
  }, [reloadFiles]);

  const renderItem = ({ item }: RenderItemProps) => (
    <FileTile name={item.fileName} label={item.labelName} url={item.url} />
  );

  const keyExtractor = (item: FileViewProps) => {
    return item.fileID
      ? item.fileID.toString()
      : `${item.fileName}-${item.url}`;
  };

  return (
    <View className="bg-carewallet-white/80">
      <Header />
      {groupFiles && groupFiles.length > 0 ? (
        <FlatList
          data={groupFiles}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          className="h-5/6 bg-carewallet-white/80"
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View className="flex h-[80vh] items-center justify-center bg-carewallet-white/80">
          <Text className="text-xl text-carewallet-black">
            No files have been uploaded.
          </Text>
        </View>
      )}
    </View>
  );
}
