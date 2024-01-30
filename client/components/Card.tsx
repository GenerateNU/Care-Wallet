import React from 'react';
import { StyleSheet, View, GestureResponderEvent } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface ClickableCardProps {
  med: Medication;
  onPress: () => void;
  children: JSX.Element[] | JSX.Element;
  cardStyle?: object;
  navigateTo?: string;
}

const ClickableCard: React.FC<ClickableCardProps> = ({
  med,
  onPress,
  children,
  cardStyle,
  navigateTo
}) => {
  // const navigation = useNavigation();

  const handlePress = () => {
    if (navigateTo) {
      console.log('trying to navigate!');
      // navigation.navigate(navigateTo as never);
    } else {
      onPress();
    }
  };

  return (
    <Card style={[styles.card, cardStyle]} onPress={handlePress}>
      <Card.Title
        title={med.medication_name}
        // subtitle={`ID: ${med.medication_id}`}
      />
      <Card.Content>
        <Text>{`ID: ${med.medication_name}`}</Text>
      </Card.Content>
      {/* <Card.Content>{children}</Card.Content> */}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 2,
    margin: 1
  }
});

export default ClickableCard;
