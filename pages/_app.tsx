import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { persistor, store } from "@/src/redux/Posts/store";
import { PersistGate } from "redux-persist/integration/react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
