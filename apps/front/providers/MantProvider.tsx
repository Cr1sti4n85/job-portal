"use client";
import { createTheme, MantineProvider } from "@mantine/core";
import { PropsWithChildren } from "react";

const theme = createTheme({});
type Props = PropsWithChildren;

const MantProvider = ({ children }: Props) => {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
};

export default MantProvider;
