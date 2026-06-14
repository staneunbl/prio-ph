import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type WrapperTabProps = {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  backgroundColor?: string;
};

const WrapperTab = ({
  children,
  title = "",
  showBackButton = false,
  onBackPress,
  rightComponent,
  backgroundColor = "#0B1F17",
}: WrapperTabProps) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />

      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <View style={styles.leftContainer}>
            {showBackButton && (
              <Text style={styles.backButton} onPress={onBackPress}>
                ←
              </Text>
            )}
          </View>

          <View style={styles.centerContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.title}>PRIO</Text>
              <Text style={[styles.title, styles.logoAccent]}>PH!</Text>
            </View>
          </View>

          <View style={styles.rightContainer}>{rightComponent}</View>
        </View>
      </View>

      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#0B1F17",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  headerContent: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  leftContainer: {
    width: 40,
    alignItems: "flex-start",
  },
  rightContainer: {
    width: 40,
    alignItems: "flex-end",
  },
  centerContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  logoAccent: {
    color: "#FFD84D",
  },
  title: {
    fontFamily: "ArchivoBlack-Regular",
    fontSize: 34,
    lineHeight: 74,
    color: "#FFFFFF",
    letterSpacing: 2,
    textAlign: "center",
  },
  backButton: {
    fontSize: 28,
    color: "#FFD84D",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    backgroundColor: "#EDEDED",
  },
});

export default WrapperTab;
