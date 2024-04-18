import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import clsx from 'clsx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import { Button } from 'react-native-paper';
import { NotificationCard } from '../components/NotificationCard';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { MainLayout } from '../layouts/MainLayout';
import { AppStackNavigation } from '../navigation/types';
import { useFilteredTasks } from '../services/task';
import { Task } from '../types/task';

export default function NotificationScreen() {
  const navigator = useNavigation<AppStackNavigation>();
  const [canPress, setCanPress] = useState(true);

  const { group } = useCareWalletContext();
  const { tasks } = useFilteredTasks({ groupID: group.groupID });
  const [dueSoonTasks, setDueSoonTasks] = useState<Task[]>([]);
  const [overdueTasks, setOverdueTasks] = useState<Task[]>([]);
  const [createdTodayTasks, setCreatedTodayTasks] = useState<Task[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    if (tasks) {
      // Filter tasks that are due within the next 5 days
      const currentDate = new Date();
      const fiveDaysLater = new Date(currentDate);
      fiveDaysLater.setDate(currentDate.getDate() + 5);

      const dueSoon = tasks.filter(
        (task) => task.end_date && new Date(task.end_date) <= fiveDaysLater
      );

      // Filter tasks that are overdue
      const overdue = tasks.filter(
        (task) => task.end_date && new Date(task.end_date) < currentDate
      );

      // Filter tasks that were created today
      const today = currentDate.toISOString().split('T')[0];
      const createdToday = tasks.filter(
        (task) => task.created_date && task.created_date.startsWith(today)
      );

      // Sort tasks by end date
      // todo: make sure to check if there is an end date present
      dueSoon.sort(
        (a, b) =>
          new Date(b.end_date!).getTime() - new Date(a.end_date!).getTime()
      );
      overdue.sort(
        (a, b) =>
          new Date(a.end_date!).getTime() - new Date(b.end_date!).getTime()
      );
      createdToday.sort(
        (a, b) =>
          new Date(a.created_date!).getTime() -
          new Date(b.created_date!).getTime()
      );

      console.log('Tasks Due Soon:', dueSoon);
      console.log('Overdue Tasks:', overdue);
      console.log('Tasks Created Today:', createdToday);

      setDueSoonTasks(dueSoon);
      setOverdueTasks(overdue);
      setCreatedTodayTasks(createdToday);
      console.log('Tasks Due Soon:', dueSoonTasks);
      console.log('Overdue Tasks:', overdueTasks);
      console.log('Tasks Created Today:', createdTodayTasks);
    }
  }, [tasks]);

  return (
    <MainLayout>
      {/* White section at the top */}
      <View className="relative flex h-32 w-full items-center justify-center border-b border-carewallet-gray bg-carewallet-white">
        {/* Notifications header */}

        <Text className="text-center font-carewallet-montserrat-bold text-lg font-bold text-carewallet-blue">
          Notifications
        </Text>
      </View>
      <GestureHandlerRootView>
        <ScrollView
          // className="flex w-full"
          className="mb-0 flex w-[100vw] pl-2 pr-2 pt-4"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 250 }}
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={() => setCanPress(false)}
          onScrollEndDrag={() => setCanPress(true)}
        >
          {/* <View className=" flex flex-row justify-end">
              <Button
                className="mr-4 h-14 items-center justify-center rounded-xl border-carewallet-gray bg-carewallet-white font-carewallet-montserrat text-sm"
                textColor="black"
                mode="outlined"
                onPress={() => snapToIndex(0)}
              >
                FILTER
              </Button>
            </View> */}

          <View className="flex flex-row pl-4">
            <Pressable
              onTouchEnd={() => {
                if (!canPress) return;
                setSelectedFilter('all');
              }}
            >
              <View
                className={clsx(
                  'mr-2 flex flex-row space-x-2 rounded-full border border-carewallet-lightgray px-3.5 py-2',
                  selectedFilter == 'all'
                    ? 'bg-carewallet-blue'
                    : 'bg-carewallet-white '
                )}
              >
                <Text
                  className={clsx(
                    'font-carewallet-manrope',
                    selectedFilter == 'all'
                      ? 'text-carewallet-white'
                      : 'text-carewallet-black'
                  )}
                >
                  All
                </Text>
              </View>
            </Pressable>
            <Pressable
              onTouchEnd={() => {
                if (!canPress) return;
                setSelectedFilter('7');
              }}
            >
              <View
                className={clsx(
                  'mr-2 flex flex-row space-x-2 rounded-full border border-carewallet-lightgray px-3.5 py-2',
                  selectedFilter == '7'
                    ? 'bg-carewallet-blue'
                    : 'bg-carewallet-white'
                )}
              >
                <Text
                  className={clsx(
                    'font-carewallet-manrope',
                    selectedFilter == '7'
                      ? 'text-carewallet-white'
                      : 'text-carewallet-black'
                  )}
                >
                  7 Days
                </Text>
              </View>
            </Pressable>
            <Pressable
              onTouchEnd={() => {
                if (!canPress) return;
                setSelectedFilter('30');
              }}
            >
              <View
                className={clsx(
                  'mr-2 flex flex-row space-x-2 rounded-full border border-carewallet-lightgray px-3.5 py-2',
                  selectedFilter == '30'
                    ? 'bg-carewallet-blue'
                    : 'bg-carewallet-white'
                )}
              >
                <Text
                  className={clsx(
                    'font-carewallet-manrope',
                    selectedFilter == '30'
                      ? 'text-carewallet-white'
                      : 'text-carewallet-black'
                  )}
                >
                  30 Days
                </Text>
              </View>
            </Pressable>
          </View>

          <View className="p-4">
            {dueSoonTasks.map((task, index) => (
              <Pressable
                key={index}
                onTouchEnd={() => {
                  if (!canPress) return;
                  navigator.navigate('TaskDisplay', { id: task.task_id });
                }}
              >
                <NotificationCard
                  notification_type={'due_soon'}
                  task_title={task.task_title}
                  due_date={new Date(task.end_date!)}
                />
              </Pressable>
            ))}
            {overdueTasks.map((task, index) => (
              <Pressable
                key={index + task.task_id}
                onTouchEnd={() => {
                  if (!canPress) return;
                  navigator.navigate('TaskDisplay', { id: task.task_id });
                }}
              >
                <NotificationCard
                  notification_type={'status_update'}
                  task_title={task.task_title}
                  due_date={
                    task?.end_date ? new Date(task.end_date) : new Date()
                  }
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </MainLayout>
  );
}
