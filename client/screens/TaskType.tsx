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
import {
  GestureHandlerRootView,
  ScrollView
} from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';

import Financial from '../assets/financial.svg';
import Home from '../assets/home.svg';
import Other from '../assets/other.svg';
import Personal from '../assets/personal.svg';
import RedPill from '../assets/task-type-icon-pill.svg';
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

  const TypeToCategoryMap: Record<string, Category> = {
    'Medication Management': Category.HEALTH,
    Diet: Category.HOME,
    Grooming: Category.PERSONAL
  };

  function getCards(item: TypeOfTask): string[] {
    const card = TypeToCategoryMap[item];

    switch (card) {
      case Category.HEALTH:
        return ['Medication Management', 'Physician Appointments'];
      case Category.FINANCIAL:
        return ['Health Insurance'];
      case Category.HOME:
        return ['Diet', 'Activities'];
      case Category.PERSONAL:
        return [
          'Grooming',
          'Shopping & Errands',
          'Family Conversations',
          'Pay Bills'
        ];
      default:
        return [];
    }
  }

  function getCategoryIcon(category: Category): JSX.Element | null {
    switch (category) {
      case Category.HEALTH:
        return <RedPill />;
      case Category.PERSONAL:
        return <Personal />;
      case Category.HOME:
        return <Home />;
      case Category.FINANCIAL:
        return <Financial />;
      case Category.OTHER:
        return <Other />;
      default:
        return null;
    }
  }

  function getCategoryTitle(item: TypeOfTask): string {
    const category = TypeToCategoryMap[item];
    switch (category) {
      case Category.HEALTH:
        return 'Health & Medical';
      case Category.PERSONAL:
        return 'Personal';
      case Category.HOME:
        return 'Home & Lifestyle';
      case Category.FINANCIAL:
        return 'Financial & Legal';
      case Category.OTHER:
        return 'Other';
      default:
        return ''; // Default case if item doesn't match any category
    }
  }

  return (
    <GestureHandlerRootView className="relative">
      <ScrollView>
        <View className="flex w-full flex-row items-center">
          <BackButton />

          <Text className="mx-auto pr-20 font-carewallet-manrope-bold text-[18px] text-carewallet-blue">
            Step 1 of 3
          </Text>
        </View>
        <View className="absolute top-16 w-full border-t border-carewallet-gray" />
        <View className="my-2" />

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

        <View className="flex w-[90vw] justify-between p-3">
          {selectedTypes.map((item, index) => (
            <View key={index}>
              <Text className="mx-1 p-2">{getCategoryTitle(item)}</Text>
              <View className="w-[100vw] flex-row flex-wrap">
                {getCards(item).map((item2, index2) => (
                  <TouchableOpacity
                    key={index2}
                    className="border-gray-400 bg-white m-2 h-24 w-40 items-start rounded-lg border p-2"
                    onPress={() =>
                      navigation.navigate('TaskCreation', {
                        taskType: JSON.stringify(item)
                      })
                    }
                  >
                    <View className="border-gray-400 bg-white m-2 h-24 w-40 items-start rounded-lg border p-2">
                      {getCategoryIcon(TypeToCategoryMap[item])}
                      <Text>{item2}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
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
      </ScrollView>
    </GestureHandlerRootView>
  );
}
