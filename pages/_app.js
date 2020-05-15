import "../styles/index.css";
import Head from "next/head";
import makeServer from "server";

makeServer();

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Recipes</title>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <div className="sm:pt-8 h-screen w-screen overflow-y-hidden bg-cool-gray-400">
        <div
          className="bg-white mx-auto overflow-hidden shadow-xl sm:rounded overflow-y-auto"
          style={{ maxWidth: "375px", height: "812px" }}
        >
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
