
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import nProgress from "nprogress";
import { useEffect } from "react";
import Header from "../components/Header";
import PreviewPlayer from "../components/PreviewPlayer";
import Sidebar from "../components/Sidebar";
import PlayerProvider from "../context/PlayerContext";
import { MusicProvider } from "../context/MusicContext";
import "../styles/globals.css";
import "../styles/nonTailwind.css";

nProgress.configure({
  showSpinner: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => {
      nProgress.start();
    };
    const handleStop = () => {
      nProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <SessionProvider session={pageProps.session}>
      <MusicProvider>
        <PlayerProvider>
          {router.pathname === "/login" ? (
            <Component {...pageProps} />
          ) : (
            <>
              <Sidebar />
              <Header />
              <div className="flex flex-col mr-80">
                
                <main className="mt-4 ml-2 mr-2">
                  <Component {...pageProps} />
                </main>
              </div>
             
              <PreviewPlayer />
              </>
          )}
        </PlayerProvider>
      </MusicProvider>
    </SessionProvider>
  );
}

export default MyApp;
