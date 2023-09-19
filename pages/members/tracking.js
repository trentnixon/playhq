// react
import { useEffect, useState } from "react";
/* import { useRouter } from "next/router"; */
import { useUser } from "../../lib/authContext";
import { getIdFromLocalCookie } from "../../lib/auth";
// UTILS
import Adminfetcher from "../../lib/Adminfetcher";
import { IconTrack } from "@tabler/icons-react";
// Components
import {
  MembersWrapper,
  PageCopyWrapper,
  ShadowWrapper,
} from "../../components/Members/Common/Containers";
import { showNotification } from "@mantine/notifications";

import { useAccountDetails } from "../../lib/userContext";
import { FixturaDivider } from "../../components/Members/Common/Divider";

import { P, PageTitle } from "../../components/Members/Common/Type";
import SetupCheck from "../../components/Members/Account/HOC/SetupCheck";
import { LoadingStateWrapper } from "../../components/Members/Account/HOC/LoadingStateWrapper";
import { GamesCalendar } from "../../components/Members/Tracking/GamesCalendar";
import { NextGameDate } from "../../components/Members/Tracking/NextGameDate";

const Tracking = ({ DATA }) => {
  const { account } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  /* is User Auth */
  const { user, loading } = useUser();
/*   const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    if (!user) router.push(`/members/verification/?prev=${currentRoute}`);
  }, [user]); */

  useEffect(() => {
    if (account) {
      setUserAccount(account);
      showNotification({
        title: "Action Completed",
        message: "Your account details have been successfully saved",
      });
    }
  }, [account]);
  return (
    <MembersWrapper>
      <SetupCheck>
        <LoadingStateWrapper conditions={[user, userAccount, DATA]}>
          <PageTitle Copy={`Tracking`} ICON={<IconTrack size={40} />} />
          <PageCopyWrapper>
            <P
              Copy={`Get an overview of the fixtures Fixtura is tracking for your club or association. Simply hover over the icons to see the games scheduled for each date. Rest assured that Fixtura regularly checks and updates your fixtures, so you don't need to worry about any changes to your playing schedule. Stay organized and informed with Fixtura's reliable tracking feature.`}
            />
          </PageCopyWrapper>
          {Object.keys(DATA).length === 0 ? (
            <>
              <ShadowWrapper>
                <P textAlign="center" Weight={900} color={8}>
                  No fixtures registered at the moment.{" "}
                </P>
                <P textAlign="center" color={8}>
                  Fixtura is currently tracking 0 fixtures. If you believe this
                  is incorrect, please contact us here.
                </P>
              </ShadowWrapper>
            </>
          ) : (
            <NextGameDate gamesData={DATA} />
          )}

          {Object.keys(DATA).length === 0 ? (
            false
          ) : (
            <>
              <P>Full Calendar</P>
              <GamesCalendar gamesData={DATA} />
            </>
          )}

          <FixturaDivider />
        </LoadingStateWrapper>
      </SetupCheck>
    </MembersWrapper>
  );
};

export default Tracking;

Tracking.getInitialProps = async (ctx) => {
  const ID = await getIdFromLocalCookie();

  if (ID === undefined) {
    return { DATA: false };
  }

  const res = await Adminfetcher(`/account/createTracking/${ID}`);
  let DATA = res;

  return { DATA };
};
