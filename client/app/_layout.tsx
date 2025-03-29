import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Text, View } from "react-native"
import Footer from "./components/Footer/Footer";
export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <Stack />
        <Footer />
    </QueryClientProvider>
  );
}
