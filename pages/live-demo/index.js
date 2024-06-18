// Components
import CtaArea from "../../components/Common/CtaAreaTwo";
import Meta from "../../components/Layouts/Meta";
//import SelectClubForLiveDemo from "../../components/Common/SelectClubForLiveDemo";
//import LiveDemoBanner from "../../components/Freetrial/LiveDemoBanner";
import { SelectATemplatePublic } from "../../components/pages/public/templates/SelectATemplatePublic";
import PageBanner from "../../components/Common/PageBanner";

const LiveDemo = () => {
  return (
    <>
      <Meta
        title="Home - Fixtura: Elevate Your Club's Digital Presence"
        description="Discover Fixtura's cutting-edge social media content tools for PlayHQ clubs and associations. Engage fans with AI-powered digital assets."
        keywords="Fixtura, PlayHQ clubs, sports content creation, AI-powered social media, cricket digital assets, sports clubs marketing"
      />

      <PageBanner pageTitle="Template Options" />
      <SelectATemplatePublic />
     
      <CtaArea />
    </>
  );
}; 

export default LiveDemo;
/* <SelectClubForLiveDemo />  */
/* <LiveDemoBanner /> */
