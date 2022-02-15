import { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { QueryClient, QueryClientProvider } from 'react-query';
import './styles.css';

const client = new QueryClient();

function CustomApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <QueryClientProvider client={client}>
      <SessionProvider session={pageProps.session}>
        <Head>
          <title>Welcome to web-todo-example!</title>
        </Head>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default CustomApp;
