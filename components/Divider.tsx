import { View } from 'react-native';
import React from 'react';
import { ShortcutProps, defaultShortcuts } from '@/styles/shortcuts';

export interface DividerProps extends ShortcutProps { }

export const Divider = (props: DividerProps) => {
  return (
    <View style={ [defaultShortcuts(props), {
      backgroundColor: 'lightgray',
      height: 1,
    }] } />
  );
};
