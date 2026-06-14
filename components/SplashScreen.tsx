import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { DotsLoader } from './shared/loader-dots';

const SplashScreen = () => {
  const spinAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 18000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.07,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        delay: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.leafLeft} />
      <View style={styles.leafRight} />

      {/* Sun image */}
      <Animated.View
        style={[
          styles.sunWrap,
          {
            transform: [
              { scale: pulseAnim },
              // { rotate },
            ],
          },
        ]}
      >
        <Image
          source={require('../assets/images/sun.png')}
          style={styles.sunImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.logoText}>PRIO</Text>
        <Text style={styles.logoText}>PH!</Text>
        <Text style={styles.subtitle}>Climate & Emergency Response</Text>
      </Animated.View>

      <DotsLoader />

      <Text style={styles.tagline}>Powered by community</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D5530',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    overflow: 'hidden',
  },
  leafLeft: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#fff',
    opacity: 0.05,
    bottom: 130,
    left: -60,
    transform: [{ rotate: '-20deg' }],
  },
  leafRight: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    opacity: 0.05,
    bottom: 210,
    right: -30,
    transform: [{ rotate: '30deg' }],
  },
  sunWrap: {
    position: 'absolute',
    top: -90,
    alignSelf: 'center',
  },
  sunImage: {
    width: 420,
    height: 420,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoText: {
    fontFamily: 'ArchivoBlack-Regular',
    fontSize: 80,
    lineHeight: 84,
    color: '#FFFFFF',
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(230,241,251,0.7)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 10,
  },
  tagline: {
    position: 'absolute',
    bottom: 36,
    fontSize: 11,
    color: 'rgba(230,241,251,0.55)',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
});

export default SplashScreen;