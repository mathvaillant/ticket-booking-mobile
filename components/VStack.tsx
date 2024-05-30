import React from "react";
import { Stack, StackProps } from "@/components/Stack";

interface VStackProps extends StackProps { }

export function VStack(props: VStackProps) {
  return (
    <Stack { ...props } direction="column">
      { props.children }
    </Stack>
  );
}
