import { useEffect, useRef } from "react";
import {
    Animated,
    Easing,
    StyleSheet,
    View
} from 'react-native';

export const DotsLoader = () => {
  const dots = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    dots.forEach((anim, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 160),
          Animated.timing(anim, {
            toValue: -10,
            duration: 280,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 280,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.delay(400),
        ])
      ).start();
    });
  }, []);

  return (
    <View style={styles.dotsRow}>
      {dots.map((anim, i) => (
        <Animated.View
          key={i}
          style={[styles.dot, { transform: [{ translateY: anim }] }]}
        />
      ))}
    </View>
  );
};


const styles = StyleSheet.create({
  dotsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 48,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
})