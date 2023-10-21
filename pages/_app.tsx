import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/main.css";
import '../components/styled/spinner.scss'
import { Provider } from "react-redux";
import { store } from "@/src/redux/Posts/store";
const App = ({ Component, pageProps }: AppProps)=>{
  return (
    <>
    <Provider store={store}>
      <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default App;
