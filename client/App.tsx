import * as React from 'react';
import { View, Text } from 'react-native';
import { getAllMedications } from './services/medication';
import ClickableCard from './components/Card';
import PopupModal from './components/PopupModal';
import { StyleSheet } from 'react-native';

export default function App() {
  const [medications, setMedications] = React.useState<Medication[]>();
  React.useEffect(() => {
    getAllMedications().then((med) => setMedications(med));
  }, []);

  const handleCardPress = () => {
    // Handle the card press event
    console.log('Card Pressed!');
  };

  const handlePopupPress = () => {
    // Handle the Popup press event
    console.log('Popup Pressed!');
  };

  const styles = StyleSheet.create({
    buttonStyle: {
      margin: 10,
      width: 200,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'gray',
      backgroundColor: 'lightblue',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3
    },
    content: {
      fontSize: 16,
      color: 'gray',
      backgroundColor: 'lightgreen',
      borderRadius: 5
    }
  });

  return (
    <View className="flex-1 w-max items-center justify-center bg-orange-300 pt-48">
      {medications && (
        <>
          <ClickableCard
            med={medications}
            onPress={handleCardPress}
            children={<Text> stuff</Text>}
            navigateTo=""
          />
          <PopupModal
            med={medications}
            modalStyle={styles.content}
            buttonStyle={styles.buttonStyle}
            onPress={handlePopupPress}
            modalContent={<Text> stuff</Text>}
          />
        </>
      )}
    </View>
  );
}
