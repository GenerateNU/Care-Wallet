// components/TasksPopup.tsx
import React, { useCallback, useMemo, useRef } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps
} from '@gorhom/bottom-sheet/';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

import { QuickTaskCard } from '../components/QuickTaskCard';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { useFilteredTasks } from '../services/task';

function QuickTasks(): JSX.Element {
  const { group } = useCareWalletContext();
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
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.3}
      />
    ),
    []
  );

  // Todo: Look into if there is a change for this
  const taskTypeDescriptions: Record<string, string> = {
    med_mgmt: 'Medication Management',
    dr_appt: 'Doctor Appointment',
    financial: 'Financial Task',
    other: 'Other Task'
  };

  if (tasksIsLoading) {
    return (
      <View className="w-[100vw] flex-1 items-center justify-center bg-carewallet-white text-3xl">
        <ActivityIndicator size="large" />
        <Text>Loading Tasks...</Text>
      </View>
    );
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
        <Text className="ml-6 text-lg font-bold">Today&apos;s Quick Tasks</Text>
        <View style={{ height: 10 }} />
        <FlatList
          data={tasks}
          className="w-full align-middle"
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyExtractor={(item) => item.task_id.toString()}
          renderItem={({ item }) => (
            <QuickTaskCard
              name={item.notes}
              label={taskTypeDescriptions[item.task_type]}
            />
          )}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

export { QuickTasks };
