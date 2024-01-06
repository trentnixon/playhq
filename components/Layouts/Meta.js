import Head from "next/head";

const Meta = ({ title, description, keywords }) => {
  //console.log("title", title)
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title || 'Fixtura - The social media content creator for PlayHQ clubs and Associations'}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
    </Head>
  ); 
};

export default Meta;
