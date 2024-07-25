import React from "react";
import { useEffect } from "react";
//import { useUser } from "../../context/authContext";
//import Cookies from "js-cookie";

// COmponents
import { getIdFromLocalCookie } from "../../lib/auth";
import { Space } from "@mantine/core";
import { DownloadTable } from "../../components/pages/members/bundles/DownLoadTable";

import { PageTitle } from "../../components/Members/Common/Type";
import { IconDownload } from "@tabler/icons";

import Adminfetcher from "../../lib/Adminfetcher";
import { DownloadCopy } from "../../components/pages/members/bundles/DownloadCopy";

import { useAccountDetails } from "../../context/userContext";
import SecureRouteHOC from "../../components/Layouts/members/security/SecureRouteHC";
import { PageMetaData } from "../../components/Layouts/members/Meta/pageMetaData";
import { RoundedSectionContainer } from "../../components/UI/Containers/SectionContainer";
import { DownloadsSelectDays } from "../../components/pages/members/settings/change-day-bundle-arrives/components/DaysTillDeliveryContainer";

const OrderHistory = (props) => {
  const { Renders } = props;
  const { account } = useAccountDetails();

  useEffect(() => {}, [Renders]);

  const MetaOBJ = {
    title: "Member Downloads - Fixtura: Access Your Bundle",
    description:
      "Download your purchased bundles and resources as a Fixtura member. Enhance your club's digital media with our exclusive content.",
    keywords:
      "Member downloads, Fixtura bundles, sports media resources, club content download, digital bundles",
  };
  return (
    <SecureRouteHOC conditions={[account]}>
      <PageMetaData MetaOBJ={MetaOBJ} />

      <PageTitle Copy={`Bundles`} ICON={<IconDownload size={40} />} />

      <DownloadsSelectDays renders={Renders?.renders} />
      <Space h={20} />
      <RoundedSectionContainer
        headerContent={`Bundles`}
        topContent={<DownloadCopy />}
        bottomContent={
          <DownloadTable
            data={Renders?.renders}
            Token={Renders?.render_token?.token}
          />
        }
      />
    </SecureRouteHOC>
  );
};

export default OrderHistory;

OrderHistory.getInitialProps = async (ctx) => {
  const ID = await getIdFromLocalCookie();
  const Renders = await Adminfetcher(`/scheduler/getDownloads/${ID}`);
  return {
    Renders,
  };
};
