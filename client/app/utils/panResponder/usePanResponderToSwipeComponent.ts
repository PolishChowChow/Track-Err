import { useRef } from "react";
import { PanResponder, Animated } from "react-native";

export default function usePanResponderToSwipeComponent(
    panValue: Animated.Value,
    helperValue: React.MutableRefObject<number>,
    borderLineOfSwipe: number,
    maxSwapValue: number,
    onSwipeFinished: () => void
){
    const panResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
          onPanResponderMove: (event, gestureHandler) => {
            Animated.event([null, { dx: panValue }], { useNativeDriver: false })(
              event,
              gestureHandler
            );
          },
          onPanResponderRelease: () => {
            const modifiedValue = helperValue.current > borderLineOfSwipe ? 0 : maxSwapValue;
            Animated.spring(panValue, {
              toValue: modifiedValue,
              useNativeDriver: false,
            }).start(async() => {
              if(modifiedValue === maxSwapValue){
                onSwipeFinished()
              }
            });
          },
        })
      ).current;

      return panResponder.panHandlers
}