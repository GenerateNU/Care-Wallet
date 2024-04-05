import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

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
        <View>
          <View className="mt-10 flex flex-row items-center overflow-hidden rounded-t-lg bg-carewallet-blue/10">
            <Text className="py-2 pl-2 font-carewallet-manrope-semibold text-lg">
              {`${moment().day(new Date().getDay()).format('dddd')}, ${moment().format('MMMM Do')} - Today`}
            </Text>
            <View
              className="ml-auto mr-2 h-9 w-9 items-center justify-center rounded-full border  border-carewallet-lightgray bg-carewallet-white"
              onTouchEnd={() => navigation.navigate('TaskType')}
            >
              <Text className="font-carewallet-montserrat text-4xl text-carewallet-gray">
                +
              </Text>
            </View>
          </View>

          {taskByUser &&
          taskByUser.filter(
            (task) =>
              moment().format('DD MM YYYY') ===
              moment(task.start_date).format('DD MM YYYY')
          ).length > 0 ? (
            <View className="rounded-b-lg border border-t-0 border-carewallet-lightgray">
              {taskByUser
                .filter(
                  (task) =>
                    moment().format('DD MM YYYY') ===
                    moment(task.start_date).format('DD MM YYYY')
                )
                .map((task) => (
                  <View
                    key={task.task_id}
                    onTouchEnd={() => {
                      navigation.navigate('CalendarContainer', {
                        screen: 'TaskDisplay',
                        params: { id: task.task_id }
                      });
                    }}
                  >
                    <TaskSmallCard task={task} />
                  </View>
                ))}
            </View>
          ) : (
            <View className="h-10 items-center justify-center rounded-b-lg border border-t-0 border-carewallet-lightgray">
              <Text className="ml-2 font-carewallet-manrope text-sm">
                You have no assigned tasks today.
              </Text>
            </View>
          )}
        </View>
        <View className="mt-5 h-[20vh] rounded-lg border border-carewallet-lightgray bg-carewallet-blue/10">
          <Text className="ml-5 mt-5 font-carewallet-manrope-semibold text-lg">
            Health Overview
          </Text>
          <HealthStats />
        </View>
      </View>
    </SafeAreaView>
  );
}

function TaskSmallCard({ task }: { task: Task }) {
  return (
    <View className="border-t border-carewallet-lightgray pt-2">
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
            {task.quick_task
              ? `All Day`
              : `${moment(task.start_date).format('h:mm A')} - ${moment(task.end_date).format('h:mm A')}`}
          </Text>
        </View>
        <View className="ml-auto mr-4">
          {CategoryIconsMap[TypeToCategoryMap[task.task_type]]}
        </View>
      </View>
    </View>
  );
}
