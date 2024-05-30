import React from "react";
import { Stack, StackProps } from "@/components/Stack";

interface HStackProps extends StackProps { }

export function HStack(props: HStackProps) {
  return (
    <Stack { ...props } direction="row">
      { props.children }
    </Stack>
  );
}
