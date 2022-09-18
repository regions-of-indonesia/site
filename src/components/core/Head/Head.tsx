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
      {typeof description.current === "string" && <meta name="description" content={description.current} />}
      {props.children}
    </NextHead>
  );
}

export type { HeadProps };
export default Head;
