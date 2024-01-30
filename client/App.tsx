import * as React from 'react';
import { View, Text } from 'react-native';
import { getAllMedications } from './services/medication';
import ClickableCard from './components/Card';
import PopupModal from './components/PopupModal';

export default function App() {
  const [medications, setMedications] = React.useState<Medication[]>();
  React.useEffect(() => {
    getAllMedications().then((med) => setMedications(med));
  }, []);

  const handleCardPress = () => {
    // Handle the card press event
    console.log('Card Pressed!');
  };

  return (
    <View className="flex-1 w-max items-center justify-center bg-white pt-48">
      {medications && (
        <>
          <ClickableCard
            med={medications}
            onPress={handleCardPress}
            children={<Text> stuff</Text>}
            navigateTo=""
          />
          <PopupModal></PopupModal>
        </>
      )}
    </View>
  );
}
