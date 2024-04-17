import React from 'react';
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';
import moment from 'moment';
import { IconButton } from 'react-native-paper';

import Date from '../assets/Date_today.svg';
import Edit from '../assets/profile/edit.svg';
import Clock from '../assets/profile/settings/clock.svg';
import Repeating from '../assets/repeating.svg';
import { DropUp } from '../components/DropUp';
import { GetLabelPill } from '../components/GetLabelPill';
import { GetStatusPill } from '../components/GetStatusPill';
import { BackButton } from '../components/nav_buttons/BackButton';
import { NoteButton } from '../components/NoteButton';
import { useTaskById, useTaskByStatus } from '../services/task';
import { Status } from '../types/type';

type ParamList = {
  mt: {
    id: string;
  };
};

export default function SingleTaskScreen() {
  const route = useRoute<RouteProp<ParamList, 'mt'>>();
  const { id } = route.params;
  const { task, taskIsLoading, taskLabelsIsLoading } = useTaskById(id);

  const { taskStatus } = useTaskByStatus(id);
  console.log(taskStatus);

  const filters = Object.values(Status).map((filter) => ({
    label: filter,
    value: filter
  }));

  const repeat = task?.repeating;

  if (taskIsLoading || taskLabelsIsLoading)
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

  return (
    <SafeAreaView className=" flex-1">
      <View className="flex h-[100vh] bg-carewallet-white">
        <View className="mx-1 mt-4 flex flex-row items-start justify-between border-b border-carewallet-lightergray bg-carewallet-white">
          <BackButton />
          <IconButton
            className="mb-4 h-[50px] w-[50px] rounded-xl border border-carewallet-lightgray bg-carewallet-white"
            mode="contained"
            icon={() => <Edit color={'blue'} />}
          />
        </View>
        <View className="mb-3 ml-3 mt-4 h-20 w-20 rounded-full border border-[#B4B3B3] bg-carewallet-white" />
        <Text className="font-inter ml-5 font-carewallet-manrope-bold text-2xl text-carewallet-black">
          {task?.task_title}
        </Text>
        <View className="ml-2 flex flex-col items-start">
          <View className="flex flex-row items-start pt-5">
            <Date />
            <Text className="pt-1 font-carewallet-manrope text-xs">
              {moment(task?.start_date).format('MM/DD/YYYY')}
            </Text>
            <Clock />
            {repeat && <Repeating />}
            <Text className="pt-1 font-carewallet-manrope text-xs font-semibold text-carewallet-black">
              {moment(task?.start_date).format('hh:mm A')}
              {task?.end_date &&
                `- ${moment(task?.end_date).format('hh:mm A')}`}
            </Text>
          </View>
          <View className="flex flex-row items-start pt-3">
            <GetStatusPill status={taskStatus}> </GetStatusPill>
            <GetLabelPill category={task?.task_type} />
          </View>
          <NoteButton note={task?.notes}></NoteButton>
          <View className="mt-4"></View>

          <View className="mt-2">
            <Text className="text-black font-carewallet-manrope text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.{' '}
            </Text>
          </View>
        </View>

        <View className="ml-auto mt-auto flex-1 flex-row space-x-4">
          {/* <View className="mt-auto rounded-lg bg-carewallet-gray p-2">
            <CheckMark />
          </View>
          <View className="mt-auto rounded-lg bg-carewallet-gray p-2">
            <Reject />
          </View> */}
          {
            // <DropDownPicker
            //   open={open}
            //   value={selectedStatus}
            //   items={filters}
            //   setOpen={setOpen}
            //   setValue={setSelectedStatus}
            //   placeholder={task?.task_status}
            //   onSelectItem={() => {
            //     navigation.navigate('FileUploadScreen');
            //   }}
            // />
            <DropUp selected="Actions" items={filters} taskId={id} />
          }
        </View>
      </View>
    </SafeAreaView>
  );
}
