import React from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';

export function NotificationCard({
  notification_type,
  title,
  due_date,
  task_id //delete task_id, we dont need it for navigation anymore cause its done on the screen
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
      return 'Task Due Soon';
    }
    if (notification_type === 'status_update') {
      return 'Status Update';
    }
    // if (notification_type === 'created_today') {
    //   return TaskTypeDescriptions[TaskTypeDescriptions['created_today']];
    // }
    else {
      return 'invalid task type';
    }
  };

  return (
    <View className="bg-white mb-6 rounded-lg border border-carewallet-black p-4">
      <View className="mb-2 flex flex-col justify-between">
        <Text className="self-start text-xl">{type_to_text()}</Text>
        <Text className="mt-3 flex flex-row space-x-10">
          {descriptionText()}
        </Text>
      </View>
    </View>
  );
}
