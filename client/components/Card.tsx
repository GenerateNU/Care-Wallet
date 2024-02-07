import { styled } from 'nativewind';
import React from 'react';
import { Card } from 'react-native-paper';

interface ClickableCardProps {
  title: string;
  onPress: () => void;
  children?: JSX.Element[] | JSX.Element;
}

export const ClickableCard: React.FC<ClickableCardProps> = ({
  title,
  onPress,
  children
}) => {
  return (
    <Card className="m-10 w-64 bg-blue-300" onPress={onPress}>
      <Card.Title className="mb-5" title={title} />
      <Card.Content>{children}</Card.Content>
    </Card>
  );
};

export default ClickableCard;
