import Head from "next/head";
import Main from "./main";
import Login from "./signin";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>inssagram</title>
        <meta name="inssagram" content="community"></meta>
      </Head>
      {/* <Main /> */}
      <Login />
    </>
  );
};

export default Home;
