import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  GestureHandlerRootView,
  ScrollView
} from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CWDropdown } from '../components/Dropdown';
import { BackButton } from '../components/nav_buttons/BackButton';
import { ForwardButton } from '../components/nav_buttons/ForwardButton';
import { StyledDatePicker } from '../components/task_creation/DatePicker';
import { DateTimeDisplay } from '../components/task_creation/DateTimeDisplay';
import { RadioGroup } from '../components/task_creation/RadioGroup';
import { TextInputLine } from '../components/task_creation/TextInputLine';
import { TextInputParagraph } from '../components/task_creation/TextInputParagraph';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { AppStackNavigation } from '../navigation/types';
import { useLabelsByGroup } from '../services/label';

enum RepeatOptions {
  NONE = 'NONE',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY'
}

type ParamList = {
  mt: {
    taskCreation: string;
  };
};

export default function AddTaskDetails() {
  const { group } = useCareWalletContext();
  const { labels } = useLabelsByGroup(group.groupID);
  const route = useRoute<RouteProp<ParamList, 'mt'>>();
  const navigation = useNavigation<AppStackNavigation>();
  const { taskCreation } = route.params;

  const [values, setValues] = useState<{ [key: string]: string }>({});
  const handleChange = (key: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: value
    }));
  };

  // Start time
  const [startTime, setStartTime] = useState(new Date());
  const [displayedStartTime, setDisplayedStartTime] = useState('SELECT START');
  const [startTimePickerVisible, setStartTimePickerVisible] = useState(false);

  const handleConfirmStartTime = (date: Date) => {
    setStartTime(date);
    values['Start time'] = date.toLocaleTimeString();

    if (!values['End time']) {
      const oneHourLater = new Date(date.getTime() + 60 * 60 * 1000);

      setDisplayedEndTime(
        oneHourLater.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric'
        })
      );
      values['End time'] = oneHourLater.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
      });
    }

    setDisplayedStartTime(
      date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
      }) + '*'
    );
    setStartTimePickerVisible(false);
  };

  // End time
  const [endTime, setEndTime] = useState(new Date());
  const [displayedEndTime, setDisplayedEndTime] = useState('SELECT END');
  const [endTimePickerVisible, setEndTimePickerVisible] = useState(false);

  const handleConfirmEndTime = (date: Date) => {
    setEndTime(date);
    values['End time'] = date.toLocaleTimeString();
    setDisplayedEndTime(
      date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
      })
    );
    setEndTimePickerVisible(false);
  };

  // Task repeat
  const [repeat, setRepeat] = useState('NONE');
  useEffect(() => {
    handleChange('Repeat', repeat);
  }, [repeat]);

  const [showEndRepeatDatePicker, setShowEndRepeatDatePicker] = useState(false);
  const openEndRepeatDatePicker = () => setShowEndRepeatDatePicker(true);
  const [endRepeatDate, setEndRepeatDate] = useState('SELECT DATE');
  const onCancelEndRepeatDate = () => {
    setShowEndRepeatDatePicker(false);
  };

  const onConfirmEndRepeatDate = (output: {
    date: Date;
    dateString: string;
  }) => {
    setShowEndRepeatDatePicker(false);
    handleChange('End Repeat', output.dateString);
    const formattedDate = output.date
      .toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
      .toUpperCase();
    setEndRepeatDate(formattedDate);
  };

  // Task label
  const [label, setLabel] = useState('SELECT');
  useEffect(() => {
    handleChange('Label', label);
  }, [label]);

  // Assigned to task
  const [assignedTo, setAssignedTo] = useState('SELECT');
  useEffect(() => {
    handleChange('Assigned To', assignedTo);
  }, [assignedTo]);

  // Task date
  const [showTaskDatePicker, setShowTaskDatePicker] = useState(false);
  const openTaskDatePicker = () => setShowTaskDatePicker(true);
  const [taskDate, setTaskDate] = useState('SELECT DATE');
  const onCancelTaskDate = () => {
    setShowTaskDatePicker(false);
  };
  const onConfirmTaskDate = (output: { date: Date; dateString: string }) => {
    setShowTaskDatePicker(false);
    handleChange('Date', output.dateString);
    const formattedDate =
      output.date
        .toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
        .toUpperCase() + '*';
    setTaskDate(formattedDate);
  };

  return (
    <SafeAreaView className="flex-1 bg-carewallet-white">
      <GestureHandlerRootView>
        <View className="flex w-full flex-row items-center border-b border-carewallet-gray bg-carewallet-white">
          <BackButton />
          <Text className="mx-auto my-7 pr-20 font-carewallet-manrope-bold text-lg text-carewallet-blue">
            Step 3 of 3
          </Text>
        </View>
        <ScrollView className="h-[90%]">
          <Text className="mt-3 px-4 font-carewallet-manrope-bold text-[24px]">
            Task Details
          </Text>
          <TextInputLine
            title={'Title'}
            onChange={(value) => handleChange('Title', value)}
          />
          <TextInputParagraph
            title={'Description'}
            onChange={(value) => handleChange('Description', value)}
          />
          <View className="m-4 mb-0">
            <Text className="mb-2 font-carewallet-montserrat-semibold">
              {'REPEAT*'}
            </Text>
            <CWDropdown
              selected={repeat}
              items={Object.values(RepeatOptions)}
              setLabel={setRepeat}
            />
            {values['Repeat'] !== 'NONE' && (
              <DateTimeDisplay
                title={'End Repeat'}
                elements={[endRepeatDate]}
                actions={[openEndRepeatDatePicker]}
              />
            )}
          </View>

          <RadioGroup
            title={'SCHEDULE TYPE*'}
            options={['Quick Task', 'Event']}
            themeColor="bg-carewallet-blue"
            onChange={(value) => handleChange('Schedule Type', value)}
          />

          {/* If Quick Task is selected */}
          {values['Schedule Type'] === 'Quick Task' && (
            <DateTimeDisplay
              title={'Date'}
              elements={[taskDate]}
              actions={[openTaskDatePicker]}
            />
          )}
          {/* If Event is selected */}
          {values['Schedule Type'] === 'Event' && (
            <View>
              <DateTimeDisplay
                title={'Date'}
                elements={[taskDate]}
                actions={[openTaskDatePicker]}
              />
              <DateTimeDisplay
                title={'Time'}
                elements={[displayedStartTime, displayedEndTime]}
                actions={[
                  () => setStartTimePickerVisible(true),
                  () => {
                    if (values['Start time'] !== 'SELECT START') {
                      setEndTimePickerVisible(true);
                    }
                  }
                ]}
              />
              <DateTimePickerModal
                date={startTime}
                isVisible={startTimePickerVisible}
                mode={'time'}
                onConfirm={handleConfirmStartTime}
                onCancel={() => setStartTimePickerVisible(false)}
              />
              <DateTimePickerModal
                date={endTime}
                isVisible={endTimePickerVisible}
                mode={'time'}
                onConfirm={handleConfirmEndTime}
                onCancel={() => setEndTimePickerVisible(false)}
              />
            </View>
          )}
          <View className="mx-4 mb-0 mt-1">
            <Text className="mb-2 font-carewallet-montserrat-semibold">
              {'LABEL'}
            </Text>
            <CWDropdown
              selected={label}
              // TODO: Check this
              items={labels?.map((label) => label.label_name) || []}
              setLabel={setLabel}
            />
          </View>
          <View className="mx-4 mb-0 mt-1">
            <Text className="mb-2 font-carewallet-montserrat-semibold">
              {'ASSIGN'}
            </Text>
            <CWDropdown
              selected={assignedTo}
              // TODO: Get members for this group
              items={[]}
              setLabel={setAssignedTo}
            />
          </View>
          <View className="m-2 flex flex-row justify-end">
            <ForwardButton
              onPress={() => {
                if (
                  values['Schedule Type'] &&
                  values['Date'] &&
                  (values['Schedule Type'] === 'Quick Task' || values['Time'])
                ) {
                  // TODO: where to navigate to after task creation?
                  navigation.navigate('TaskList');
                  // TODO: create new task in database, assign to 'Assigned To'
                  // task is added to calendar and task list by proxy?
                }

                console.log(
                  'Task fields: ',
                  taskCreation,
                  JSON.stringify(values)
                );
              }}
            />
          </View>
        </ScrollView>
      </GestureHandlerRootView>
      <StyledDatePicker
        isVisible={showTaskDatePicker}
        onCancel={onCancelTaskDate}
        onConfirm={onConfirmTaskDate}
      />
      <StyledDatePicker
        isVisible={showEndRepeatDatePicker}
        onCancel={onCancelEndRepeatDate}
        onConfirm={onConfirmEndRepeatDate}
      />
    </SafeAreaView>
  );
}
