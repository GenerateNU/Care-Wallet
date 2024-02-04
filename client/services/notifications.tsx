import React, { useEffect, useState, useRef } from 'react';
import { Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Notification from 'expo-notifications';

async function registerForPushNotificationsAsync() {
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

  // gets push notification token
  const token = (await Notification.getExpoPushTokenAsync()).data;
  console.log('ExpoPushToken: ', token);

  return token;
}
