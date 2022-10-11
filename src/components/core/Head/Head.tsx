import { memo } from "react";
import type { PropsWithChildren } from "react";

import NextHead from "next/head";

import { isTypeofString } from "javascript-yesterday";

import { APP } from "~/const/app";

function getTitle(prefix?: string, suffix?: string) {
  let title = APP.name;
  if (isTypeofString(prefix)) title = `${prefix} - ${title}`;
  if (isTypeofString(suffix)) title = `${title} - ${suffix}`;
  return title.trim();
}

type HeadProps = PropsWithChildren<{
  title?: {
    prefix?: string;
    suffix?: string;
  };
  description?: string;
}>;

function Head(props: HeadProps) {
  const title = getTitle(props.title?.prefix, props.title?.suffix);
  const description = props.description || APP.description;
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {props.children}
    </NextHead>
  );
}

export type { HeadProps };
export default memo(Head);
