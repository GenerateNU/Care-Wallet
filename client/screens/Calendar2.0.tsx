import React, { Component } from 'react';
import { Alert } from 'react-native';

import filter from 'lodash/filter';
import find from 'lodash/find';
import groupBy from 'lodash/groupBy';
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
export default function TimelineCalendarScreen {
  state = {
    currentDate: getDate(),
    events: EVENTS,
    eventsByDate: groupBy(EVENTS, (e) =>
      CalendarUtils.getCalendarDateString(e.start)
    ) as {
      [key: string]: TimelineEventProps[];
    }
  };

  marked = {
    [`${getDate(-1)}`]: { marked: true },
    [`${getDate()}`]: { marked: true },
    [`${getDate(1)}`]: { marked: true },
    [`${getDate(2)}`]: { marked: true },
    [`${getDate(4)}`]: { marked: true }
  }; // what dates have event under them and which ones do not
    // could be a useeffect... extract date from a task and filter which ones have tasks...


  onDateChanged = (date: string, source: string) => {
    console.log('TimelineCalendarScreen onDateChanged: ', date, source);
    this.setState({ currentDate: date });
  };

  onMonthChange = (month: DateData, updateSource: UpdateSources) => {
    console.log('TimelineCalendarScreen onMonthChange: ', month, updateSource);
  };

  createNewEvent: TimelineProps['onBackgroundLongPress'] = (
    timeString,
    timeObject
  ) => {
    const { eventsByDate } = this.state;
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
        eventsByDate[timeObject.date] = [
          ...eventsByDate[timeObject.date],
          newEvent
        ];
        this.setState({ eventsByDate });
      } else {
        eventsByDate[timeObject.date] = [newEvent];
        this.setState({ eventsByDate: { ...eventsByDate } });
      }
    }
  };

  approveNewEvent: TimelineProps['onBackgroundLongPressOut'] = (
    _timeString,
    timeObject
  ) => {
    const { eventsByDate } = this.state;

    Alert.prompt('New Event', 'Enter event title', [
      {
        text: 'Cancel',
        onPress: () => {
          if (timeObject.date) {
            eventsByDate[timeObject.date] = filter(
              eventsByDate[timeObject.date],
              (e) => e.id !== 'draft'
            );

            this.setState({
              eventsByDate
            });
          }
        }
      },
      {
        text: 'Create',
        onPress: (eventTitle) => {
          if (timeObject.date) {
            const draftEvent = find(eventsByDate[timeObject.date], {
              id: 'draft'
            });
            if (draftEvent) {
              draftEvent.id = undefined;
              draftEvent.title = eventTitle ?? 'New Event';
              draftEvent.color = 'lightgreen';
              eventsByDate[timeObject.date] = [
                ...eventsByDate[timeObject.date]
              ];

              this.setState({
                eventsByDate
              });
            }
          }
        }
      }
    ]);
  };

  private timelineProps: Partial<TimelineProps> = {
    format24h: false,
    onBackgroundLongPress: this.createNewEvent,
    onBackgroundLongPressOut: this.approveNewEvent,
    // scrollToFirst: true,
    // start: 0,
    // end: 24,
    unavailableHours: [
      { start: 0, end: 6 },
      { start: 22, end: 24 }
    ],
    onEventPress: (e) => expandEvent(e),
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24
  };

  render() {
    const { currentDate, eventsByDate } = this.state;

    return (
      <CalendarProvider
        date={currentDate}
        onDateChanged={onDateChanged}
        onMonthChange={this.onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
        // numberOfDays={3}
      >
        <ExpandableCalendar firstDay={1} markedDates={this.marked} />
        <TimelineList
          events={eventsByDate}
          timelineProps={this.timelineProps}
          showNowIndicator
          // scrollToNow
          scrollToFirst
          initialTime={INITIAL_TIME}
        />
      </CalendarProvider>
    );
  }
}
function expandEvent(e: TimelineEventProps): void {
  console.log('expand event', e.title);
}
