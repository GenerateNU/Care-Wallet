// components/TasksPopup.tsx
import React, { useCallback, useMemo, useRef } from 'react';
import { FlatList, Text, View } from 'react-native';

import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet/';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

import { QuickTaskCard } from '../components/QuickTaskCard';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { useFilteredTasks } from '../services/task';

export default function QuickTasks() {
  // const tasksEx = [
  //   { task_id: 1, notes: 'Take out the trash', task_type: 'Home' },
  //   { task_id: 2, notes: 'Do the laundry', task_type: 'Laundry' },
  //   { task_id: 3, notes: 'Wash the dishes', task_type: 'Kitchen' }
  // ];

  const { user: signedInUser, group } = useCareWalletContext();
  const { tasks, tasksIsLoading } = useFilteredTasks({
    groupID: group.groupID.toString(),
    quickTask: true
  });

  const snapPoints = useMemo(() => ['70%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpenPress = () => {
    bottomSheetRef.current?.expand();
    console.log(tasks);
  };
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

  if (tasksIsLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Button onPress={handleOpenPress}>Open</Button>
      <Button onPress={handleClosePress}>Close</Button>
      <BottomSheet
        index={-1}
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
          keyExtractor={(item) => item.task_id.toString()}
          renderItem={({ item }) => (
            <QuickTaskCard name={item.notes} label={item.task_type} />
          )}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
