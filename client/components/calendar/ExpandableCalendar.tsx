import React, { ReactNode } from 'react';
import { Text } from 'react-native';

import moment from 'moment';
import { ExpandableCalendar } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';

import Arrow1 from '../../assets/calendar/Arrow 1.svg';
import Arrow2 from '../../assets/calendar/Arrow 2.svg';

export function CWExpanableCalendar({
  marked,
  current
}: {
  marked: MarkedDates;
  current: string;
}) {
  function renderHeader(): ReactNode {
    return (
      <Text className="font-carewallet-montserrat-bold text-xl text-carewallet-blue">
        {moment(current).format('MMMM YYYY')}
      </Text>
    );
  }
  return (
    <ExpandableCalendar
      firstDay={1}
      marking={{ color: 'blue', today: true }}
      markedDates={{
        ...marked,
        [current]: { selected: true, selectedColor: '#1A56C4' }
      }}
      renderHeader={renderHeader}
      renderArrow={(direction) => {
        return direction === 'left' ? (
          <Arrow2 width={20} height={20} />
        ) : (
          <Arrow1 width={20} height={20} />
        );
      }}
    />
  );
}
