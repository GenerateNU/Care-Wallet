import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

import { TaskQueryParams } from '../../services/task';
import { TaskTypeDescriptions } from '../../types/type';
import { User } from '../../types/user';
import { FilterCircleCard } from './FilterCircleCard';
import { TaskListFilter } from './TaskFilter';

// On close, send query with all of the aggregated filters
export function FilterBottomSheet({
  bottomSheetRef,
  snapPoints,
  renderBackdrop,
  users,
  categories,
  labels,
  statuses,
  onFilterClose,
  filters,
  setFilters
}: {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  snapPoints: string[];
  renderBackdrop: (props: BottomSheetDefaultBackdropProps) => React.JSX.Element;
  users: User[];
  categories: string[];
  statuses: string[];
  labels: string[];
  onFilterClose: () => void;
  filters: TaskQueryParams;
  setFilters: (filters: TaskQueryParams) => void;
}) {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      style={{ flex: 1, width: '100%' }}
      onClose={onFilterClose}
    >
      <ScrollView>
        <View className="space-y-5">
          <View className="flex flex-row justify-between">
            <Text className="m-5 font-carewallet-manrope-bold text-2xl">
              Filters
            </Text>
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
              }
            ]}
          />
          <TaskListFilter
            title="Category"
            items={categories?.map((category) => {
              return {
                title: TaskTypeDescriptions[category] || '',
                element: (
                  <FilterCircleCard
                    selected={false}
                    title={TaskTypeDescriptions[category] || ''}
                    onPress={() =>
                      setFilters({ ...filters, taskType: category })
                    }
                  />
                )
              };
            })}
          />
          <TaskListFilter
            title="Task Status"
            items={statuses?.map((status) => {
              return {
                title: status,
                element: (
                  <FilterCircleCard
                    selected={false}
                    title={status}
                    onPress={() =>
                      setFilters({
                        ...filters,
                        taskStatus: status.toUpperCase()
                      })
                    }
                  />
                )
              };
            })}
          />
          <TaskListFilter
            title="Assigned to"
            items={users?.map((user) => {
              return {
                title: user?.first_name || '',
                element: (
                  <FilterCircleCard
                    selected={false}
                    title={user?.first_name || ''}
                    onPress={() =>
                      setFilters({ ...filters, createdBy: user?.user_id })
                    }
                  />
                )
              };
            })}
          />
          <TaskListFilter
            title="Labels"
            items={labels?.map((label) => {
              return {
                title: label || '',
                element: (
                  <FilterCircleCard selected={false} title={label || ''} />
                )
              };
            })}
          />
        </View>
      </ScrollView>
    </BottomSheet>
  );
}
