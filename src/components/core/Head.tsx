import { memo } from "react";
import type { PropsWithChildren } from "react";

import NextHead from "next/head";

import { APP } from "~/const/app";

function getTitle(prefix?: string, suffix?: string) {
  let title = APP.name;
  if (typeof prefix === "string") title = `${prefix} - ${title}`;
  if (typeof suffix === "string") title = `${title} - ${suffix}`;
  return title.trim();
}

const Head = memo(
  (
    props: PropsWithChildren<{
      prefix?: string;
      suffix?: string;
      description?: string;
    }>
  ) => {
    const title = getTitle(props.prefix, props.suffix);

    return (
      <NextHead>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={props.description || APP.description} />
        {props.children}
      </NextHead>
    );
  }
);

export { Head };
