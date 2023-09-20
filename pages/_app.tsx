import React from "react";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};

export default MyApp;
