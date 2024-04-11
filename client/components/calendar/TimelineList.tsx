import React from 'react';
import { Text, View } from 'react-native';

import { clsx } from 'clsx';
import moment from 'moment';
import {
  Timeline,
  TimelineEventProps,
  TimelineList,
  TimelineProps
} from 'react-native-calendars';

import Time from '../../assets/Time.svg';
import { AppStackNavigation } from '../../navigation/types';
import { useTaskById } from '../../services/task';
import { Task } from '../../types/task';
import { CategoryIconsMap, TypeToCategoryMap } from '../../types/type';

export function CWTimelineList({
  handleOpenPress,
  navigation,
  events,
  tasks
}: {
  handleOpenPress: () => void;
  navigation: AppStackNavigation;
  events: _.Dictionary<TimelineEventProps[]> | undefined;
  tasks: Task[];
}) {
  const renderItem = (
    timelineProps: React.JSX.IntrinsicAttributes & TimelineProps
  ) => {
    return (
      <Timeline
        {...timelineProps}
        renderEvent={(item) => {
          const { task } = useTaskById(item.id ?? '');
          // if same just show start, if both same time frame (AM/PM) show time frame at end otherwise show all
          const time = `${
            moment(task?.start_date).format('HH DD YYYY') ===
            moment(task?.end_date).format('HH DD YYYY')
              ? moment(task?.start_date).format('h:mm A')
              : `${
                  moment(task?.start_date).format('A') ===
                  moment(task?.end_date).format('A')
                    ? moment(task?.start_date).format('h:mm')
                    : moment(task?.start_date).format('h:mm A')
                } - ${moment(task?.end_date).format('h:mm A')}`
          }`;
          return (
            <View className="flex h-full w-full flex-col rounded-lg border border-carewallet-gray">
              <View
                className={clsx(
                  'pl-3',
                  item.title !== 'Todays Quick Tasks' ? '' : 'my-auto'
                )}
              >
                <Text className="font-carewallet-manrope-semibold text-sm">
                  {item.title}
                </Text>
              </View>
              {item.title === 'Todays Quick Tasks' && (
                <View className="absolute -right-0 -top-1 z-50 h-6 w-6 items-center justify-center rounded-full bg-carewallet-blue">
                  <Text className="text-carewallet-white">
                    {
                      tasks?.filter(
                        (task) =>
                          moment(task.start_date).format('DD-MM-YYYY') ===
                            moment(timelineProps.date?.at(0)).format(
                              'DD-MM-YYYY'
                            ) && task.quick_task
                      ).length
                    }
                  </Text>
                </View>
              )}
              <View className="mt-auto flex flex-row flex-wrap pb-1">
                {item.title !== 'Todays Quick Tasks' && (
                  <View className="flex flex-row items-center pl-2">
                    <Time width={20} height={20} />
                    <Text className="ml-1 font-carewallet-manrope-semibold text-xs">
                      {time}
                    </Text>
                  </View>
                )}
                <View className="ml-auto mr-2">
                  {
                    CategoryIconsMap[
                      TypeToCategoryMap[
                        tasks?.find(
                          (task) => task.task_id.toString() === item.id
                        )?.task_type ?? 'Other'
                      ]
                    ]
                  }
                </View>
              </View>
            </View>
          );
        }}
      />
    );
  };

  function expandEvent(e: TimelineEventProps): void {
    if (e.id === 'Quick Tasks') {
      handleOpenPress();
      return;
    }

    navigation.navigate('TaskDisplay', { id: parseInt(e.id ?? '-1') });
  }
  const timelineProps: Partial<TimelineProps> = {
    format24h: false,
    theme: {},
    onEventPress: (e) => expandEvent(e)
  };

  return (
    <TimelineList
      renderItem={renderItem}
      scrollToNow
      events={events ?? {}}
      timelineProps={timelineProps}
      showNowIndicator
      scrollToFirst
      initialTime={{
        hour: parseInt(moment(Date.now()).format('HH')),
        minutes: parseInt(moment(Date.now()).format('mm'))
      }}
    />
  );
}
