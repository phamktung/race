import React from "react";
import '../src/styles/index.scss';
import Router from 'next/router';
import NProgress from 'nprogress';
import {Toaster} from "react-hot-toast";

NProgress.configure({showSpinner: false});
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({Component, pageProps}) {

  return (
    <>
      <Component {...pageProps} />
      <Toaster/>
    </>
  )
}

export default MyApp
