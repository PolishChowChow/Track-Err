import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { View, Text } from "react-native";
export default function ErrorList() {
  const { data, isFetched, isError, status, error } = useQuery({
    queryKey: ["error-list"],
    queryFn: async () => {
      console.log("start!")
      const response = await axios.get("http://192.168.0.112:3000/records");
      console.log(response.data.data[0].content)
      return response;
    },
  });

  return (
    <View>
      <Text>{error?.name}</Text>
      <Text>{error?.message}</Text>
    </View>
  );
}
