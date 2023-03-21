import { PropsWithChildren, useCallback } from "react";

import { ColorSchemeProvider, DEFAULT_THEME, MantineProvider } from "@mantine/core";
import type { ColorScheme, MantineColor, MantineThemeOverride } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

const primaryColor: MantineColor = "indigo";

const shared: MantineThemeOverride = {
    defaultRadius: "lg",
    cursorType: "pointer",
    primaryColor,
    defaultGradient: {
      from: DEFAULT_THEME.colors[primaryColor][6],
      to: DEFAULT_THEME.colors[primaryColor][4],
      deg: 45,
    },
    fontFamily: "Inter V, sans-serif",
    activeStyles: {
      transform: "scale(0.98)",
    },
  },
  light: MantineThemeOverride = { ...shared, colorScheme: "light" },
  dark: MantineThemeOverride = { ...shared, colorScheme: "dark" };

function ThemeProvider(props: PropsWithChildren) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({ key: "regions-of-indonesia-color-scheme", defaultValue: "dark" });

  const toggleColorScheme = useCallback(() => {
    setColorScheme((value) => (value === "dark" ? "light" : "dark"));
  }, []);

  return (
    <MantineProvider theme={colorScheme === "dark" ? dark : light} withGlobalStyles withNormalizeCSS>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        {props.children}
      </ColorSchemeProvider>
    </MantineProvider>
  );
}

export { ThemeProvider };
