import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { Text, View } from 'react-native';

import BottomSheet, {
  BottomSheetBackdrop,
  TouchableOpacity
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { CWDropdown } from '../components/Dropdown';
import { BackButton } from '../components/nav_buttons/BackButton';
import { CloseButton } from '../components/nav_buttons/CloseButton';
import { TextInputLine } from '../components/task_creation/TextInputLine';
import { TextInputParagraph } from '../components/task_creation/TextInputParagraph';
import { AppStackNavigation } from '../navigation/types';
import { Category, CategoryToTypeMap, TypeOfTask } from '../types/type';

// import { addNewTaskMutation } from '../services/task';
// import { Task } from '../types/task';

enum RepeatOptions {
  NEVER = 'Never',
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly'
}

const RepeatOptionsList: string[] = [
  RepeatOptions.NEVER,
  RepeatOptions.DAILY,
  RepeatOptions.WEEKLY,
  RepeatOptions.MONTHLY
];

type ParamList = {
  mt: {
    taskDetails: string;
  };
};

export default function AddTaskDetails() {
  const navigation = useNavigation<AppStackNavigation>();
  const route = useRoute<RouteProp<ParamList, 'mt'>>();
  const { taskDetails } = route.params;
  const [label, setLabel] = useState('Select Label');
  console.log(label);
  console.log(taskDetails);

  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<null | Category>(
    null
  );
  const [selectedTypes, setSelectedTypes] = useState<TypeOfTask[]>(
    Object.values(TypeOfTask)
  );
  console.log(selectedTypes);

  useEffect(() => {
    setSelectedTypes(
      selectedCategory
        ? CategoryToTypeMap[selectedCategory]
        : Object.values(TypeOfTask)
    );
  }, [selectedCategory]);

  const filters = Object.values(Category).map((filter) => ({
    label: filter,
    value: filter
  }));

  const bottomSheetSnapPoints = useMemo(() => ['60%'], []);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close(); // Close the BottomSheet
    }
  };

  // const snapToIndex = (index: number) =>
  //   bottomSheetRef.current?.snapToIndex(index);

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

  return (
    <GestureHandlerRootView className="bg-carewallet-white pt-10">
      <View className="flex w-full flex-row items-center justify-center">
        <View className="mr-[95px]">
          <BackButton />
        </View>
        <Text className="mr-auto self-center text-center text-carewallet-gray">
          Step 3 of 3
        </Text>
      </View>

      <Text className="text-black ml-3 font-['Manrope'] text-2xl font-bold">
        Task Details
      </Text>

      <View className="mr-2 flex flex-row justify-end">
        {/* This is where the filter button was */}
      </View>

      <View className="h-[68vh]">
        <TouchableOpacity
          style={{
            margin: 2,
            overflow: 'hidden'
          }}
          onPress={() =>
            navigation.navigate('TaskCreation', {
              taskType: JSON.stringify(item)
            })
          }
        >
          <View style={{ flexDirection: 'column' }}>
            <TextInputLine
              title={'Title'}
              onChange={(value) => console.log(value)}
            />
            <TextInputParagraph
              title={'Description'}
              onChange={(value) => console.log(value)}
            />
            <TextInputLine
              title={'Date'}
              onChange={(value) => console.log(value)}
            />
            <TextInputLine
              title={'Time'}
              onChange={(value) => console.log(value)}
            />
            <CWDropdown
              selected={RepeatOptions.NEVER}
              items={RepeatOptionsList}
              setLabel={setLabel}
            />
          </View>
        </TouchableOpacity>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={bottomSheetSnapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
      >
        <View>
          <View className="flex flex-row justify-between">
            <Text className="m-5 text-2xl font-bold">Filter</Text>
            <CloseButton onPress={closeBottomSheet} />
          </View>

          <DropDownPicker
            open={open}
            value={selectedCategory}
            items={filters}
            setOpen={setOpen}
            setValue={setSelectedCategory}
            placeholder="Category"
            onSelectItem={() => {
              closeBottomSheet();
            }}
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
