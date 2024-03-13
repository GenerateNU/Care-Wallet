import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { FlatList, Pressable, View } from 'react-native';

import BottomSheet, {
  BottomSheetBackdrop,
  TouchableOpacity
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '../components/TaskType/BackButton';
import { CloseButton } from '../components/TaskType/CloseButton';
import { AppStackNavigation } from '../navigation/AppNavigation';
import { Category, categoryToTypeMap, TypeOfTask } from '../types/type';

export function TaskType() {
  const navigation = useNavigation<AppStackNavigation>();

  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<null | Category>(
    null
  );
  const [selectedTypes, setSelectedTypes] = useState<TypeOfTask[]>(
    Object.values(TypeOfTask)
  );

  useEffect(() => {
    setSelectedTypes(
      selectedCategory
        ? categoryToTypeMap[selectedCategory]
        : Object.values(TypeOfTask)
    );
  }, [selectedCategory]);

  const filters = Object.values(Category).map((filter) => ({
    label: filter,
    value: filter
  }));

  const snapPoints = useMemo(() => ['60%'], []);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close(); // Close the BottomSheet
    }
  };

  const snapToIndex = (index: number) =>
    bottomSheetRef.current?.snapToIndex(index);
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
    <GestureHandlerRootView className="mt-10">
      <View className="flex w-full flex-row items-center justify-center">
        <View className="mr-[95px]">
          <BackButton />
        </View>
        <Text className="mr-auto self-center text-center text-carewallet-gray">
          Step 1 of 2
        </Text>
      </View>

      <Text className="text-center text-2xl font-bold">Type of Task</Text>
      <View className="mr-2 flex flex-row justify-end">
        <Button
          className="h-[40px] items-center justify-center rounded-xl text-sm"
          textColor="black"
          mode="outlined"
          onPress={() => snapToIndex(0)}
        >
          Filter
        </Button>
      </View>

      <FlatList
        className="h-full"
        data={selectedTypes}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="m-2 h-[50px] overflow-hidden rounded-xl"
            onPress={() => navigation.navigate('New ' + item + ' Task')}
          >
            <Button
              className="m-2 h-[50px] items-center justify-center rounded-xl"
              textColor="black"
              mode="outlined"
            >
              {item}
            </Button>
          </TouchableOpacity>
        )}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
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
