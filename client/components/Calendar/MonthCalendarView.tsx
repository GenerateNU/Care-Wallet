import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { months } from './constants';
import { generateMatrix } from './utils';
import Task from '../Task/Task';

export default function Calendar() {
  const [activeDate, setActiveDate] = useState(new Date());
  const [showTaskList, setShowTaskList] = useState(false);
  const _onPress = (item: number) => {
    if (typeof item !== 'string' && item != -1) {

      const newDate = new Date(activeDate.setDate(item));
      setActiveDate(newDate);
      setShowTaskList(true);
    }
  };

  const matrix = generateMatrix(activeDate);

  const rows = matrix.map((row, rowIndex: number) => {
    const rowItems = row.map((item: any, colIndex: number) => (
      <TouchableOpacity
        key={colIndex}
        onPress={() => _onPress(item)}
        style={{
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: item == activeDate.getDate() ? 'green' : 'white',
        }}
      >
        <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: item == activeDate.getDate() ? 'bold' : 'normal' }}>
          {item != -1 ? item : ''}
        </Text>
      </TouchableOpacity>
    ));

    return (
      <View
        key={rowIndex}
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        {rowItems}
      </View>
    );
  });

  const changeMonth = (n: number) => {
    const newDate = new Date(activeDate.setMonth(activeDate.getMonth() + n));
    setActiveDate(newDate);
  };
  const taskDates = ['task1', 'task2']

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10, borderBottomWidth: 2, borderBottomColor: 'gray' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
          {`${months[activeDate.getMonth()]} ${activeDate.getFullYear()}`}
        </Text>
      </View>
      <View style={{ flex: 1, marginTop: 10 }}>
        {rows}
      </View>

      {/* TaskList view */}
      {showTaskList && (
        <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          {taskDates.map((Task, index) => (
           <View
           key={index}
           style={{
             backgroundColor: 'red', // Background color of the rounded box
             padding: 10,
             top: 250,
             left: 35,
             borderRadius: 10, // Adjust the border radius for rounded corners
             marginBottom: 20, // Adjust the margin at the bottom of each box
             width: '70%', // Adjust the width of the rounded box
             alignItems: 'center', // Center the content inside the box horizontally
           }}
         >
           <Text>{Task}</Text>
         </View>

          ))}
        </View>
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
        <Button title="Previous" color={'#0abb92'} onPress={() => changeMonth(-1)} />
        <Button title="Next" color={'#0abb92'} onPress={() => changeMonth(1)} />
      </View>
    </View>
  );
}
