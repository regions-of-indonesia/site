import { useRef } from "react";
import type { PropsWithChildren } from "react";

import NextHead from "next/head";

import { getTitle } from "~/const";

type HeadProps = PropsWithChildren<{
  title?: {
    prefix?: string;
    suffix?: string;
  };
  description?: string;
}>;

function Head(props: HeadProps) {
  const title = useRef(getTitle(props.title?.prefix, props.title?.suffix));
  const description = useRef(props.description);
  return (
    <NextHead>
      <title>{title.current}</title>
      <meta name="title" content={title.current} />
      {<meta name="description" content={description.current ?? title.current} />}

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://regions-of-indonesia.netlify.app/" />
      <meta property="og:title" content="Regions of Indonesia" />
      <meta property="og:description" content="Regions of Indonesia" />
      <meta property="og:image" content="https://regions-of-indonesia.netlify.app/Cover.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://regions-of-indonesia.netlify.app/" />
      <meta property="twitter:title" content="Regions of Indonesia" />
      <meta property="twitter:description" content="Regions of Indonesia" />
      <meta property="twitter:image" content="https://regions-of-indonesia.netlify.app/Cover.png" />

      {props.children}
    </NextHead>
  );
}

export type { HeadProps };
export default Head;
