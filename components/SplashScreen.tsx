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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const statusBlink = useRef(new Animated.Value(1)).current;

  const orbAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.04,
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
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(statusBlink, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    const orbLoop = Animated.loop(
      Animated.timing(orbAnim, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const introAnim = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]);

    pulseLoop.start();
    statusLoop.start();
    orbLoop.start();
    introAnim.start();

    return () => {
      pulseLoop.stop();
      statusLoop.stop();
      orbLoop.stop();
    };
  }, []);

  const orbFloatY = orbAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -14, 0],
  });

  const orbFloatYReverse = orbAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 14, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.orb,
          styles.orb1,
          { transform: [{ translateY: orbFloatY }] },
        ]}
      />
      <Animated.View
        style={[
          styles.orb,
          styles.orb2,
          { transform: [{ translateY: orbFloatYReverse }] },
        ]}
      />
      <Animated.View
        style={[
          styles.orb,
          styles.orb3,
          { transform: [{ translateY: orbFloatY }] },
        ]}
      />
      <Animated.View
        style={[
          styles.orb,
          styles.orb4,
          { transform: [{ translateY: orbFloatYReverse }] },
        ]}
      />
      <Animated.View
        style={[
          styles.orb,
          styles.orb5,
          { transform: [{ translateY: orbFloatY }] },
        ]}
      />

      {/* Status bar */}
      <Animated.View style={[styles.statusBar, { opacity: fadeAnim }]}>
        <Animated.View
          style={[styles.statusDot, { opacity: statusBlink }]}
        />
        <Text style={styles.statusText}>SYSTEM ACTIVE</Text>
      </Animated.View>

      {/* Sun / signal indicator */}
      <Animated.View
        style={[
          styles.sunWrap,
          {
            transform: [{ scale: pulseAnim }],
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
        <View style={styles.logoRow}>
          <Text style={styles.logoText}>PRIO</Text>
          <Text style={[styles.logoText, styles.logoAccent]}>PH!</Text>
        </View>
        <View style={styles.divider} />
        <Text style={styles.subtitle}>
          Emergency &amp; Climate Response System
        </Text>
      </Animated.View>

      <View style={styles.loaderWrap}>
        <DotsLoader />
      </View>

      <Text style={styles.tagline}>POWERED BY STANEUNBL</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F3D22',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },

  orb: {
    position: 'absolute',
    backgroundColor: '#FFD84D',
    borderRadius: 999,
  },
  orb1: {
    width: 180,
    height: 180,
    top: 120,
    left: -60,
    opacity: 0.05,
  },
  orb2: {
    width: 120,
    height: 120,
    top: 260,
    right: -30,
    opacity: 0.06,
  },
  orb3: {
    width: 240,
    height: 240,
    bottom: 100,
    left: -90,
    opacity: 0.04,
  },
  orb4: {
    width: 100,
    height: 100,
    bottom: 260,
    right: 20,
    opacity: 0.07,
  },
  orb5: {
    width: 70,
    height: 70,
    top: 460,
    right: 60,
    opacity: 0.05,
    backgroundColor: '#FFFFFF',
  },

  statusBar: {
    position: 'absolute',
    top: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ADE80',
    marginRight: 8,
  },
  statusText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 2,
    fontWeight: '600',
  },
  sunWrap: {
    position: 'absolute',
    top: -95,
    alignSelf: 'center',
  },
  sunImage: {
    width: 450,
    height: 450,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  logoRow: {
    flexDirection: 'row',
  },
  logoText: {
    fontFamily: 'ArchivoBlack-Regular',
    fontSize: 56,
    lineHeight: 62,
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  logoAccent: {
    color: '#FFD84D',
  },
  divider: {
    width: 40,
    height: 3,
    backgroundColor: '#FFD84D',
    borderRadius: 2,
    marginTop: 12,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingHorizontal: 20,
    fontWeight: '600',
  },
  loaderWrap: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 90,
  },
  loaderLabel: {
    marginTop: 10,
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  tagline: {
    position: 'absolute',
    bottom: 32,
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});

export default SplashScreen;