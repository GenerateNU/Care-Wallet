import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  StatusBar,
  SafeAreaView
} from 'react-native';

import MonthCalendarView from '../components/Calendar/MonthCalendarView';

export default function Calendar() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-8">
        <View className="flex-1 justify-center align-middle">
          <View className="bg-white rounded-xl">
            <MonthCalendarView />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
