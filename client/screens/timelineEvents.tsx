import { CalendarUtils } from 'react-native-calendars';

export const EVENT_COLOR = '#e6add8';
const today = new Date();
export const getDate = (offset = 0) =>
  CalendarUtils.getCalendarDateString(
    new Date().setDate(today.getDate() + offset)
  );
