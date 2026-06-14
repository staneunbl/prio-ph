import { useSplashAnimations } from "@/hooks/use-splash-animations";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AlertDotProps {
  color: string;
  size: number;
  pingCount?: number;
  pingDuration?: number;
  blinkDuration?: number;
  blinkDelay?: number;
  style: object;
}

const AlertDot = ({
  color,
  size,
  pingCount = 2,
  pingDuration = 2000,
  blinkDuration = 1400,
  blinkDelay = 0,
  style,
}: AlertDotProps) => {
  const blink = useRef(new Animated.Value(1)).current;
  const rings = Array.from({ length: pingCount }, () => ({
    scale: useRef(new Animated.Value(1)).current,
    opacity: useRef(new Animated.Value(0.8)).current,
  }));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(blinkDelay),
        Animated.timing(blink, {
          toValue: 0.3,
          duration: blinkDuration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(blink, {
          toValue: 1,
          duration: blinkDuration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    rings.forEach(({ scale, opacity }, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * (pingDuration / pingCount)),
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 5,
              duration: pingDuration,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: pingDuration,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0.8,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    });
  }, []);

  return (
    <View style={[{ position: "absolute", width: size, height: size }, style]}>
      {rings.map(({ scale, opacity }, i) => (
        <Animated.View
          key={i}
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 1.5,
            borderColor: color,
            transform: [{ scale }],
            opacity,
          }}
        />
      ))}
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          opacity: blink,
          shadowColor: color,
          shadowOpacity: 0.6,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 0 },
          elevation: 4,
        }}
      />
    </View>
  );
};

interface Props {
  onLogin: () => void;
  onRegister: () => void;
  onTerms?: () => void;
  onPrivacy?: () => void;
}

const HomeScreen = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;
  const statusBlink = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useSplashAnimations({
    pulseAnim,
    statusBlink,

    fadeAnim,
    slideAnim,
  });

  return (
    <View style={styles.container}>
      {/* ── TOP HALF ── */}
      <View style={styles.topHalf}>
        {/* Radar rings */}
        <View
          style={[
            styles.radarRing,
            { width: 320, height: 320, top: -60, left: 35 },
          ]}
        />
        <View
          style={[
            styles.radarRing,
            { width: 460, height: 460, top: -130, left: -35 },
          ]}
        />

        {/* Status bar */}
        {/* <Animated.View style={[styles.statusBar, { opacity: fadeAnim }]}>
          <Animated.View style={[styles.statusDot, { opacity: statusBlink }]} />
          <Text style={styles.statusText}>SYSTEM ACTIVE</Text>
        </Animated.View> */}

        {/* Alert dots */}
        <AlertDot
          color="#FF3B3B"
          size={14}
          pingCount={2}
          pingDuration={2000}
          blinkDuration={1200}
          blinkDelay={0}
          style={{ top: 200, left: 68 }}
        />
        <AlertDot
          color="#FFD84D"
          size={18}
          pingCount={2}
          pingDuration={2400}
          blinkDuration={1800}
          blinkDelay={400}
          style={{ top: 300, right: 52 }}
        />
        <AlertDot
          color="#4DA3FF"
          size={12}
          pingCount={1}
          pingDuration={2800}
          blinkDuration={2200}
          blinkDelay={800}
          style={{ top: 260, right: 110 }}
        />
        <AlertDot
          color="#FF8C00"
          size={10}
          pingCount={2}
          pingDuration={2200}
          blinkDuration={1600}
          blinkDelay={200}
          style={{ top: 170, right: 80 }}
        />

        {/* Sun — pulsing */}
        <Animated.View
          style={[styles.sunWrap, { transform: [{ scale: pulseAnim }] }]}
        >
          <Image
            source={require("../assets/images/sun.png")}
            style={styles.sunImage}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Logo */}
        <Animated.View
          style={[
            styles.logoBlock,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.logoRow}>
            <Text style={styles.logoText}>PRIO</Text>
            <Text style={[styles.logoText, styles.logoAccent]}>PH!</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.subtitle}>Emergency & Climate Response</Text>
        </Animated.View>
      </View>

      {/* ── BOTTOM HALF ── */}
      <Animated.View style={[styles.bottomHalf, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={[styles.btn, styles.btnLogin]}
          activeOpacity={0.8}
          onPress={() => router.push("/(tabs)/feed")}
        >
          <Text style={[styles.btnText, styles.btnLoginText]}>Login</Text>
        </TouchableOpacity>

        <View style={styles.orRow}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.orLine} />
        </View>

        <TouchableOpacity
          style={[styles.btn, styles.btnRegister]}
          activeOpacity={0.8}
        >
          <Text style={[styles.btnText, styles.btnRegisterText]}>
            Create An Account
          </Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          By continuing you agree to our{" "}
          <Text style={styles.termsLink}>Terms</Text> &amp;{" "}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDED",
  },

  // ── Top ──
  topHalf: {
    backgroundColor: "#1F3D22",
    height: "62%",
    overflow: "hidden",
    justifyContent: "flex-end",
    paddingBottom: 36,
  },
  radarRing: {
    position: "absolute",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },
  statusBar: {
    position: "absolute",
    top: 52,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.09)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    gap: 7,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4ADE80",
  },
  statusText: {
    fontSize: 10,
    color: "rgba(255,255,255,0.8)",
    letterSpacing: 2,
    fontWeight: "700",
  },
  sunWrap: {
    position: "absolute",
    top: -95,
    alignSelf: "center",
  },
  sunImage: {
    width: 420,
    height: 420,
    opacity: 0.95,
  },
  logoBlock: {
    paddingHorizontal: 28,
    zIndex: 2,
  },
  logoRow: {
    flexDirection: "row",
  },
  logoText: {
    fontFamily: "ArchivoBlack-Regular",
    fontSize: 60,
    lineHeight: 74,
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  logoAccent: {
    color: "#FFD84D",
  },
  divider: {
    width: 44,
    height: 3,
    backgroundColor: "#FFD84D",
    borderRadius: 2,
    marginTop: 10,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 11,
    color: "rgba(255,255,255,0.65)",
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontWeight: "600",
  },

  // ── Bottom ──
  bottomHalf: {
    flex: 1,
    paddingHorizontal: 35,
    paddingTop: 45,
    paddingBottom: 24,
    gap: 12,
  },
  btn: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  btnLogin: {
    backgroundColor: "transparent",
    borderWidth: 2.5,
    borderColor: "#2D5530",
  },
  btnRegister: {
    backgroundColor: "#1F3D22",
  },
  btnText: {
    fontSize: 15,
    fontFamily: "ArchivoBlack-Regular",
  },
  btnLoginText: { color: "#2D5530" },
  btnRegisterText: { color: "#FFFFFF" },
  orRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0,0,0,0.12)",
  },
  orText: {
    fontSize: 11,
    color: "rgba(0,0,0,0.35)",
    letterSpacing: 1,
  },
  terms: {
    textAlign: "center",
    fontSize: 10,
    color: "rgba(0,0,0,0.35)",
    marginTop: "auto",
  },
  termsLink: {
    color: "#2D5530",
    fontWeight: "700",
  },
});

export default HomeScreen;
