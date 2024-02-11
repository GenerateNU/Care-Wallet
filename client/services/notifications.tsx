import React, { useEffect, useState, useRef } from 'react';
import { Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Notification from 'expo-notifications';
import Constants from 'expo-constants';
import {
  DailyTriggerInput,
  NotificationTriggerInput,
  scheduleNotificationAsync,
  YearlyTriggerInput
} from 'expo-notifications';
import { WeeklyTriggerInput } from 'expo-notifications/build/NotificationScheduler.types';
export async function registerForPushNotificationsAsync() {
  // checks that this is a physical device
  if (!Device.isDevice) {
    alert(
      'Must use physical device for Push Notifications. Must be ios or android.'
    );
    return null;
  }

  // ask user for notification permissions
  const { status } = await Notification.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission to receive push notifications was denied');
    return null;
  }

  // android needs notification channel with highest importance so notificaiton goes through always
  if (Platform.OS === 'android') {
    Notification.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notification.AndroidImportance.MAX
    });
  }

  const carewalletProjectId = Constants.easConfig?.projectId;
  // Constants.default.easConfig?.projectId;

  // const appConfig = require('../app.json');
  // const projectId = appConfig.expo.extra.eas.projectId;

  // gets push notification token
  const token = (
    await Notification.getExpoPushTokenAsync({
      projectId: carewalletProjectId
    })
  ).data;
  console.log('ExpoPushToken: ', token);

  return token;
}

// // scheduled push notification
// export async function schedulePushNotification(
//   title: string,
//   body: string,
//   repeat: boolean,
//   date: Date
// ) {
//   // let timeObject = new Date();
//   //const milliseconds = 5 * 1000; // 10 seconds = 10000 milliseconds
//   // timeObject = new Date(timeObject.getTime() + milliseconds);
//   // schedules notification for each weekday selected
//   const id = await Notification.scheduleNotificationAsync({
//     content: {
//       title: title,
//       body: body,
//       data: {}
//     },
//     trigger: {
//       // WeeklyTriggerInput
//       date: Date * //new Date().setUTCSeconds(date.getUTCSeconds() + 5),
// 	  repeats: repeat
//     }
//   });

// }

// use this fucntion to schedule push notifications

export async function scheduleCalendarPushNotification(
  title: string,
  body: string,
  repeat: boolean,
  date: Date,
  typeOfTrigger: string
) {
  try {
    const trigger = new Date(date); // a new Date object is created based on given date

    // default will be daily
    const Trigger: DailyTriggerInput = {
      repeats: true,
      hour: trigger.getUTCHours(),
      minute: trigger.getUTCMinutes()
    };

    if ((typeOfTrigger = 'year')) {
      const Trigger: YearlyTriggerInput = {
        repeats: true,
        month: trigger.getUTCMonth(), // Month index (0-11)
        day: trigger.getUTCDate(), // Day of the month
        hour: trigger.getUTCHours(),
        minute: trigger.getUTCMinutes()
      };
    } else if ((typeOfTrigger = 'week')) {
      const Trigger: WeeklyTriggerInput = {
        weekday: trigger.getUTCDay() === 0 ? 7 : trigger.getUTCDay(),
        hour: trigger.getUTCHours(),
        minute: trigger.getUTCMinutes(),
        type: 'weekly'
      };
    }

    Notification.scheduleNotificationAsync({
      content: {
        title: title,
        body: body
      },
      trigger: Trigger
    });

    console.log('Notification scheduled successfully');
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
}

// INSTANT push notification - whe this function is called with intended title and body,
// a notificaiton will be sent to the user right away (in 1 second)
export async function scheduleInstantPushNotification(
  title: string,
  body: string
) {
  // schedules notification for each weekday selected
  Notification.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: {}
    },
    trigger: {
      seconds: 1
    }
  });
}

// types: WeeklyTriggerInput,
