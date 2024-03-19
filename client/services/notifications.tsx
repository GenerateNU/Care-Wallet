import { Platform } from 'react-native';

import Constants from 'expo-constants';
import { isDevice } from 'expo-device';
import {
  AndroidImportance,
  cancelScheduledNotificationAsync,
  getExpoPushTokenAsync,
  requestPermissionsAsync,
  scheduleNotificationAsync,
  setNotificationChannelAsync
} from 'expo-notifications';

export async function registerForPushNotificationsAsync() {
  // checks that this is a physical device
  if (!isDevice) {
    alert(
      'Must use physical device for Push Notifications. Must be ios or android.'
    );
    return null;
  }

  // ask user for notification permissions
  const { status } = await requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission to receive push notifications was denied');
    return null;
  }

  // android needs notification channel with highest importance so notificaiton goes through always
  if (Platform.OS === 'android') {
    setNotificationChannelAsync('default', {
      name: 'default',
      importance: AndroidImportance.MAX
    });
  }

  const carewalletProjectId = Constants.easConfig?.projectId;

  // gets push notification token
  const token = (
    await getExpoPushTokenAsync({
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
  // OPTIONS for typeOfTrigger:
  // NOTE: IN UTC TIME (Must convert time zone you are in to UTC)
  // 1. Yearly: { repeats: true, month: [0-11], day: [1-31], hour: [0-23], minute: [0-59] }
  //    - Repeats annually on the specified month, day, hour, and minute.
  // 2. Weekly: { weekday: [1-7], hour: [0-23], minute: [0-59] }
  //    - Repeats weekly on the specified weekday, hour, and minute. (1 for Sunday, 2 for Monday, ..., 7 for Saturday)
  // 3. Daily: { repeats: true, hour: [0-23], minute: [0-59] }
  //    - Repeats daily at the specified hour and minute.
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

    await scheduleNotificationAsync({
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

// INSTANT push notification - when this function is called with intended title and body,
// a notificaiton will be sent to the user right away (in 1 second)
export async function scheduleInstantPushNotification(
  title: string,
  body: string
) {
  scheduleNotificationAsync({
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

export async function cancelScheduleNotificationID(id: string) {
  cancelScheduledNotificationAsync(id);
}

// this function can be used schedule a daily notification
// takes in title, body, the hour and minute to be repeated at, and date to begin repeating
export async function scheduleDailyNotification(
  title: string,
  body: string,
  hour: number,
  minutes: number,
  dateToStart: Date
) {
  // Get the current date
  const currentDate = dateToStart;

  // Set the time
  currentDate.setHours(hour);
  currentDate.setMinutes(minutes);

  // Schedule the daily notification
  await scheduleCalendarPushNotification(
    title,
    body,
    true, // repeat daily
    currentDate,
    'daily' // specify the type of trigger as 'daily'
  );
}
