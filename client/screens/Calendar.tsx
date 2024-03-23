import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useNavigation } from '@react-navigation/native';
import _, { Dictionary } from 'lodash';
import moment from 'moment';
import {
  CalendarProvider,
  CalendarUtils,
  ExpandableCalendar,
  TimelineEventProps,
  TimelineList,
  TimelineProps
} from 'react-native-calendars';
import { Event } from 'react-native-calendars/src/timeline/EventBlock';
import { MarkedDates } from 'react-native-calendars/src/types';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

import { QuickTaskCard } from '../components/QuickTaskCard';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { AppStackNavigation } from '../navigation/types';
import { useFilteredTasks } from '../services/task';
import { Task } from '../types/task';
import { EVENT_COLOR, getDate } from './timelineEvents';

export default function TimelineCalendarScreen() {
  const navigation = useNavigation<AppStackNavigation>();
  const { group } = useCareWalletContext();
  const [currentDate, setCurrentDate] = useState<string>(getDate());
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
    setCurrentMonth(moment(currentDate).format('YYYY-MM-DD'));
  }, []);

  useEffect(() => {
    console.log('currentDate', currentDate);
    setCurrentDayTasks(
      tasks?.filter(
        (task) =>
          moment(task.start_date).format('YYYY-MM-DD') ===
          moment(currentDate).format('YYYY-MM-DD')
      )
    );
  }, [currentDate]);

  useEffect(() => {
    console.log(JSON.stringify(tasks, null, 2));
    setQuickTasks([]);
    setMarked({});
    setEvents(
      _.groupBy(
        tasks?.map((task) => {
          if (task.quick_task) {
            console.log('quick task', JSON.stringify(task, null, 2));

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
              end: moment(task.end_date).format('YYYY-MM-DD 01:00:00'),
              title: 'Todays Quick Tasks',
              color: '#4DB8A6',
              summary: 'Todays Quick Tasks'
            } as TimelineEventProps;
          }

          if (task.quick_task) {
            return {} as Event;
          }

          return {
            id: task.task_id.toString(),
            start: moment(task.start_date).format('YYYY-MM-DD hh:mm:ss'),
            end: moment(task.end_date).format('YYYY-MM-DD hh:mm:ss'),
            title: task.task_title,
            summary: task.task_status,
            color: EVENT_COLOR
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
          marked: true
        }
      };
    });

    console.log('markedList', markedList);

    setMarked(markedList);
  }, [month, tasks]);

  const onDateChanged = (date: string) => {
    setCurrentDate(date);
    if (moment(date).format('MM') !== moment(month).format('MM')) {
      setCurrentMonth(date);
    }
  };

  function expandEvent(e: TimelineEventProps): void {
    console.log('expandEvent', e.title);
    if (e.id === 'Quick Tasks') {
      handleOpenPress();
      return;
    }

    navigation.navigate('TaskDisplay', { id: parseInt(e.id ?? '-1') });
  }

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const snapPoints = useMemo(() => ['70%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const timelineProps: Partial<TimelineProps> = {
    format24h: true,
    unavailableHours: [
      // { start: 0, end: 6 },
      // { start: 22, end: 24 }
    ],
    onEventPress: (e) => expandEvent(e),
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24
  };

  const handleOpenPress = () => {
    bottomSheetRef.current?.expand();
    console.log(tasks);
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CalendarProvider
        date={moment(currentDate).format('YYYY-MM-DD')}
        onDateChanged={onDateChanged}
        showTodayButton
        disabledOpacity={0.6}
      >
        <ExpandableCalendar firstDay={1} markedDates={marked} />
        <TimelineList
          events={events ?? ({} as Dictionary<Event[]>)}
          timelineProps={timelineProps}
          showNowIndicator
          scrollToFirst
          initialTime={{
            hour: parseInt(moment(Date.now()).format('hh')),
            minutes: parseInt(moment(Date.now()).format('mm'))
          }}
        />
      </CalendarProvider>

      <BottomSheet
        index={-1}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
      >
        <Text className="ml-6 text-lg font-bold">Today&apos;s Quick Tasks</Text>
        <View style={{ height: 10 }} />
        <FlatList
          data={currentDayTasks?.filter((task) => task.quick_task)}
          className="w-full align-middle"
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          keyExtractor={(item) => item.task_id.toString()}
          renderItem={({ item }) => (
            <QuickTaskCard name={item.notes} label={item.task_type} />
          )}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
