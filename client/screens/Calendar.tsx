import * as React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';

import MonthCalendarView from '../components/Calendar/MonthCalendarView';
import TaskView from '../components/Task/TaskView';

export default function Calendar() {
  // TODO: Thinking here we could prob extract the set state for the current date, and push it to the task view to get the tasks for that date
  // TODO: Ability to change to different calendar views, (maybe should wait until designs come)
  return (
    <SafeAreaView>
      <MonthCalendarView />
      <ScrollView>
        <TaskView />
      </ScrollView>
    </SafeAreaView>
  );
}
