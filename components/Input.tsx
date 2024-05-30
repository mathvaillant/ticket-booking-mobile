import React from 'react';
import { TextInput as RNTextInput, StyleSheet, TextInputProps } from 'react-native';
import { ShortcutProps, defaultShortcuts } from "@/styles/shortcuts";

export interface InputProps extends ShortcutProps, TextInputProps { }

export const Input = (props: InputProps) => {
  return (
    <RNTextInput
      style={ [defaultShortcuts(props), styles.defaults] }
      { ...props }
    />
  );
};

const styles = StyleSheet.create({
  defaults: {
    fontSize: 16,
    borderRadius: 16,
    backgroundColor: 'lightgray',
    color: "black",
  }
});
