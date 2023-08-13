import React from "react";
import PageBanner from "../components/Common/PageBanner";
import ErrorContent from "../components/Error/ErrorContent";
import Footer from "../components/Layouts/Footer";

const Error = () => {
  return (
    <>
      <PageBanner pageTitle="404 Error" BGImage="/images/page-banner3.jpg" />
      <ErrorContent /> 
      <Footer />
    </>
  );
};

export default Error;
