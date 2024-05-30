import React, { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";
import { ShortcutProps, defaultShortcuts } from "@/styles/shortcuts";

interface ContainerProps {
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

export interface StackProps extends PropsWithChildren, ShortcutProps, ContainerProps { }

export function Stack({
  flex,
  direction,
  gap,
  alignItems,
  justifyContent,
  children,
  ...restProps
}: StackProps) {
  return (
    <View style={ [defaultShortcuts(restProps), {
      flex,
      flexDirection: direction,
      gap,
      alignItems,
      justifyContent,
    }] } { ...restProps }
    >
      { children }
    </View>
  );
}
