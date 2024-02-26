import React, { useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';

import { clsx } from 'clsx';

import { months } from './constants';
import { generateMatrix, moderateScale } from './utils';

export function MonthCalendarView() {
  const [activeDate, setActiveDate] = useState(new Date());

  const _onPress = (item: number | string) => {
    if (typeof item !== 'string' && item != -1) {
      const newDate = new Date(activeDate.setDate(item));
      setActiveDate(newDate);
    }
  };

  const rows = generateRows({ activeDate, _onPress });

  const changeMonth = (n: number) => {
    const newMonthDate = new Date(
      activeDate.setMonth(activeDate.getMonth() + n)
    );
    newMonthDate.setDate(1);
    setActiveDate(newMonthDate);
  };

  return (
    <View className="border-gray-300 h-[46vh] border-b-2 p-3">
      <Text
        className={`h-[4vh] text-center font-bold`}
        style={{ fontSize: moderateScale(24) }}
      >
        {`${months[activeDate.getMonth()]} ${activeDate.getFullYear()}`}
      </Text>
      <View className="h-72 uppercase">{rows}</View>
      <View className="mt-2 flex-1 flex-row justify-around">
        <View className="mx-2 flex-1">
          <Button
            title="Previous"
            color={'#0abb92'}
            onPress={() => changeMonth(-1)}
          />
        </View>
        <View className="mx-2 flex-1">
          <Button
            title="Next"
            color={'#0abb92'}
            onPress={() => changeMonth(+1)}
          />
        </View>
      </View>
    </View>
  );
}

function generateRows({
  activeDate,
  _onPress
}: {
  activeDate: Date;
  _onPress: (item: string | number) => void;
}) {
  const matrix = generateMatrix(activeDate);

  return matrix.map((row, rowIndex: number) => {
    const rowItems = row.map((item, colIndex: number) => {
      return (
        <TouchableOpacity
          key={colIndex}
          onPress={() => _onPress(item)}
          className={clsx(
            'h-10 w-10 justify-center align-middle',
            item == activeDate.getDate()
              ? 'bg-green-400 rounded-3xl'
              : 'bg-grey-300'
          )}
        >
          <Text
            className={clsx(
              'text-center',
              item == activeDate.getDate() ? 'font-bold' : 'font-normal'
            )}
          >
            {item != -1 ? item : ''}
          </Text>
        </TouchableOpacity>
      );
    });

    return (
      <View
        key={rowIndex}
        className="flex flex-1 flex-row justify-around align-middle"
      >
        {rowItems}
      </View>
    );
  });
}
