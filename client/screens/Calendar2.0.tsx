import React, { useState } from 'react';
import { Alert } from 'react-native';

import _ from 'lodash';
import {
  CalendarProvider,
  CalendarUtils,
  DateData,
  ExpandableCalendar,
  TimelineEventProps,
  TimelineList,
  TimelineProps
} from 'react-native-calendars';
import { UpdateSources } from 'react-native-calendars/src/expandableCalendar/commons';

import { getDate, timelineEvents } from './timelineEvents';

const INITIAL_TIME = { hour: 9, minutes: 0 };
const EVENTS: TimelineEventProps[] = timelineEvents;

export function TimelineCalendarScreen() {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [eventsByDate, setEventsByDate] = useState(
    _.groupBy(EVENTS, (e) => CalendarUtils.getCalendarDateString(e.start))
  );

  const marked = {
    [`${getDate(-1)}`]: { marked: true },
    [`${getDate()}`]: { marked: true },
    [`${getDate(1)}`]: { marked: true },
    [`${getDate(2)}`]: { marked: true },
    [`${getDate(4)}`]: { marked: true }
  };

  const onDateChanged = (date: string, source: string) => {
    console.log('TimelineCalendarScreen onDateChanged: ', date, source);
    setCurrentDate(date);
  };

  const onMonthChange = (month: DateData, updateSource: UpdateSources) => {
    console.log('TimelineCalendarScreen onMonthChange: ', month, updateSource);
  };

  const createNewEvent: TimelineProps['onBackgroundLongPress'] = (
    timeString,
    timeObject
  ) => {
    const hourString = `${(timeObject.hour + 1).toString().padStart(2, '0')}`;
    const minutesString = `${timeObject.minutes.toString().padStart(2, '0')}`;

    const newEvent = {
      id: 'draft',
      start: `${timeString}`,
      end: `${timeObject.date} ${hourString}:${minutesString}:00`,
      title: 'New Event',
      color: 'white'
    };

    if (timeObject.date) {
      if (eventsByDate[timeObject.date]) {
        setEventsByDate((prevEvents) => ({
          ...prevEvents,
          [timeObject.date as string]: [
            ...prevEvents[timeObject.date as string],
            newEvent
          ]
        }));
      } else {
        setEventsByDate((prevEvents) => ({
          ...prevEvents,
          [timeObject.date as string]: [newEvent]
        }));
      }
    }
  };

  const approveNewEvent: TimelineProps['onBackgroundLongPressOut'] = (
    _timeString,
    timeObject
  ) => {
    Alert.prompt('New Event', 'Enter event title', [
      {
        text: 'Cancel',
        onPress: () => {
          if (timeObject.date) {
            setEventsByDate((prevEvents) => ({
              ...prevEvents,
              [timeObject.date as string]: _.filter(
                prevEvents[timeObject.date as string],
                (e) => e.id !== 'draft'
              )
            }));
          }
        }
      },
      {
        text: 'Create',
        onPress: (eventTitle) => {
          if (timeObject.date) {
            const draftEvent = _.find(eventsByDate[timeObject.date], {
              id: 'draft'
            });
            if (draftEvent) {
              draftEvent.id = undefined;
              draftEvent.title = eventTitle ?? 'New Event';
              draftEvent.color = 'lightgreen';
              setEventsByDate((prevEvents) => ({
                ...prevEvents,
                [timeObject.date as string]: [
                  ...prevEvents[timeObject.date as string]
                ]
              }));
            }
          }
        }
      }
    ]);
  };

  const timelineProps: Partial<TimelineProps> = {
    format24h: false,
    onBackgroundLongPress: createNewEvent,
    onBackgroundLongPressOut: approveNewEvent,
    unavailableHours: [
      { start: 0, end: 6 },
      { start: 22, end: 24 }
    ],
    onEventPress: (e) => expandEvent(e),
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24
  };

  return (
    <CalendarProvider
      date={currentDate}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      showTodayButton
      disabledOpacity={0.6}
    >
      <ExpandableCalendar firstDay={1} markedDates={marked} />
      <TimelineList
        events={eventsByDate}
        timelineProps={timelineProps}
        showNowIndicator
        scrollToFirst
        initialTime={INITIAL_TIME}
      />
    </CalendarProvider>
  );
}

function expandEvent(e: TimelineEventProps): void {
  console.log('expand event', e.title);
}

// export default TimelineCalendarScreen;
