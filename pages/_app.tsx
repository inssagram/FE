import React from "react";
// import { Provider } from "react-redux";
// import store from "../../store/store";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/main.css";
import "../components/styled/spinner.scss";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {/* <Provider store={store}> */}
      <Component {...pageProps} />
      {/* </Provider> */}
    </>
  );
};

export default App;
