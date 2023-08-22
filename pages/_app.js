import React, { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
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
import { initGA, trackWebVitals } from "../lib/GA";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initGA();
    trackWebVitals();
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <MantineProviderWrapper>
        {getLayout(<Component {...pageProps} />)}
        <GoTop />
      </MantineProviderWrapper>
      <Analytics />
    </>
  );
}

export default MyApp;
