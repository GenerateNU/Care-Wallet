import React from 'react';
import { StyleSheet, View, GestureResponderEvent, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import tailwind from 'tailwind-rn';

interface ClickableCardProps {
  med: Medication[];
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
    <Card style={tailwind('!bg-blue-500 !m-10 !w-10')} onPress={handlePress}>
      <Card.Title title={med[0].medication_name} />
      <Card.Content>{children}</Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 0,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    width: 200
  }
});

export default ClickableCard;
