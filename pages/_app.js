import React, { useEffect } from "react";
import AOS from "aos";
import "../node_modules/aos/dist/aos.css";
import "../styles/bootstrap.min.css";
import "../styles/animate.min.css";
import "animate.css";
import "../styles/all.min.css";
import "../styles/pe-icon-7-stroke.css";
import "react-accessible-accordion/dist/fancy-example.css";
import "swiper/css";
import "swiper/css/bundle";

import Layout from "../components/Layouts/Layout";

// Global Style
import "../styles/style.scss";
import "../styles/responsive.scss";

//import Head from "next/head";
import GoTop from "../components/Layouts/GoTop";
import { MantineProviderWrapper } from "../utils/MantineTheme";
import { NotificationsProvider } from "@mantine/notifications";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <MantineProviderWrapper>
        <NotificationsProvider>
          <Layout>
            <Component {...pageProps} />
            <GoTop />
          </Layout>
        </NotificationsProvider>
      </MantineProviderWrapper>
    </>
  );
}

export default MyApp;

/*
  how to deploy.
  USe the git options within VSC, commit and push new code.
  chec on vercel that the build worked.

*/