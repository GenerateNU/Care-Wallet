import React from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';

export function NotificationCard({
  notification_type,
  title,
  due_date,
  task_id // delete task_id, we dont need it for navigation anymore cause its done on the screen
}: {
  notification_type: string;
  title: string;
  due_date: Date;
  task_id: number;
}) {
  // notification_type: 'due_soon' | 'status_update' | 'task_confirmation' | 'task_accepted'';
  const descriptionText = () => {
    console.log(task_id);
    if (notification_type === 'due_soon') {
      return title + ' due in ' + moment(due_date).fromNow(true);
    }
    if (notification_type === 'status_update') {
      return 'Remeember to update status of ' + title;
    }
    // if (notification_type === 'created_today') {
    //   return 'Created Today';
    // }
    else {
      return 'invalid task type';
    }
  };

  const type_to_text = () => {
    if (notification_type === 'due_soon') {
      return 'TASK DUE SOON';
    }
    if (notification_type === 'status_update') {
      return 'STATUS UPDATE';
    }
    // if (notification_type === 'created_today') {
    //   return TaskTypeDescriptions[TaskTypeDescriptions['created_today']];
    // }
    else {
      return 'invalid task type';
    }
  };

  /**  <Text className="mt-3 flex flex-row space-x-10">
  {descriptionText()}
  </Text>
  */

  return (
    <View className="mb-6 flex rounded-lg border border-carewallet-lightgray bg-carewallet-white p-4">
      <View className="flex w-full flex-col items-start justify-between">
        <Text className="mb-2 bg-carewallet-yellow text-center font-carewallet-montserrat-bold">
          {type_to_text()}
        </Text>
        <Text className="mb-2 bg-carewallet-yellow text-center font-carewallet-montserrat text-carewallet-black">
          {descriptionText()}
        </Text>
      </View>
    </View>
  );
}

/**
 *   return (
    <View className="bg-white mb-6 rounded-lg border border-carewallet-yellow p-10">
      <View className="mb-2 flex flex-col justify-between">
        <Text className="self-start text-xl">{type_to_text()}</Text>
        <Text className="mb-2 font-carewallet-manrope-bold text-carewallet-blackr">
          {descriptionText()}
        </Text>
      </View>
    </View>
  );

 */
