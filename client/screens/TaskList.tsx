import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';

import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

import Search from '../assets/calendar/search.svg';
import { CalendarTaskListTopNav } from '../components/calendar/CalendarTaskListTopNav';
import { TaskInfoComponent } from '../components/calendar/TaskInfoCard';
import { FilterBottomSheet } from '../components/filter/FilterBottomSheet';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { AppStackNavigation } from '../navigation/types';
import { useGroup } from '../services/group';
import { useFilteredTasks } from '../services/task';
import { useUsers } from '../services/user';
import { Task } from '../types/task';

// Screen
export default function TaskListScreen() {
  const { group: userGroup } = useCareWalletContext();
  const navigator = useNavigation<AppStackNavigation>();
  const [canPress, setCanPress] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { tasks } = useFilteredTasks({ groupID: userGroup.groupID });

  const snapToIndex = (index: number) =>
    bottomSheetRef.current?.snapToIndex(index);
  const snapPoints = useMemo(() => ['60%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
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
  const { roles } = useGroup(userGroup.groupID);
  const { users } = useUsers(roles?.map((role) => role.user_id) || []);

  // Filter tasks based on search query in multiple fields and labels
  const filteredTasks = tasks?.filter((task) => {
    const taskFieldsMatch = [
      'task_id',
      'task_status',
      'task_type',
      'notes'
    ].some((field) =>
      task?.[field]
        ?.toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

    return taskFieldsMatch;
  });

  // Filter tasks based on categories
  const pastDueTasks = tasks?.filter(
    (task) => task?.end_date || '' < String(new Date())
  );
  const inProgressTasks = tasks?.filter(
    (task) => task?.task_status === 'PARTIAL'
  );
  const inFutureTasks = tasks?.filter(
    (task) => (task?.start_date || '') > String(new Date())
  );
  const completeTasks = tasks?.filter(
    (task) => task?.task_status === 'COMPLETE'
  );
  const incompleteTasks = tasks?.filter(
    (task) => task?.task_status === 'INCOMPLETE'
  );

  // Abstraction to render each section
  const renderSection = (tasks: Task[], title: string) => {
    // Don't render the section if there are no tasks
    if (tasks.length === 0) {
      return null;
    }
    return (
      <View className="mb-5 mt-3">
        <Text className="mb-3 font-carewallet-manrope-bold text-lg text-carewallet-black">
          {title}
        </Text>
        {tasks.map((task, index) => {
          return (
            <Pressable
              key={index + title}
              onTouchEnd={() => {
                if (!canPress) return;
                navigator.navigate('TaskDisplay', { id: task.task_id });
              }}
            >
              <TaskInfoComponent
                id={task.task_id}
                name={task?.task_title}
                category={task?.task_type}
                status={task?.task_status}
                date={task?.start_date ? new Date(task.start_date) : new Date()}
              />
            </Pressable>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CalendarTaskListTopNav navigator={navigator} current="TaskList" />
      <GestureHandlerRootView>
        <ScrollView
          className="mb-0 flex w-[100vw] pl-4 pr-4 pt-4"
          onScrollBeginDrag={() => setCanPress(false)}
          onScrollEndDrag={() => setCanPress(true)}
        >
          <View className="mb-5 flex-row items-center">
            <TextInput
              className="mr-4 h-14 flex-1 overflow-hidden rounded-md border border-carewallet-gray bg-carewallet-white px-8 font-carewallet-montserrat text-carewallet-black"
              placeholder="Search"
              onChangeText={(text) => {
                setSearchQuery(text);
              }}
            />
            <View className="pointer-events-none absolute inset-y-5 ml-3 flex items-center pr-3">
              <Search />
            </View>
            <View className=" flex flex-row justify-end">
              <Button
                className="mr-4 h-14 items-center justify-center rounded-xl border-carewallet-gray bg-carewallet-white font-carewallet-montserrat text-sm"
                textColor="black"
                mode="outlined"
                onPress={() => snapToIndex(0)}
              >
                FILTER
              </Button>
            </View>
          </View>
          {filteredTasks && renderSection(filteredTasks, '')}
          {pastDueTasks && renderSection(pastDueTasks, 'PAST DUE')}
          {inProgressTasks && renderSection(inProgressTasks, 'IN PROGRESS')}
          {inFutureTasks && renderSection(inFutureTasks, 'FUTURE')}
          {completeTasks && renderSection(completeTasks, 'DONE')}
          {incompleteTasks && renderSection(incompleteTasks, 'INCOMPLETE')}
        </ScrollView>
        <FilterBottomSheet
          bottomSheetRef={bottomSheetRef}
          renderBackdrop={renderBackdrop}
          snapPoints={snapPoints}
          users={users ?? []}
          statuses={['Complete', 'Incomplete', 'Partial']}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
