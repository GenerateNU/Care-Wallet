import React from 'react';
import { Text, View } from 'react-native';

import { useTaskByAssigned } from '../../services/task';

export function UserTaskStatusCard({ userID }: { userID: string }) {
  const { taskByUser, taskByUserIsLoading } = useTaskByAssigned(userID);

  if (taskByUserIsLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className="flex h-20 w-80 flex-row items-center justify-center rounded-xl border border-carewallet-gray bg-carewallet-white">
      <View className="items-center border-r border-carewallet-gray pr-5 text-center">
        <Text className="font-SFProDisplaySemibold text-xs">YOUR TASKS</Text>
        <Text className="text-2xl">{taskByUser?.length ?? 0}</Text>
      </View>
      <View className="items-center border-r border-carewallet-gray pl-5 pr-5 text-center">
        <Text className="font-SFProDisplaySemibold text-xs">IN PROGRESS</Text>
        <Text className="text-2xl">
          {taskByUser?.filter((task) => task.task_status === 'INPROGRESS')
            .length ?? 0}
        </Text>
      </View>
      <View className="items-center pl-5 pr-5 text-center">
        <Text className="font-SFProDisplaySemibold text-xs">TO DO</Text>
        <Text className="text-2xl">
          {taskByUser?.filter((task) => task.task_status === 'TODO').length ??
            0}
        </Text>
      </View>
    </View>
  );
}
