import React, { useState, useMemo } from "react";
import { PaperProvider, MD3LightTheme, MD3DarkTheme, MD3Theme } from "react-native-paper";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import lightTheme from "../assets/colors.json";
import darkTheme from "../assets/colors_dark.json";
import { ThemeProp } from "react-native-paper/lib/typescript/types";

export default function RootLayout() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleTheme = () => setIsDarkTheme(prev => !prev);

  const theme = useMemo<MD3Theme & { toggleTheme: () => void }>(() => {
    const base = isDarkTheme ? MD3DarkTheme : MD3LightTheme;
    const customColors = isDarkTheme ? darkTheme.colors : lightTheme.colors;

    return {
      ...base,
      colors: {
        ...base.colors,
        ...customColors,
      },
      toggleTheme,
    };
  }, [isDarkTheme]);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme as ThemeProp}>
        <Stack />
      </PaperProvider>
    </QueryClientProvider>
  );
}
