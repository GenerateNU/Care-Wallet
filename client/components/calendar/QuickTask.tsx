import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

import { AppStackNavigation } from '../../navigation/types';
import { Task } from '../../types/task';
import { QuickTaskCard } from './QuickTaskCard';

export function QuickTask({
  currentDayTasks,
  bottomSheetRef,
  navigation
}: {
  currentDayTasks: Task[];
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  navigation: AppStackNavigation;
}) {
  const [canPress, setCanPress] = useState(true);
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
      <Text className="ml-6 text-2xl font-bold">Today&apos;s Quick Tasks</Text>
      <View style={{ height: 10 }} />
      <FlatList
        onScrollBeginDrag={() => setCanPress(false)}
        onScrollEndDrag={() => setCanPress(true)}
        data={currentDayTasks?.filter((task) => task.quick_task)}
        className="mb-3 w-full align-middle"
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={(item) => item.task_id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onTouchEnd={() => {
              if (!canPress) return;
              navigation.navigate('TaskDisplay', { id: item.task_id });
            }}
          >
            <QuickTaskCard
              name={item.task_title}
              label={item.task_type}
              status={item.task_status}
            />
          </Pressable>
        )}
      />
    </BottomSheet>
  );
}
