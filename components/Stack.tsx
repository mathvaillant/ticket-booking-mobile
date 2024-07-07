import React, { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";
import { ShortcutProps, defaultShortcuts } from "@/styles/shortcuts";

export interface StackProps extends PropsWithChildren, ShortcutProps, ViewProps {
  flex?: number;
  direction?: "row" | "column";
  gap?: number;
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  justifyContent?:
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";
}

export function Stack({
  flex,
  direction,
  gap,
  alignItems,
  justifyContent,
  children,
  style,
  ...restProps
}: StackProps) {
  return (
    <View style={[defaultShortcuts(restProps), {
      flex,
      flexDirection: direction,
      gap,
      alignItems,
      justifyContent,
    }, style]} {...restProps}
    >
      {children}
    </View>
  );
}
