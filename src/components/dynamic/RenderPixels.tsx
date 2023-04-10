import { memo } from "react";

import { Global } from "@mantine/core";
import type { CSSObject, MantineTheme } from "@mantine/core";

import Pixels from "./pixels";

const styles = (theme: MantineTheme): CSSObject => ({
  ".pxy": {
    display: "flex",
    justifyContent: "center",
  },
  ".pxx": {
    flexShrink: 0,
    width: "1px",
    height: "1px",
    margin: "5px",
    borderRadius: "100%",
  },
  ".pxx1": {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[8],
  },
  ".pxx0": {
    backgroundColor: "transparent",
  },
});

const RenderPixels = memo(() => {
  return (
    <>
      <Global styles={styles} />

      {Pixels.map((Pixel, index) => {
        return (
          <div key={`y-${index}`} className={"pxy"}>
            {Pixel.map((value, index) => (
              <div key={`x-${index}`} className={`pxx ${value === 1 ? "pxx1" : "pxx0"}`} />
            ))}
          </div>
        );
      })}
    </>
  );
});

export default RenderPixels;
