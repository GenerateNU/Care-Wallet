import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { addDays, format, getDate, isSameDay, startOfWeek } from 'date-fns';

export function WeekCalendar() {
  const [date, setDate] = useState(new Date());
  const [week, setWeek] = useState<WeekDay[]>([]);

  useEffect(() => {
    const weekDays = getWeekDays(date);
    setWeek(weekDays);
  }, [date]);

  return (
    <View style={styles.container}>
      {week.map((weekDay) => {
        const textStyles = [styles.label];
        const touchable = [styles.touchable];

        const sameDay = isSameDay(weekDay.date, date);
        if (sameDay) {
          textStyles.push(styles.selectedLabel);
          touchable.push(styles.selectedTouchable);
        }

        return (
          <View style={styles.weekDayItem} key={weekDay.formatted}>
            <Text style={styles.weekDayText}>{weekDay.formatted}</Text>
            <TouchableOpacity
              onPress={() => (newDate: React.SetStateAction<Date>) =>
                setDate(newDate)
              }
              style={touchable}
            >
              <Text style={textStyles}>{weekDay.day}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10
  },
  weekDayText: {
    color: 'gray',
    marginBottom: 5
  },
  label: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center'
  },
  selectedLabel: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center'
  },
  touchable: {
    borderRadius: 20,
    padding: 7.5,
    height: 35,
    width: 35
  },
  selectedTouchable: {
    borderRadius: 0,
    padding: 0,
    height: 5,
    width: 5,
    fontSize: 14,
    color: 'green',
    textAlign: 'center'
  },
  weekDayItem: {
    alignItems: 'center'
  }
});

type WeekDay = {
  formatted: string;
  date: Date;
  day: number;
};

// get week days
export const getWeekDays = (date: Date): WeekDay[] => {
  const start = startOfWeek(date, { weekStartsOn: 1 });

  const final = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(start, i);
    final.push({
      formatted: format(date, 'EEE'),
      date,
      day: getDate(date)
    });
  }

  return final;
};
