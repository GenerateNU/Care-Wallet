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

function FileViewScreen() {
  const { group } = useCareWalletContext();
  const { data, refetch, isFetching } = useAllFileByGroup(group.groupID);

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const renderItem = ({ item }: RenderItemProps) => (
    <FileTile name={item.fileName} label={item.labelName} url={item.url} />
  );

  const keyExtractor = (item: FileViewProps) =>
    item.fileID?.toString() ?? 'unknown';

  return (
    <View className="bg-carewallet-white/80">
      <Header />
      {data && data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          className="min-h-[80vh] overflow-y-auto"
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View className="flex h-[80vh] items-center justify-center">
          <Text className="text-xl text-carewallet-black">
            No files have been uploaded.
          </Text>
        </View>
      )}
    </View>
  );
}

export default FileViewScreen;
