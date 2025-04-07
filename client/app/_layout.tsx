import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import lightTheme from "../assets/colors.json"
export default function RootLayout() {
  const queryClient = new QueryClient();

  const theme = {
    ...DefaultTheme,
    myownProperty: true,
    colors: lightTheme.colors
  }
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <Stack
          screenOptions={{
            title: "application",
          }}
        />
      </PaperProvider>
    </QueryClientProvider>
  );
}
