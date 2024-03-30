import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { View } from 'react-native';

import BottomSheet, {
  BottomSheetBackdrop,
  TouchableOpacity
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';

import { BackButton } from '../components/nav_buttons/BackButton';
import { CloseButton } from '../components/nav_buttons/CloseButton';
import { AppStackNavigation } from '../navigation/types';
import { Category, CategoryToTypeMap, TypeOfTask } from '../types/type';

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
    <GestureHandlerRootView className="bg-carewallet-white pt-10">
      <View className="flex w-full flex-row items-center">
        <BackButton />

        <Text className="mx-auto pr-20 font-carewallet-manrope-bold text-[18px] text-carewallet-blue">
          Step 1 of 3
        </Text>
      </View>
      <View className="my-5 border-b border-carewallet-lightgray" />

      <View className="flex w-full flex-row items-start justify-between px-4">
        <Text className="font-carewallet-manrope-bold text-[24px]">
          Choose Type of Task
        </Text>
        <Button
          className=" h-14 items-center justify-center rounded-lg bg-carewallet-blue text-carewallet-white"
          textColor="white"
          onPress={() => snapToIndex(0)}
        >
          FILTER
        </Button>
      </View>

      <View className="my-2" />
      <View className="flex h-[68vh] flex-wrap justify-between p-4">
        {selectedTypes.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('TaskCreation', {
                taskType: JSON.stringify(item)
              })
            }
          >
            <View className="border-gray-400 bg-white flex h-24 w-40 flex-col items-start rounded-lg border p-2">
              <Text className="flex-shrink flex-grow">{item}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
