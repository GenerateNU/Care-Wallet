import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import Chevron from '../assets/filledarrowdown.svg';
import Time from '../assets/Time.svg';
import { HealthStats } from '../components/profile/HealthStats';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { AppStackNavigation } from '../navigation/types';
import { useTaskByAssigned } from '../services/task';
import { useUser } from '../services/user';
import { Task } from '../types/task';
import { CategoryIconsMap, TypeToCategoryMap } from '../types/type';

export default function Home() {
  const { user: signedInUser } = useCareWalletContext();
  const { user } = useUser(signedInUser.userID);
  const { taskByUser } = useTaskByAssigned(signedInUser.userID);
  const navigation = useNavigation<AppStackNavigation>();
  const currentTime = moment();

  return (
    <SafeAreaView className="flex-1 bg-carewallet-white">
      <View className="ml-5 mt-8 w-[90vw] flex-1 bg-carewallet-white">
        <View>
          <Text className="font-carewallet-manrope-semibold text-2xl text-carewallet-blue">
            {currentTime.format('A') === 'AM'
              ? `Good Morning ${user?.first_name}!`
              : currentTime.hour() >= 12 && currentTime.hour() < 15
                ? `Good Afternoon ${user?.first_name}!`
                : `Good Evening ${user?.first_name}!`}
          </Text>
        </View>
        <View className="mt-10 overflow-hidden rounded-lg border border-carewallet-blue/10">
          <View
            className="flex flex-row items-center overflow-hidden bg-carewallet-blue/10"
            onTouchEnd={async () => {
              navigation.navigate('CalendarContainer');
              await new Promise((f) => setTimeout(f, 1));
              navigation.navigate('TaskList');
            }}
          >
            <Text className="py-2 pl-2 font-carewallet-manrope-semibold text-sm text-carewallet-blue">
              {`${moment().day(new Date().getDay()).format('dddd')}, ${moment().format('MMMM Do')} - Today`}
            </Text>
            <View className="ml-auto mr-1">
              <Text className="ml-auto py-4 pr-2 text-center font-carewallet-manrope text-xs text-carewallet-blue">
                View All
              </Text>
            </View>
            <View className="mr-2 -rotate-90">
              <Chevron color={'blue'} />
            </View>
          </View>
          {taskByUser &&
          taskByUser.filter(
            (task) =>
              moment().format('DD MM YYYY') ===
              moment(task.start_date).format('DD MM YYYY')
          ).length > 0 ? (
            <View>
              {taskByUser
                .filter(
                  (task) =>
                    moment().format('DD MM YYYY') ===
                    moment(task.start_date).format('DD MM YYYY')
                )
                .map((task) => (
                  <View
                    key={task.task_id}
                    onTouchEnd={async () => {
                      navigation.navigate('CalendarContainer');
                      await new Promise((f) => setTimeout(f, 1));
                      navigation.navigate('TaskDisplay', {
                        id: task.task_id
                      });
                    }}
                  >
                    <TaskSmallCard task={task} />
                  </View>
                ))}
            </View>
          ) : (
            <View className="h-10 items-center justify-center">
              <Text className="ml-2 font-carewallet-manrope text-sm">
                You have no assigned tasks today.
              </Text>
            </View>
          )}
        </View>
        <View className="mt-5 h-[20vh] rounded-lg border border-carewallet-blue/10 bg-carewallet-blue/10">
          <Text className="ml-5 mt-5 font-carewallet-manrope-semibold text-lg">
            Health Overview
          </Text>
          <HealthStats />
        </View>
        <View className="mt-10 overflow-hidden rounded-lg border border-carewallet-blue/10">
          <View
            className="flex flex-row items-center overflow-hidden bg-carewallet-blue/10"
            onTouchEnd={async () => {
              navigation.navigate('CalendarTopNav');
              await new Promise((f) => setTimeout(f, 1));
              navigation.navigate('TaskList');
            }}
          >
            <Text className="py-2 pl-2 font-carewallet-manrope-semibold text-sm text-carewallet-blue">
              Notifications
            </Text>
          </View>

          <View className="h-10 items-center justify-center">
            <Text className="ml-2 font-carewallet-manrope text-sm">
              You have no recent notifications.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function TaskSmallCard({ task }: { task: Task }) {
  const time = `${
    moment(task?.start_date).format('HH DD YYYY') ===
    moment(task?.end_date).format('HH DD YYYY')
      ? moment(task?.start_date).format('h:mm A')
      : `${
          moment(task?.start_date).format('A') ===
          moment(task?.end_date).format('A')
            ? moment(task?.start_date).format('h:mm')
            : moment(task?.start_date).format('h:mm A')
        } - ${moment(task?.end_date).format('h:mm A')}`
  }`;
  return (
    <View className="border-x-0 border-b-0 border-t border-carewallet-blue/10 pt-2">
      <View className="mb-3 flex flex-row items-center justify-center">
        <Text className="ml-3 mr-auto font-carewallet-manrope-semibold text-base">
          {task.task_title}
        </Text>
      </View>
      <View className="mb-2 flex flex-row items-center justify-center">
        <View className="ml-2">
          <Time width={20} height={20} />
        </View>
        <View>
          <Text className="ml-2 mt-auto font-carewallet-manrope-semibold text-xs">
            {task.quick_task ? `Quick Task` : time}
          </Text>
        </View>
        <View className="ml-auto mr-4">
          {CategoryIconsMap[TypeToCategoryMap[task.task_type]]}
        </View>
      </View>
    </View>
  );
}
