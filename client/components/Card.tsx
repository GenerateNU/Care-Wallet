import React from 'react';
import { StyleSheet, View, GestureResponderEvent } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface ClickableCardProps {
  onPress: () => void;
  children: JSX.Element[] | JSX.Element;
  cardStyle?: object; 
  navigateTo?: string; 
}

const ClickableCard: React.FC<ClickableCardProps> = ({
  onPress,
  children,
  cardStyle,
  navigateTo,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (navigateTo) {
      navigation.navigate(navigateTo as never);
    } else {
      onPress();
    }
  };

  return (
    <Card style={[styles.card, cardStyle]} onPress={handlePress}>
      <Card.Title title="Card Title" subtitle="Card Subtitle" />
      <Card.Content>{children}</Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
});

export default ClickableCard;
