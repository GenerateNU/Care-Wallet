import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import DropDownPicker from 'react-native-dropdown-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

import { TaskInfoComponent } from '../components/TaskInfoCard';
import { CloseButton } from '../components/TaskType/CloseButton';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { getTaskLabels, useFilteredTasks } from '../services/task';
import { Task } from '../types/task';

export default function TaskListScreen() {
  const { group } = useCareWalletContext();
  const [queryParams] = useState({
    groupID: group.groupID ?? -1
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [taskLabels, setTaskLabels] = useState<{ [taskId: string]: string[] }>(
    {}
  );
  const { tasks } = useFilteredTasks({ groupID: queryParams.groupID });

  // Filter button (olivia goated)
  const snapToIndex = (index: number) =>
    bottomSheetRef.current?.snapToIndex(index);
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<null | string>('Test');
  const filters = Object.values(taskLabels || {}).map((filter) => ({
    label: filter[0],
    value: filter[0]
  }));
  const snapPoints = useMemo(() => ['60%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };
  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  // Fetch task labels for each task (2d array list)
  useEffect(() => {
    const fetchTaskLabels = async () => {
      const labels: { [taskId: string]: string[] } = {};
      if (tasks) {
        await Promise.all(
          tasks.map(async (task) => {
            const labelsForTask = await getTaskLabels(task.task_id.toString());
            labels[task?.task_id.toString()] = (labelsForTask ?? []).map(
              (label) => label.label_name
            );
          })
        );
      }
      setTaskLabels(labels);
    };

    if (tasks) {
      fetchTaskLabels();
    }
  }, [tasks]);

  // Filter tasks based on search query in multiple fields and labels
  const filteredTasks = tasks?.filter((task) => {
    const taskFieldsMatch = [
      'task_id',
      'task_status',
      'task_type',
      'notes'
    ].some((field) =>
      task?.[field]
        ?.toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

    const labelMatch =
      !selectedLabel ||
      taskLabels[task?.task_id?.toString()]?.some((label) =>
        label.toLowerCase().includes(selectedLabel.toLowerCase())
      );

    return taskFieldsMatch && labelMatch;
  });

  // Filter tasks based on categories
  const pastDueTasks = tasks?.filter(
    (task) => task?.end_date || '' < String(new Date())
  );
  const inProgressTasks = tasks?.filter(
    (task) => task?.task_status === 'PARTIAL'
  );
  const inFutureTasks = tasks?.filter(
    (task) => (task?.start_date || '') > String(new Date())
  );
  const completeTasks = tasks?.filter(
    (task) => task?.task_status === 'COMPLETE'
  );
  const incompleteTasks = tasks?.filter(
    (task) => task?.task_status === 'INCOMPLETE'
  );

  // Abstraction to render each section
  const renderSection = (tasks: Task[], title: string) => {
    // Don't render the section if there are no tasks
    if (tasks.length === 0) {
      return null;
    }
    return (
      <View>
        <Text className="text-lg text-carewallet-black">{title}</Text>
        {tasks.map((task, index) => {
          return (
            <TaskInfoComponent
              key={index + title}
              name={task?.task_id?.toString() || 'N/A'}
              label={`Label: ${taskLabels[task.task_id.toString()]?.join(', ') || ''}`}
              category={`Category: ${task?.task_type || ''}`}
              type={`Task Status: ${task?.task_status || ''}`}
              date={task?.start_date ? new Date(task.start_date) : new Date()}
            />
          );
        })}
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <ScrollView className="mb-0 flex w-[100vw] pl-4 pr-4 pt-4">
        <View className="mb-5 flex-row items-center">
          <TextInput
            className="mr-4 h-10 flex-1 overflow-hidden rounded-full border-2 border-carewallet-gray px-2"
            placeholder="Search..."
            onChangeText={(text) => {
              setSearchQuery(text);
            }}
          />
          <View className="mr-2 flex flex-row justify-end">
            <Button
              className="h-[40px] items-center justify-center rounded-xl bg-carewallet-gray text-sm"
              textColor="black"
              mode="outlined"
              onPress={() => snapToIndex(0)}
            >
              Filter
            </Button>
          </View>
        </View>
        <Text className="text-xl font-bold text-carewallet-black">
          Task List (all tasks of all time)
        </Text>
        {renderSection(filteredTasks ?? [], 'All Tasks')}
        {renderSection(pastDueTasks ?? [], 'Past Due')}
        {renderSection(inProgressTasks ?? [], 'In Progress')}
        {renderSection(inFutureTasks ?? [], 'Future')}
        {renderSection(completeTasks ?? [], 'Done')}
        {renderSection(incompleteTasks ?? [], 'Marked as Incomplete')}
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        style={{ flex: 1, width: '100%' }}
      >
        <View>
          <View className="flex flex-row justify-between">
            <Text className="m-5 text-2xl font-bold">Filter</Text>
            <CloseButton onPress={closeBottomSheet} />
          </View>

          <DropDownPicker
            open={open}
            value={selectedLabel}
            items={filters}
            setOpen={setOpen}
            setValue={setSelectedLabel}
            placeholder="Labels"
            style={{
              width: '95%',
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: 0,
              borderColor: 'transparent',
              borderBottomColor: 'black'
            }}
          />
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
