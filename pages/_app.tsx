import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/main.css";
import '../components/styled/spinner.scss'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default App;
