import "./index.css";
import { Stack } from "expo-router";
import { type Theme, ThemeProvider, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { NAV_THEME } from "@/reusables/lib/constants";
import { useColorScheme } from "@/reusables/lib/useColorScheme";
import React from "react";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <Stack />
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect = Platform.OS === "web" && typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;
