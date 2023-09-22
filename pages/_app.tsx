import React from "react";
import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import "../styles/globals.css";
import "../styles/main.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default MyApp;
