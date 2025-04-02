import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export default function useGettingValueFromPanResponder(panValue: Animated.Value, startingValue = 0){
    const trackedValue = useRef(startingValue)
    useEffect(() => {
        const listenerId = panValue.addListener((pan) => {
          trackedValue.current = pan.value;
        });
        return () => panValue.removeListener(listenerId);
      }, []);
    return trackedValue
}