import { useColorScheme } from "@/hooks/use-color-scheme";
import { Archivo_400Regular } from "@expo-google-fonts/archivo";
import { ArchivoBlack_400Regular } from "@expo-google-fonts/archivo-black";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Archivo_400Regular,
    ArchivoBlack_400Regular,
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} />

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}