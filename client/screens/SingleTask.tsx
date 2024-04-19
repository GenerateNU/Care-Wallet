import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';
import moment from 'moment';
import { IconButton } from 'react-native-paper';
import { WebView } from 'react-native-webview';

import Date from '../assets/Date_today.svg';
import Edit from '../assets/profile/edit.svg';
import Clock from '../assets/profile/settings/clock.svg';
import Repeating from '../assets/repeating.svg';
import { DropUp } from '../components/DropUp';
import { GetCategoryPill } from '../components/GetCategoryPill';
import { GetStatusPill } from '../components/GetStatusPill';
import { BackButton } from '../components/nav_buttons/BackButton';
import { MainLayout } from '../layouts/MainLayout';
import { useProfileFile } from '../services/file';
import { useTaskById } from '../services/task';
import { useUser } from '../services/user';
import { Status } from '../types/type';

type ParamList = {
  mt: {
    id: string;
  };
};

export default function SingleTaskScreen() {
  const route = useRoute<RouteProp<ParamList, 'mt'>>();
  const { id } = route.params;
  const {
    task,
    taskIsLoading,
    taskLabels,
    assigned,
    updateTaskStatusMutation
  } = useTaskById(id);

  console.log('task', id);
  console.log(task?.task_type);

  const { user } = useUser(assigned ?? '');

  const { file } = useProfileFile(user?.profile_picture);

  const filters = Object.values(Status).map((filter) => ({
    label: filter,
    value: filter
  }));

  const repeat = task?.repeating;

  if (taskIsLoading)
    return (
      <View className="w-[100vw] flex-1 items-center justify-center bg-carewallet-white text-3xl">
        <ActivityIndicator size="large" />
        <Text>Loading Task...</Text>
      </View>
    );

  if (!task || task == undefined) {
    <View className="w-[100vw] flex-1 items-center justify-center bg-carewallet-white text-3xl">
      <Text>Error Loading Task</Text>
    </View>;
  }

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
    <View>
      <View className="h-[8vh] bg-carewallet-white" />
      <MainLayout>
        <View className="mr-2 flex h-[80vh] flex-col ">
          <View className="mx-1 flex flex-row items-start justify-between border-b border-carewallet-lightergray bg-carewallet-white">
            <BackButton />
            <IconButton
              className="mb-4 h-[50px] w-[50px] rounded-xl border border-carewallet-lightgray bg-carewallet-white"
              mode="contained"
              icon={() => <Edit color={'blue'} />}
            />
          </View>
          <View className="ml-2 h-[70vh]">
            {user ? (
              user.profile_picture && file ? (
                <View className="mb-5 ml-2 mr-4 mt-5 h-20 w-20">
                  <WebView
                    source={{ uri: file }}
                    className="flex-1 rounded-full border border-carewallet-blue"
                  />
                </View>
              ) : (
                <View className="mb-5 ml-2 mr-4 mt-5 h-20 w-20 rounded-full border border-carewallet-blue bg-carewallet-lightergray">
                  <Text className="my-auto items-center text-center font-carewallet-manrope-bold text-carewallet-blue">
                    {`${user.first_name?.charAt(0) ?? ''} ${user.last_name?.charAt(0) ?? ''}`}
                  </Text>
                </View>
              )
            ) : null}
            <Text className="ml-2 font-carewallet-manrope-bold text-2xl text-carewallet-black">
              {task?.task_title}
            </Text>
            <View className="ml-2 flex flex-col items-start">
              <View className="flex flex-row items-start pt-5">
                <Date />
                <Text className="ml-2 mr-5 pt-1 font-carewallet-manrope text-xs">
                  {moment(task?.start_date).format('MMMM DD')}
                </Text>
                <Clock />
                {repeat && <Repeating />}
                <Text className="ml-2 pt-1 font-carewallet-manrope text-xs font-semibold text-carewallet-black">
                  {time}
                </Text>
              </View>
              <View className="mb-auto flex flex-row flex-wrap items-start space-x-2 pt-3">
                <GetStatusPill status={task?.task_status ?? ''} />
                <View className="space-y-2">
                  <GetCategoryPill category={task?.task_type ?? ''} />
                </View>
              </View>
              {taskLabels?.map((label, index) => (
                <View
                  key={index}
                  className="mt-2 h-8 w-fit flex-row items-center justify-center space-x-2 rounded-3xl border border-carewallet-lightgray px-2"
                >
                  <Text className="font-carewallet-manrope text-sm">
                    {label.label_name}
                  </Text>
                </View>
              ))}
              <View className="mt-10">
                <Text className="font-carewallet-manrope text-sm">
                  {task?.notes}
                </Text>
              </View>
            </View>
            <View className="ml-3 mr-3 mt-auto">
              <DropUp
                updateTaskStatusMutation={updateTaskStatusMutation}
                selected={task?.task_status ?? ''}
                items={filters}
                taskId={id}
              />
            </View>
          </View>
        </View>
      </MainLayout>
    </View>
  );
}
