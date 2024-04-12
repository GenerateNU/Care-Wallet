import React from 'react';

import DatePicker from 'react-native-neat-date-picker';

interface DatePickerProps {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: (arg: { date: Date; dateString: string }) => void;
}

export function StyledDatePicker({
  isVisible,
  onCancel,
  onConfirm
}: DatePickerProps) {
  return (
    <DatePicker
      isVisible={isVisible}
      mode={'single'}
      onCancel={onCancel}
      onConfirm={(arg) => onConfirm(arg as { date: Date; dateString: string })}
      minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
      colorOptions={{
        headerColor: '#ffffff',
        headerTextColor: '#1A56C4',
        changeYearModalColor: '#1A56C4',
        weekDaysColor: '#1A56C4',
        selectedDateBackgroundColor: '#1A56C4',
        confirmButtonColor: '#1A56C4'
      }}
    />
  );
}
