import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import { CacheProvider } from "@emotion/react";
import { appWithTranslation } from "next-i18next";
import RTL from "components/RTL";
import MuiTheme from "theme/MuiTheme";
import OpenGraphTags from "utils/OpenGraphTags";
import RouteGuard from "components/RouteGuard";
import { AppProvider } from "contexts/AppContext";
import { AxiosProvider } from "contexts/AxiosContext";
import SettingsProvider from "contexts/SettingContext";
import SnackbarProvider from "components/SnackbarProvider";
import createEmotionCache from "createEmotionCache";
import "nprogress/nprogress.css";
import "simplebar-react/dist/simplebar.min.css";
import "../src/__server__";

//Binding events.
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());
// small change
nProgress.configure({
  showSpinner: false,
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="React Next.js ecommerce template. Build SEO friendly Online store, delivery app and Multivendor store"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <OpenGraphTags />
        <title>ENII - Universidad Central de Venezuela</title>
      </Head>

      <SettingsProvider>
        <AppProvider>
          <RouteGuard>
            <AxiosProvider>
              <MuiTheme>
                <SnackbarProvider>
                  <RTL>{getLayout(<Component {...pageProps} />)}</RTL>
                </SnackbarProvider>
              </MuiTheme>
            </AxiosProvider>
          </RouteGuard>
        </AppProvider>
      </SettingsProvider>
    </CacheProvider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };

export default appWithTranslation(App);
