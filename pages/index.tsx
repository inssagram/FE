import Head from "next/head";
import Main from "./Main.1";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>inssagram</title>
        <meta name="inssagram" content="community"></meta>
      </Head>
      <Main />
    </>
  );
};

export default Home;
