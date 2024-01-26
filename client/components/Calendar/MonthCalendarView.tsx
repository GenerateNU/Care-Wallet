import * as React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { months } from './constants';
import { generateMatrix } from './utils';

export default function Calendar() {
  const [activeDate, setActiveDate] = React.useState(new Date());

  const _onPress = (item: number) => {
    if (typeof item !== 'string' && item != -1) {
      const newDate = new Date(activeDate.setDate(item));
      setActiveDate(newDate);
    }
  };

  const matrix = generateMatrix(activeDate);

  let rows = [];

  rows = matrix.map((row, rowIndex: number) => {
    let rowItems = row.map((item: any, colIndex: number) => {
      return (
        <TouchableOpacity
          key={colIndex}
          onPress={() => _onPress(item)}
          className={
            'h-10 w-10 justify-center align-middle ' +
            `${item == activeDate.getDate() ? 'bg-green-400 rounded-3xl' : 'bg-white'}`
          }
        >
          <Text
            className={
              'text-center text-small ' +
              `${item == activeDate.getDate() ? 'font-bold' : 'font-normal'}`
            }
          >
            {item != -1 ? item : ''}
          </Text>
        </TouchableOpacity>
      );
    });

    return (
      <View
        key={rowIndex}
        className="flex-1 flex-row justify-around align-middle"
      >
        {rowItems}
      </View>
    );
  });

  const changeMonth = (n: number) => {
    const newDate = new Date(activeDate.setMonth(activeDate.getMonth() + n));
    console.log(newDate);
    setActiveDate(newDate);
  };

  return (
    <View className="p-3 border-b-2 border-gray-300">
      <Text className="font-bold text-3xl text-center">
        {`${months[activeDate.getMonth()]} ${activeDate.getFullYear()}`}
      </Text>
      <View>{rows}</View>
      <View className="flex-1 flex-row justify-around mt-2">
        <View className="flex-1 mx-2">
          <Button
            title="Previous"
            color={'#0abb92'}
            onPress={() => changeMonth(-1)}
          />
        </View>
        <View className="flex-1 mx-2">
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
