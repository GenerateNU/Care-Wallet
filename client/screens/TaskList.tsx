import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';

import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

import Search from '../assets/calendar/search.svg';
import { CalendarTaskListTopNav } from '../components/calendar/CalendarTaskListTopNav';
import { TaskInfoComponent } from '../components/calendar/TaskInfoCard';
import { FilterBottomSheet } from '../components/filter/FilterBottomSheet';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { MainLayout } from '../layouts/MainLayout';
import { AppStackNavigation } from '../navigation/types';
import { useGroup } from '../services/group';
import { useLabelsByTasks } from '../services/label';
import { TaskQueryParams, useFilteredTasks } from '../services/task';
import { useUsers } from '../services/user';
import { Task } from '../types/task';

export default function TaskListScreen() {
  const { group: userGroup } = useCareWalletContext();
  const navigator = useNavigation<AppStackNavigation>();
  const [canPress, setCanPress] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<TaskQueryParams>({
    groupID: userGroup.groupID
  });
  const { tasks, tasksIsLoading, refetchTask } = useFilteredTasks(filters);
  const { labels, labelsIsLoading } = useLabelsByTasks(
    tasks?.map((task) => task.task_id) ?? []
  );

  useEffect(() => {
    refetchTask();
  }, [filters]);

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
  const pastDueTasks = tasks?.filter((task) =>
    moment(task?.end_date).isBefore(moment())
  );
  const inProgressTasks = tasks?.filter(
    (task) => task?.task_status === 'PARTIAL'
  );
  const inFutureTasks = tasks?.filter((task) =>
    moment(task?.end_date).isAfter(moment())
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
                task={task}
                taskLabels={labels?.filter(
                  (label) => label.task_id === task.task_id
                )}
              />
            </Pressable>
          );
        })}
      </View>
    );
  };

  if (tasksIsLoading || labelsIsLoading) {
    return (
      <View className="w-full flex-1 items-center justify-center bg-carewallet-white text-3xl">
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <MainLayout>
      <CalendarTaskListTopNav navigator={navigator} current="TaskList" />
      <GestureHandlerRootView>
        <ScrollView
          className="mb-28 flex w-[100vw] pl-4 pr-4 pt-4"
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
          categories={[...new Set(tasks?.map((task) => task.task_type))]}
          labels={[...new Set(labels?.map((label) => label.label_name))]}
          statuses={['Complete', 'Incomplete', 'Partial']}
          filters={filters}
          setFilters={setFilters}
        />
      </GestureHandlerRootView>
    </MainLayout>
  );
}
