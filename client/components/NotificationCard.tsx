import React from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';

import ArrowRight from '../assets/notifications/arrow-drop-right.svg';
import Check from '../assets/notifications/check-icon.svg';
import Clock from '../assets/notifications/clock-icon.svg';
import Confirmation from '../assets/notifications/confirmation-icon.svg';

interface notifCardElements {
  title: string;
  description: string;
  icon: JSX.Element;
}

export function NotificationCard({
  notification_type,
  task_title,
  due_date
}: {
  notification_type: string;
  task_title: string;
  due_date: Date;
}) {
  // notification_type: 'due_soon' | 'status_update' | 'task_confirmation' | 'task_accepted'';

  const stuff = (): notifCardElements => {
    switch (notification_type) {
      case 'due_soon':
        return {
          title: 'TASK DUE SOON',
          description: task_title + ' due in ' + moment(due_date).fromNow(true),
          icon: <Clock />
        };
      case 'task_confirmation':
        return {
          title: 'TASK CONFIRMATION',
          description: task_title + ' task created',
          icon: <Confirmation />
        };
      case 'task_accepted':
        return {
          title: 'TASK ACCEPTED',
          description: /*USERNAME*/ 'Someone accepted this task',
          icon: <Check />
        };
      case 'status_update':
        return {
          title: 'UPDATE TASK',
          description: task_title + ' task needs to be updated',
          icon: <Check />
        };
      case 'pending':
        return {
          title: 'PENDING TASK',
          description: 'You have been assigned a task. Accept or Decline',
          icon: <Check />
        };
      default:
        return {
          title: 'TASK NOTIFICATION',
          description: 'task notification',
          icon: <Confirmation />
        };
    }
  };

  const notif = stuff();

  /**  <Text className="mt-3 flex flex-row space-x-10">
  {descriptionText()}
  </Text>
  */

  return (
    <View className="mb-6 flex rounded-lg border border-carewallet-lightgray bg-carewallet-white p-4 ">
      <View className="flex flex-row justify-between ">
        <View className="flex flex-row items-center">
          {notif.icon}

          <View className="flex  w-[60vw] flex-col  pl-4">
            <Text className="mb-2 mt-3 font-carewallet-montserrat-bold">
              {notif.title}
            </Text>
            <Text className="mb-3 font-carewallet-montserrat text-carewallet-black">
              {notif.description}
            </Text>
          </View>
          {/*
        <View className="flex w-fit flex-col pl-4">
          <Text className="mb-2 font-carewallet-montserrat-bold">
            {notif.title}
          </Text>
          <Text className="mb-2 font-carewallet-montserrat text-carewallet-black">
            {notif.description}
          </Text>
        </View> */}
        </View>
        <View className="flex flex-row items-center">
          <ArrowRight />
        </View>
      </View>
    </View>
  );
}
