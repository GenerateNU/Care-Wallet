import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '../components/BackButton';
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

  return (
    <SafeAreaView>
      <View className="flex flex-row items-center justify-center">
        <BackButton />
        <Text className="text-carewallet-gray">Step 1 of 2</Text>
      </View>
      <Text className="m-2 text-center text-xl">Type of Task</Text>
      <DropDownPicker
        open={open}
        value={selectedCategory}
        items={filters}
        setOpen={setOpen}
        setValue={setSelectedCategory}
      />
      <ScrollView style={{ marginTop: 10, marginBottom: 130 }}>
        {selectedTypes.map((type) => (
          <Button
            className="h-50 m-2 rounded-xl bg-carewallet-gray"
            textColor="black"
            key={type}
            onPress={() => navigation.navigate('New ' + type)} // TODO other screens should have this name
          >
            {type}
          </Button>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
