import Head from 'next/head'
import Router from 'next/router'
import Script from 'next/script'
import NProgress from 'nprogress'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import VideoState from '../context/videos/VideoState'
import '../styles/globals.css'
import '../styles/nProgress.css'
import { AuthContextProvider } from '@/context/AuthContext'
import { useRouter } from 'next/router';


function MyApp({ Component, pageProps }) {

  const router = useRouter();
  const currentRoute = router.pathname;

  Router.events.on("routeChangeStart", (ur = -0) => {
    NProgress.start();

  })
  Router.events.on("routeChangeComplete", (url) => {
    NProgress.done();
  })


  return (
    <>

      <Head>
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="theme-color" content="#ffffff" />

        {/* Ads Netword Verification  */}
        <meta name="clckd" content="f4f7556a2f970596698f7783f21dd137" />

      </Head>

      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-JDD6RJ6XQQ"
      />

      <Script id="gtm-script" strategy="afterInteractive">
        {` window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-JDD6RJ6XQQ');`}
      </Script>

      <AuthContextProvider>

        <VideoState>

          {/* <LoginForm />
        <SignUpForm/>
        <SignUpFormOTP/>
      <PasswordReset/> */}
          <Navbar />
          <div className={`${currentRoute == "/membership" ? "" : "basicMargin"} `}>
            <Component {...pageProps} />
          </div>
          <hr />

          {currentRoute != "/membership" &&
            <Footer />
          }
        </VideoState>
      </AuthContextProvider>

    </>
  )
}

export default MyApp


