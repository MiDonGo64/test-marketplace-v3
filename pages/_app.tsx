import '../styles/globals.css';
import { AppProps } from 'next/app';
import NextNProgress from "nextjs-progressbar";
import { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import Layout from '../components/layout/Layout';
import UserContextProvider from '../context/UserContextProvider';
import { Ethereum, Goerli, Mumbai, Polygon } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";


// Thirdweb Sol provider imported dynamically and server side rendering disabled
// Use require instead of import

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ThirdwebProvider 
        activeChain={Goerli}
        >
        <UserContextProvider>
          {/* Progress bar when navigating between pages */}
          <NextNProgress
            color="var(--color-tertiary)"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />
            <Layout>
              <Component {...pageProps} />
            </Layout>
               
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <ToastContainer />
        </UserContextProvider>
      </ThirdwebProvider>
    </>
  );
};

export default App;