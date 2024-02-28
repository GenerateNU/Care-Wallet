// components/TasksPopup.tsx
import React, { useCallback, useMemo, useRef } from 'react';
import { FlatList, Text, View } from 'react-native';

import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet/';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

import { QuickTaskCard } from '../components/QuickTaskCard';

// import { fetchTasks } from '../services/taskService';

export default function QuickTasks() {
  const tasks = [
    { id: '1', name: 'Take out the trash', label: 'Home' },
    { id: '2', name: 'Do the laundry', label: 'Laundry' },
    { id: '3', name: 'Wash the dishes', label: 'Kitchen' }
  ];

  //   if (isLoading) {
  //     return <Text>Loading...</Text>;
  //   }

  const snapPoints = useMemo(() => ['70%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleClosePress = () => bottomSheetRef.current?.close();

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
        opacity={0.3}
      />
    ),
    []
  );
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Button onPress={handleOpenPress}>Open</Button>
      <Button onPress={handleClosePress}>Close</Button>
      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
      >
        <Text className="ml-6 text-lg font-bold">Today's Quick Tasks</Text>
        <View style={{ height: 10 }} />
        <FlatList
          data={tasks}
          className="w-full align-middle"
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <QuickTaskCard name={item.name} label={item.label} />
          )}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
