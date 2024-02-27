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

  // gets push notification token
  const token = (
    await Notification.getExpoPushTokenAsync({
      projectId: carewalletProjectId
    })
  ).data;
  console.log('ExpoPushToken: ', token);

  return token;
}

export async function scheduleCalendarPushNotification(
  title: string,
  body: string,
  repeat: boolean,
  date: Date,
  typeOfTrigger: string
) {
  try {
    const triggerDate = new Date(date);

    let Trigger;

    if (repeat) {
      if (typeOfTrigger === 'yearly') {
        Trigger = {
          repeats: true,
          month: triggerDate.getUTCMonth(),
          day: triggerDate.getUTCDate(),
          hour: triggerDate.getUTCHours(),
          minute: triggerDate.getUTCMinutes()
        };
      } else if (typeOfTrigger === 'weekly') {
        Trigger = {
          weekday: triggerDate.getUTCDay() === 0 ? 7 : triggerDate.getUTCDay(),
          hour: triggerDate.getUTCHours(),
          minute: triggerDate.getUTCMinutes()
        };
      } else if (typeOfTrigger === 'daily') {
        Trigger = {
          repeats: true,
          hour: triggerDate.getUTCHours(),
          minute: triggerDate.getUTCMinutes()
        };
      } else {
        // will default to daily
        Trigger = {
          repeats: true,
          hour: triggerDate.getUTCHours(),
          minute: triggerDate.getUTCMinutes()
        };
      }
    } else {
      // One-time notification trigger
      Trigger = new Date(triggerDate);
    }

    await Notification.scheduleNotificationAsync({
      content: {
        title: title,
        body: body
      },
      trigger: Trigger
    });

    console.log('Notification scheduled successfully');
  } catch (error) {
    console.error('Error scheduling notification:', error);
    alert('Failed to schedule notification. Please try again later.');
  }
}

// INSTANT push notification - whe this function is called with intended title and body,
// a notificaiton will be sent to the user right away (in 1 second)
export async function scheduleInstantPushNotification(
  title: string,
  body: string
) {
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

export async function cancelScheduleNotificationI(id: string) {
  Notification.cancelScheduledNotificationAsync(id);
}

export function scheduleDailyNotification() {}
