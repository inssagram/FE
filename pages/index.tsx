import Head from "next/head";
import Main from "../main";

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
