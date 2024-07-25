// react
import { useEffect, useState } from "react";
/* import { useRouter } from "next/router"; */
import { useUser } from "../../context/authContext";
import { getIdFromLocalCookie } from "../../lib/auth";
// UTILS
import Adminfetcher from "../../lib/Adminfetcher";
import {
  IconCalendarEvent,
  IconTrack,
  IconUsersGroup,
} from "@tabler/icons-react";
// Components
import {
  MembersWrapper,
  PageCopyWrapper,
  ShadowWrapper,
} from "../../components/Members/Common/Containers";
import { showNotification } from "@mantine/notifications";

import { useAccountDetails } from "../../context/userContext";
import { FixturaDivider } from "../../components/Members/Common/Divider";

import { P, PageTitle } from "../../components/Members/Common/Type";
import SetupCheck from "../../components/Members/Account/HOC/SetupCheck";
import { LoadingStateWrapper } from "../../components/Members/Account/HOC/LoadingStateWrapper";
import { GamesListing } from "../../components/pages/members/tracking/ListFixtures/ListFixtures";
import { TeamList } from "../../components/pages/members/tracking/ListTeams/Teams";
import { FindAccountType, FindAccountTypeOBJ } from "../../lib/actions";
import { useGetOrganizationDetails } from "../../Hooks/useGetOrganizationDetails";
import { ClubList } from "../../components/pages/members/tracking/ListClubs/Clubs";
import Meta from "../../components/Layouts/Meta";
import { Tabs } from "@mantine/core";


const Tracking = ({ DATA }) => {
  const { account } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const { user, loading } = useUser();
  const accountType = FindAccountType(account);
  const accountId = FindAccountTypeOBJ(account).id;

  const { data: organizationDetails, loading: loadingOrgDetails } =
    useGetOrganizationDetails(accountType, accountId);

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
      <Meta
        title="Season Tracking - Fixtura: Stay Updated with Your Games"
        description="Track your sports club's season fixtures and performances on Fixtura. Stay informed and organized throughout the season."
        keywords="Season tracking, Fixtura games update, sports club fixtures, digital media schedule, club game tracking"
      />
      <SetupCheck>
        <LoadingStateWrapper conditions={[user, userAccount, DATA]}>
          <PageTitle Copy={`Season Tracking`} ICON={<IconTrack size={40} />} />
          <PageCopyWrapper>
            <P>
              Dive into a comprehensive view of all the fixtures Fixtura is
              diligently monitoring for your club or association.
            </P>
          </PageCopyWrapper>

          {Object.keys(DATA).length === 0 ? (
            <ShadowWrapper>
              <P textAlign="center" Weight={900} color={8}>
                No fixtures registered at the moment.
              </P>
              <P textAlign="center" color={8}>
                Fixtura is currently tracking 0 fixtures. If you believe this is
                incorrect, please contact us here.
              </P>
            </ShadowWrapper>
          ) : loadingOrgDetails ? (
            <p>Loading organization details...</p>
          ) : organizationDetails ? (
            <TrackingLayout
              gamesData={DATA}
              organizationDetails={organizationDetails}
              accountType={accountType}
            />
          ) : (
            <p>Error or no data available for organization details</p>
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

const TrackingLayout = (props) => {
  const { gamesData, organizationDetails, accountType } = props;

  return (
    <>
      <Tabs defaultValue="fixtures" variant="pills" color="blue">
        <Tabs.List position="right">
          <Tabs.Tab value="fixtures" icon={<IconCalendarEvent size="1.2rem" />}>
            View Fixtures
          </Tabs.Tab>
          <Tabs.Tab value="clubs" icon={<IconUsersGroup size="1.2rem" />}>
            {accountType === "Association" ? "View Clubs" : "View Teams"}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="fixtures" pt="xs">
          <GamesListing gamesData={gamesData} />
        </Tabs.Panel>

        <Tabs.Panel value="clubs" pt="xs">
          {accountType === "Association" ? (
            <ClubList {...props} />
          ) : (
            <TeamList {...props} />
          )}
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

{
  /* <PageCopyWrapper>
            <P marginBottom={10} size={20} Weight={600}>
              WHY CAN'T I SEE A TEAM?
            </P>
            <P>
              At times, you might notice a team or game missing from your
              Fixtura tracking. This usually happens if your association hasn't
              yet released the fixture list for a certain grade or weekend.
              Also, if the grade's ladder isn't updated or available, we can't
              display the team, as we rely on these ladders for accurate
              positioning.
            </P>
            <P Weight={600}>
              Note that Fixtura currently does not track ungraded leagues such
              as Stage One juniors.
            </P>
            <P>
              Fixtura conducts regular health checks on your account every three
              days. So, if any fixtures are missing, they should appear soon. If
              your team has an established ladder but is still not visible,
              please contact us on Facebook for quick assistance.
            </P>
          </PageCopyWrapper> */
}
