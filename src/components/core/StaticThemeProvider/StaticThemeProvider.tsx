import type { PropsWithChildren } from "react";

import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import type { ColorScheme } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import theme from "./theme";

type StaticThemeProviderProps = PropsWithChildren<{}>;

function StaticThemeProvider(props: StaticThemeProviderProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({ key: "regions-of-indonesia-color-scheme", defaultValue: "dark" });

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

export type { StaticThemeProviderProps };
export default StaticThemeProvider;
