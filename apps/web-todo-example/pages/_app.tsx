import { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Welcome to web-todo-example!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}

export default CustomApp;
