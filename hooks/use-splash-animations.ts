import { useEffect } from 'react';
import { Animated, Easing } from 'react-native';

export const useSplashAnimations = (params: {
  pulseAnim: Animated.Value;
  statusBlink: Animated.Value;
  orbAnim?: Animated.Value;      // optional
  radarAnim?: Animated.Value;    // optional
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
}) => {
  const {
    pulseAnim,
    statusBlink,
    orbAnim,
    radarAnim,
    fadeAnim,
    slideAnim,
  } = params;

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    const statusLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(statusBlink, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(statusBlink, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );

    const intro = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]);

    pulseLoop.start();
    statusLoop.start();
    intro.start();

    // OPTIONAL animations only if provided
    let floatLoop: Animated.CompositeAnimation | undefined;
    let radarLoop: Animated.CompositeAnimation | undefined;

    if (orbAnim) {
      floatLoop = Animated.loop(
        Animated.timing(orbAnim, {
          toValue: 1,
          duration: 9000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      floatLoop.start();
    }

    if (radarAnim) {
      radarLoop = Animated.loop(
        Animated.timing(radarAnim, {
          toValue: 1,
          duration: 6000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      radarLoop.start();
    }

    return () => {
      pulseLoop.stop();
      statusLoop.stop();
      floatLoop?.stop();
      radarLoop?.stop();
    };
  }, [pulseAnim, statusBlink, orbAnim, radarAnim, fadeAnim, slideAnim]);
};