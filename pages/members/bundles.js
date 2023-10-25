import React from "react";
import { useEffect } from "react";
import { useUser } from "../../lib/authContext";
//import Cookies from "js-cookie";

// COmponents
import { getIdFromLocalCookie } from "../../lib/auth";
import { Space } from "@mantine/core";
import { DownloadTable } from "../../components/Members/Downloads/DownLoadTable";
import { MembersWrapper } from "../../components/Members/Common/Containers";
import { PageTitle, SubHeaders } from "../../components/Members/Common/Type";
import { IconDownload } from "@tabler/icons";

//import AwaitingFirstDownload from "../../components/Downloads/AwaitingFirstDownload";
import Adminfetcher from "../../lib/Adminfetcher";
import { DownloadCopy } from "../../components/Downloads/DownloadCopy";
import { DownloadsSelectDays } from "../../components/Downloads/DownloadsSelectDays";
import SetupCheck from "../../components/Members/Account/HOC/SetupCheck";
import { LoadingStateWrapper } from "../../components/Members/Account/HOC/LoadingStateWrapper";


const OrderHistory = (props) => {
  const { Renders } = props;

  /* is User Auth */
  const { user } = useUser();

  useEffect(() => {}, [Renders]);

  if (Renders?.renders === undefined)
    return (
      <MembersWrapper>
        <SetupCheck>
          {/* <AwaitingFirstDownload scheduler={Renders?.scheduler} /> */}
        </SetupCheck>
      </MembersWrapper>
    );

  return (
    <MembersWrapper>
      <SetupCheck>
        <LoadingStateWrapper conditions={[user, Renders]}>
          <PageTitle Copy={`Bundles`} ICON={<IconDownload size={40} />} />
          <DownloadCopy />
          <Space h={20} />
          <DownloadsSelectDays renders={Renders.renders} />
          <Space h={20} />
          <SubHeaders Copy={`Bundles (${Renders.renders.length})`} />

          <DownloadTable
            data={Renders.renders}
            Token={Renders?.render_token?.token}
          />
        </LoadingStateWrapper>
      </SetupCheck>
    </MembersWrapper>
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
