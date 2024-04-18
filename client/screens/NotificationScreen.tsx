import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { NotificationCard } from '../components/NotificationCard';
import { useCareWalletContext } from '../contexts/CareWalletContext';
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
    <GestureHandlerRootView>
      <ScrollView
        className="flex w-full"
        onScrollBeginDrag={() => setCanPress(false)}
        onScrollEndDrag={() => setCanPress(true)}
      >
        {/* White section at the top */}
        <View className="relative flex h-32 w-full items-center justify-center border-b border-carewallet-gray bg-carewallet-white">
          {/* Notifications header */}

          <Text
            className="text-center font-carewallet-montserrat-bold text-lg font-bold text-carewallet-blue"
            style={{ fontSize: '18px' }}
          >
            Notifications
          </Text>
        </View>

        <View className="mt-4"></View>

        <View className="bg-carewallet-yellow p-4">
          {dueSoonTasks.map((task, index) => (
            <Pressable
              key={index + task.task_id}
              onTouchEnd={() => {
                if (!canPress) return;
                navigator.navigate('TaskDisplay', { id: task.task_id });
              }}
            >
              <NotificationCard
                notification_type={'due_soon'}
                title={task.task_title}
                due_date={new Date(task.end_date!)}
                task_id={task.task_id}
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
                title={task.task_title}
                due_date={task?.end_date ? new Date(task.end_date) : new Date()}
                task_id={task.task_id}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
