import React, { useCallback, useMemo } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

import { AppStackNavigation } from '../../navigation/types';
import { Task } from '../../types/task';
import { QuickTaskCard } from '../QuickTaskCard';

export function QuickTask({
  currentDayTasks,
  bottomSheetRef,
  navigation
}: {
  currentDayTasks: Task[];
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  navigation: AppStackNavigation;
}) {
  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const snapPoints = useMemo(() => ['70%'], []);

  return (
    <BottomSheet
      index={-1}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
    >
      <Text className="ml-6 text-lg font-bold">Today&apos;s Quick Tasks</Text>
      <View style={{ height: 10 }} />
      <FlatList
        data={currentDayTasks?.filter((task) => task.quick_task)}
        className="w-full align-middle"
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item.task_id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onTouchEnd={() =>
              navigation.navigate('TaskDisplay', { id: item.task_id })
            }
          >
            <QuickTaskCard name={item.notes} label={item.task_type} />
          </Pressable>
        )}
      />
    </BottomSheet>
  );
}
