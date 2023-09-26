import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/main.css";
import './main/spinner.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
