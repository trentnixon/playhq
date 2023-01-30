import React from "react";
import NavbarTwo from "../../components/Layouts/NavbarTwo";
import PageBanner from "../../components/Common/PageBanner";
import BlogGridThree from "../../components/DELETE/Blog/BlogGridThree";
import Footer from "../../components/Layouts/Footer";

const Blog = () => {
  return (
    <>
      <NavbarTwo />

      <PageBanner pageTitle="Blog Grid" BGImage="/images/page-banner3.jpg" />

      <BlogGridThree />

      <Footer />
    </>
  );
};

export default Blog;
