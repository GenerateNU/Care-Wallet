import React from 'react';

import { Card } from 'react-native-paper';

interface ClickableCardProps {
  title: string;
  onPress: () => void;
  children?: JSX.Element[] | JSX.Element;
}

export function ClickableCard({
  title,
  onPress,
  children
}: ClickableCardProps) {
  return (
    <Card className="bg-blue-300 m-10 w-64" onPress={onPress}>
      <Card.Title className="mb-5" title={title} />
      <Card.Content>{children}</Card.Content>
    </Card>
  );
}
