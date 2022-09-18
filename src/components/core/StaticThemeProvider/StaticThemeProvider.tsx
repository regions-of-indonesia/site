import {} from "react";
import type { PropsWithChildren } from "react";

import { MantineProvider } from "@mantine/core";

import THEME from "./theme";

type StaticThemeProviderProps = PropsWithChildren<{}>;

function StaticThemeProvider(props: StaticThemeProviderProps) {
  return (
    <MantineProvider theme={THEME} withGlobalStyles withNormalizeCSS>
      {props.children}
    </MantineProvider>
  );
}

export type { StaticThemeProviderProps };
export default StaticThemeProvider;
