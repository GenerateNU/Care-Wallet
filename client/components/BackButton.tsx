import React from 'react';

import { Button } from 'react-native-paper';

// TODO style
export function BackButton() {
  return (
    <Button
      className="bg-carewallet-gray"
      mode="contained"
      style={{ borderRadius: 8, marginTop: 16 }}
      contentStyle={{ height: 48 }}
    >
      Back
    </Button>
  );
}
