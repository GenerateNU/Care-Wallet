import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { Medication } from '../types/medication';

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

  const styles = StyleSheet.create({
    card: {
      margin: 10,
      width: 200,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'gray',
      backgroundColor: 'lightblue',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5
    },
    title: {
      fontSize: 18,
      marginBottom: 8,
      fontWeight: 'bold'
    },
    content: {
      fontSize: 16,
      color: 'gray'
    }
  });

  return (
    <Card style={styles.card} onPress={handlePress}>
      <Card.Title style={styles.title} title={med[0].medication_name} />
      <Card.Content>{children}</Card.Content>
    </Card>
  );
};

export default ClickableCard;
