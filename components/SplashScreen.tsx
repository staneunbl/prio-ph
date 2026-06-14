import { useSplashAnimations } from '@/hooks/use-splash-animations';
import React, { useRef } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { DotsLoader } from './shared/loader-dots';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const statusBlink = useRef(new Animated.Value(1)).current;

  const orbAnim = useRef(new Animated.Value(0)).current;
  const radarAnim = useRef(new Animated.Value(0)).current;

  useSplashAnimations({
    pulseAnim,
    statusBlink,
    orbAnim,
    radarAnim,
    fadeAnim,
    slideAnim,
  });

  const floatY = orbAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -18, 0],
  });

  const floatYReverse = orbAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 18, 0],
  });

  const radarRotate = radarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>

      {/* RADAR SWEEP */}
      <Animated.View
        style={[
          styles.radarRing,
          { transform: [{ rotate: radarRotate }] },
        ]}
      />

      {/* ORBS (RADAR STYLE) */}
      <Animated.View
        style={[styles.orb, styles.redOrb, { transform: [{ translateY: floatY }] }]}
      />
      <Animated.View
        style={[styles.orb, styles.yellowOrb, { transform: [{ translateY: floatYReverse }] }]}
      />
      <Animated.View
        style={[styles.orb, styles.blueOrb, { transform: [{ translateY: floatY }] }]}
      />

      {/* STATUS */}
      <Animated.View style={[styles.statusBar, { opacity: fadeAnim }]}>
        <Animated.View style={[styles.statusDot, { opacity: statusBlink }]} />
        <Text style={styles.statusText}>SYSTEM ACTIVE</Text>
      </Animated.View>

      {/* SUN */}
      <Animated.View
        style={[styles.sunWrap, { transform: [{ scale: pulseAnim }] }]}
      >
        <Image
          source={require('../assets/images/sun.png')}
          style={styles.sunImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* LOGO */}
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
          Emergency & Climate Response
        </Text>
      </Animated.View>

      {/* LOADER */}
      <View style={styles.loaderWrap}>
        <DotsLoader />
      </View>

      <Text style={styles.tagline}>POWERED BY STANEUNBl</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F3D22',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  /* RADAR RING */
  radarRing: {
    position: 'absolute',
    width: 420,
    height: 420,
    borderRadius: 210,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    opacity: 0.8,
  },

  /* ORBS */
  orb: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.75,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },

  redOrb: {
    width: 18,
    height: 18,
    backgroundColor: '#FF3B3B',
    top: 160,
    left: 80,
    shadowColor: '#FF3B3B',
  },

  yellowOrb: {
    width: 22,
    height: 22,
    backgroundColor: '#FFD84D',
    top: 260,
    right: 60,
    shadowColor: '#FFD84D',
  },

  blueOrb: {
    width: 16,
    height: 16,
    backgroundColor: '#4DA3FF',
    bottom: 220,
    left: 120,
    shadowColor: '#4DA3FF',
  },

  /* STATUS */
  statusBar: {
    position: 'absolute',
    top: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
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

  /* SUN */
  sunWrap: {
    position: 'absolute',
    top: -95,
  },
  sunImage: {
    width: 420,
    height: 420,
    opacity: 0.9,
  },

  /* LOGO */
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  logoRow: {
    flexDirection: 'row',
  },
  logoText: {
    fontSize: 54,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 2,
  },
  logoAccent: {
    color: '#FFD84D',
  },
  divider: {
    width: 50,
    height: 3,
    backgroundColor: '#FFD84D',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 2,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  loaderWrap: {
    position: 'absolute',
    bottom: 90,
  },

  tagline: {
    position: 'absolute',
    bottom: 30,
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 2,
  },
});

export default SplashScreen;