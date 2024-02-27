import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

//import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '../components/BackButton';
//import { AppStackNavigation } from '../navigation/AppNavigation';
import { TypeOfTask } from '../types/type';

export function TaskType() {
  // const navigation = useNavigation<AppStackNavigation>();

  // const [open, setOpen] = useState(false);
  // const [selectedCategory, setSelectedCategory] = useState<null | Category>(
  //   null
  // );
  const [selectedTypes] = useState<TypeOfTask[]>(Object.values(TypeOfTask));

  // useEffect(() => {
  //   setSelectedTypes(
  //     selectedCategory
  //       ? categoryToTypeMap[selectedCategory]
  //       : Object.values(TypeOfTask)
  //   );
  // }, [selectedCategory]);

  // const filters = Object.values(Category).map((filter) => ({
  //   label: filter,
  //   value: filter
  // }));

  return (
    <SafeAreaView>
      <View className="my-0 flex w-full flex-row items-center justify-center">
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
        >
          Filter
        </Button>
      </View>

      {/* <DropDownPicker
        open={open}
        value={selectedCategory}
        items={filters}
        setOpen={setOpen}
        setValue={setSelectedCategory}
      /> */}

      <ScrollView style={{ marginTop: 10, marginBottom: 150 }}>
        {selectedTypes.map((type) => (
          <Button
            className="m-2 h-[50px] items-center justify-center rounded-xl"
            textColor="black"
            key={type}
            mode="outlined"
            onPress={() => null} // TODO other screens should have this name
          >
            {type}
          </Button>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
