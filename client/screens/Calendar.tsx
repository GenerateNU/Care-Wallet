import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import _, { Dictionary } from 'lodash';
import moment from 'moment';
import {
  CalendarProvider,
  CalendarUtils,
  TimelineEventProps
} from 'react-native-calendars';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import { MarkedDates } from 'react-native-calendars/src/types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { CalendarTaskListTopNav } from '../components/calendar/CalendarTaskListTopNav';
import { CWExpanableCalendar } from '../components/calendar/ExpandableCalendar';
import { QuickTask } from '../components/calendar/QuickTask';
import { CWTimelineList } from '../components/calendar/TimelineList';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { AppStackNavigation } from '../navigation/types';
import { useFilteredTasks } from '../services/task';
import { Task } from '../types/task';

export default function TimelineCalendarScreen() {
  const navigation = useNavigation<AppStackNavigation>();
  const { group } = useCareWalletContext();
  const [currentDate, setCurrentDate] = useState<string>(
    moment(new Date()).format('YYYY-MM-DD')
  );
  const [month, setCurrentMonth] = useState<string>();

  const { tasks, tasksIsLoading } = useFilteredTasks({
    startDate: moment(month).subtract(30, 'days').format('YYYY-MM-DD'),
    endDate: moment(month).add(30, 'days').format('YYYY-MM-DD'),
    groupID: group.groupID
  });

  const [events, setEvents] = useState<Dictionary<Event[]>>();

  const [quickTasks, setQuickTasks] = useState<string[]>([]);

  const [marked, setMarked] = useState<MarkedDates>({});

  const [currentDayTasks, setCurrentDayTasks] = useState<Task[]>();

  useEffect(() => {
    setCurrentDate(moment(new Date()).format('YYYY-MM-DD'));
    setCurrentMonth(moment(currentDate).format('YYYY-MM-DD'));
  }, []);

  useEffect(() => {
    setCurrentDayTasks(
      tasks?.filter(
        (task) =>
          moment(task.start_date).format('YYYY-MM-DD') ===
          moment(currentDate).format('YYYY-MM-DD')
      )
    );
  }, [currentDate]);

  useEffect(() => {
    setQuickTasks([]);
    setMarked({});
    setEvents(
      _.groupBy(
        tasks?.map((task) => {
          if (task.quick_task) {
            if (
              quickTasks.includes(
                moment(task.start_date).format('YYYY-MM-DD') ?? ''
              )
            ) {
              return {} as TimelineEventProps;
            }

            quickTasks.push(moment(task.start_date).format('YYYY-MM-DD') ?? '');

            return {
              id: `Quick Tasks`,
              start: moment(task.start_date).format('YYYY-MM-DD 00:00:00'),
              end: moment(task.end_date).format('YYYY-MM-DD 00:30:00'),
              title: 'Todays Quick Tasks',
              color: '#ffffff',
              summary: 'Todays Quick Tasks'
            } as TimelineEventProps;
          }

          if (task.quick_task) {
            return {} as Event;
          }

          return {
            id: task.task_id.toString(),
            start: moment(task.start_date).format('YYYY-MM-DD HH:mm:ss'),
            end:
              task.end_date !== task.start_date
                ? moment(task.end_date).format('YYYY-MM-DD HH:mm:ss')
                : moment(task.start_date)
                    .add(30, 'minutes')
                    .format('YYYY-MM-DD HH:mm:ss'),
            title: task.task_title,
            summary: '',
            color: '#ffffff'
          };
        }),
        (e) => CalendarUtils.getCalendarDateString(e?.start)
      )
    );
    let markedList = {} as MarkedDates;

    tasks?.forEach((task) => {
      markedList = {
        ...markedList,
        [moment(task.start_date).format('YYYY-MM-DD')]: {
          marked: true,
          dotColor: '#1A56C4',
          activeOpacity: 1
        }
      };
    });

    setMarked(markedList);
  }, [month, tasks]);

  const onDateChanged = (date: string) => {
    setCurrentDate(date);
    if (moment(date).format('MM') !== moment(month).format('MM')) {
      setCurrentMonth(date);
    }
  };

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpenPress = () => {
    bottomSheetRef.current?.expand();
  };

  if (tasksIsLoading) {
    return (
      <View className="w-[100vw] flex-1 items-center justify-center bg-carewallet-white text-3xl">
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <CalendarTaskListTopNav navigator={navigation} current="Calendar" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <CalendarProvider
          date={moment(currentDate).format('YYYY-MM-DD')}
          onDateChanged={onDateChanged}
          showTodayButton
          disabledOpacity={0.6}
          theme={{
            backgroundColor: 'white',
            selectedDayBackgroundColor: '#1A56C4',
            selectedDotColor: '#ffffff',
            dotColor: '#ffffff',
            todayButtonTextColor: '#1A56C4',
            inactiveDotColor: '#1A56C4'
          }}
        >
          <CWExpanableCalendar marked={marked} current={currentDate} />
          <CWTimelineList
            handleOpenPress={handleOpenPress}
            navigation={navigation}
            events={events}
            tasks={tasks ?? []}
          />
          <View
            className="absolute bottom-5 right-5 h-10 w-10 items-center justify-center rounded-xl bg-carewallet-blue"
            onTouchEnd={() => navigation.navigate('TaskType')}
          >
            <Text className="text-4xl text-carewallet-white">+</Text>
          </View>
        </CalendarProvider>
        <QuickTask
          currentDayTasks={currentDayTasks ?? []}
          navigation={navigation}
          bottomSheetRef={bottomSheetRef}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
