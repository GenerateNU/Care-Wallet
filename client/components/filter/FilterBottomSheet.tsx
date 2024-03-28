import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

import { User } from '../../types/user';
import { FilterCircleCard } from './FilterCircleCard';
import { TaskListFilter } from './TaskFilter';

export function FilterBottomSheet({
  bottomSheetRef,
  snapPoints,
  renderBackdrop,
  users
}: {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  snapPoints: string[];
  renderBackdrop: (props: BottomSheetDefaultBackdropProps) => React.JSX.Element;
  users: User[];
}) {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      style={{ flex: 1, width: '100%' }}
    >
      <ScrollView>
        <View className="space-y-5">
          <View className="flex flex-row justify-between">
            <Text className="m-5 text-2xl font-normal">Filters</Text>
          </View>
          <TaskListFilter
            title="Sort by"
            items={[
              {
                title: 'All Tasks',
                element: <FilterCircleCard selected={true} title="All Tasks" />
              },
              {
                title: 'Quick Tasks',
                element: (
                  <FilterCircleCard selected={false} title="Quick Tasks" />
                )
              },
              {
                title: 'Tasks',
                element: <FilterCircleCard selected={false} title="Tasks" />
              }
            ]}
          />
          <TaskListFilter title="Category" />
          <TaskListFilter title="Task Status" />
          <TaskListFilter title="Task Types" />
          <TaskListFilter
            title="Assigned to"
            items={users?.map((user) => {
              return {
                title: user?.first_name || '',
                element: (
                  <FilterCircleCard
                    selected={false}
                    title={user?.first_name || ''}
                  />
                )
              };
            })}
          />
          <TaskListFilter title="Labels" />
        </View>
      </ScrollView>
    </BottomSheet>
  );
}
