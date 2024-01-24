import React from 'react';
import { StyleSheet, View, GestureResponderEvent } from 'react-native';
import { Card } from 'react-native-paper';

interface ClickableCardProps {
    onPress: () => void;
    children: JSX.Element[] | JSX.Element;
  }

  
  const ClickableCard: React.FC<ClickableCardProps> = ({ onPress, children }) => {
    return (
      <Card onPress={onPress}>
       <Card.Title title="Card Title" subtitle="Card Subtitle" />
        <Card.Content>
          {children}
        </Card.Content>
      </Card>
    );
  };


  