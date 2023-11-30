import Head from "next/head";
import Login from "./signin";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>inssagram</title>
        <meta name="inssagram" content="community"></meta>
      </Head>
      <Login />
    </>
  );
};

export default Home;
