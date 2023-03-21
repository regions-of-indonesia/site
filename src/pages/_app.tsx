import { memo } from "react";

import type { GetLayout } from "next";
import type { AppPropsWithLayout } from "next/app";

import { APP } from "~/const/app";

import { Head, ThemeProvider } from "~/components/core";

import "~/styles/globals.css";

const AppHead = memo(() => {
  return (
    <Head>
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${APP.link.self}/`} />
      <meta property="og:title" content={APP.description} />
      <meta property="og:description" content={APP.description} />
      <meta property="og:image" content={`${APP.link.self}/Cover.png`} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${APP.link.self}/`} />
      <meta property="twitter:title" content={APP.description} />
      <meta property="twitter:description" content={APP.description} />
      <meta property="twitter:image" content={`${APP.link.self}/Cover.png`} />
    </Head>
  );
});

type _AppProps = AppPropsWithLayout;

const defaultGetLayout: GetLayout = (page) => <>{page}</>;
const _App = ({ Component, pageProps }: _AppProps) => {
  const getLayout = Component.getLayout ?? defaultGetLayout;

  return (
    <>
      <AppHead />

      <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
    </>
  );
};

export default _App;
