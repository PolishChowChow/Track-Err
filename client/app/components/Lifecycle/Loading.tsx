import LottieView from 'lottie-react-native';
import loadingAnim from './loading.json'; // your lottie file
import { View } from 'react-native';

export default function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LottieView source={loadingAnim} autoPlay loop style={{ width: 100, height: 100 }} />
    </View>
  );
}
