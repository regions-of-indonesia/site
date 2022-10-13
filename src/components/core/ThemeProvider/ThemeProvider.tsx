import type { PropsWithChildren } from "react";

import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import type { ColorScheme } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import theme from "./theme";

type ThemeProviderProps = PropsWithChildren<{}>;

function ThemeProvider(props: ThemeProviderProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({ key: "regions-of-indonesia-color-scheme", defaultValue: "light" });

  const toggleColorScheme = () => {
    setColorScheme((value) => (value === "dark" ? "light" : "dark"));
  };

  return (
    <MantineProvider theme={colorScheme === "dark" ? theme.dark : theme.light} withGlobalStyles withNormalizeCSS>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        {props.children}
      </ColorSchemeProvider>
    </MantineProvider>
  );
}

export type { ThemeProviderProps };
export default ThemeProvider;
