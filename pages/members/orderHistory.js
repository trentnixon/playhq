import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../lib/authContext";
import Cookies from "js-cookie";

// COmponents
import { getIdFromLocalCookie } from "../../lib/auth";
import { Space } from "@mantine/core";
import { DownloadTable } from "../../components/Members/Downloads/DownLoadTable";
import { MembersWrapper } from "../../components/Members/Common/Containers";
import { PageTitle, SubHeaders } from "../../components/Members/Common/Type";
import { IconDownload } from "@tabler/icons";

import AwaitingFirstDownload from "../../components/Downloads/AwaitingFirstDownload";
import Adminfetcher from "../../lib/Adminfetcher";
import { DownloadCopy } from "../../components/Downloads/DownloadCopy";
import { DownloadsSelectDays } from "../../components/Downloads/DownloadsSelectDays";

const qs = require("qs");

const OrderHistory = (props) => {
  const { Renders } = props;

  /* is User Auth */
  const { user } = useUser();
  const router = useRouter();
  const currentRoute = router.pathname;
  useEffect(() => {
    if (!user) router.push(`/members/verification/?prev=${currentRoute}`);
  }, []);
  /* End User Check*/

  useEffect(() => {
    console.log(Renders);
  }, [Renders]);

  if (Renders?.scheduler.data.attributes.renders.data === undefined)
    return <AwaitingFirstDownload />;
  if (user === false) return false;
  if (Renders === null) return false;

  return (
    <MembersWrapper>
      <PageTitle Copy={`Downloads`} ICON={<IconDownload size={40} />} />
      <DownloadCopy />
      <Space h={20} />
      <DownloadsSelectDays Renders={Renders} />
      <Space h={20} />
      <SubHeaders
        Copy={`Renders (${Renders.scheduler.data.attributes.renders.data.length})`}
      />
      <DownloadTable
        data={Renders.scheduler.data.attributes.renders.data}
        Token={Renders.render_token.data.attributes.token}
      />
    </MembersWrapper>
  );
};

export default OrderHistory;

OrderHistory.getInitialProps = async (ctx) => {
  const ID = await getIdFromLocalCookie();
  const query = qs.stringify(
    {
      populate: [
        "scheduler",
        "scheduler.renders",
        "scheduler.renders.downloads",
        "scheduler.renders.game_results_in_renders",
        "scheduler.renders.upcoming_games_in_renders",
        "scheduler.renders.grades_in_renders",
        "scheduler.days_of_the_week",
        "render_token",
      ],
      where: {
        account: {
          id: ID,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await Adminfetcher(`/accounts/${Cookies.get("id")}?${query}`);
  let Renders = res.attributes;
  console.group("Renders", Renders);
  return {
    Renders,
  };
};
