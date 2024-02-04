import React, { useEffect, useState, useRef } from 'react';
import { Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Notification from 'expo-notifications';
import Constants from 'expo-constants';

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

export async function schedulePushNotification(
  title: string,
  body: string,
  repeat: boolean,
  date: Date
) {
  let timeObject = new Date();
  const milliseconds = 5 * 1000; // 10 seconds = 10000 milliseconds
  timeObject = new Date(timeObject.getTime() + milliseconds);
  // schedules notification for each weekday selected
  const id = await Notification.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: {}
    },
    trigger: {
      // WeeklyTriggerInput
      date: new Date().setUTCSeconds(date.getUTCSeconds() + 5)
    }
  });

  console.log('Notification scheduled for: ', timeObject);
  console.log('Notification id: ', id);
}

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
      seconds: 2
    }
  });
}
