//bring in head component 
import Head from 'next/head';
//bring in bs css with responsive css media queries
import '../styles/bootstrap.min.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Star Wars Characters</title>
      </Head>
  <Component {...pageProps} />
    </>
  );
}

export default MyApp
