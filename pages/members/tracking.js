// react
import { useEffect, useState } from 'react';
/* import { useRouter } from "next/router"; */
import { useUser } from '../../context/authContext';
import { getIdFromLocalCookie } from '../../lib/auth';
// UTILS
import Adminfetcher from '../../lib/Adminfetcher';
import { IconTrack } from '@tabler/icons-react';
// Components
import {
  MembersWrapper,
  PageCopyWrapper,
  ShadowWrapper,
} from '../../components/Members/Common/Containers';
import { showNotification } from '@mantine/notifications';

import { useAccountDetails } from '../../context/userContext';
import { FixturaDivider } from '../../components/Members/Common/Divider';

import { P, PageTitle } from '../../components/Members/Common/Type';
import SetupCheck from '../../components/Members/Account/HOC/SetupCheck';
import { LoadingStateWrapper } from '../../components/Members/Account/HOC/LoadingStateWrapper';
import { GamesListing } from '../../components/pages/members/tracking/ListFixtures/ListFixtures';
import { FindAccountType, FindAccountTypeOBJ } from '../../lib/actions';
import { useGetOrganizationDetails } from '../../Hooks/useGetOrganizationDetails';
import Meta from '../../components/Layouts/Meta';

const Tracking = ({ DATA }) => {
  const { account } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const { user } = useUser();
  const accountType = FindAccountType(account);
  const accountId = FindAccountTypeOBJ(account).id;

  const { data: organizationDetails, loading: loadingOrgDetails } =
    useGetOrganizationDetails(accountType, accountId);

  useEffect(() => {
    if (account) {
      setUserAccount(account);
      showNotification({
        title: 'Action Completed',
        message: 'Your account details have been successfully saved',
      });
    }
  }, [account]);
  return (
    <MembersWrapper>
      <Meta
        title='Season Tracking - Fixtura: Stay Updated with Your Games'
        description="Track your sports club's season fixtures and performances on Fixtura. Stay informed and organized throughout the season."
        keywords='Season tracking, Fixtura games update, sports club fixtures, digital media schedule, club game tracking'
      />
      <SetupCheck>
        <LoadingStateWrapper conditions={[user, userAccount, DATA]}>
          <PageTitle Copy={`Fixture Tracking`} ICON={<IconTrack size={40} />} />
          <PageCopyWrapper>
            <P marginBottom={50}>
              Track your season fixtures with powerful search and filtering
              tools. View upcoming and completed games, check scores and
              results, and explore fixtures by team, grade, or date range.
              Switch between list and calendar views to stay organized
              throughout your season.
            </P>
          </PageCopyWrapper>

          {Object.keys(DATA).length === 0 ? (
            <ShadowWrapper>
              <P textAlign='center' Weight={900} color={8}>
                No fixtures registered at the moment.
              </P>
              <P textAlign='center' color={8}>
                Fixtura is currently tracking 0 fixtures. If you believe this is
                incorrect, please contact us here.
              </P>
            </ShadowWrapper>
          ) : loadingOrgDetails ? (
            <P textAlign='center' color={8}>
              Loading organization details...
            </P>
          ) : organizationDetails ? (
            <GamesListing
              gamesData={DATA}
              organizationDetails={organizationDetails}
              accountType={accountType}
            />
          ) : (
            <P textAlign='center' color={8}>
              Error or no data available for organization details
            </P>
          )}

          <FixturaDivider />
        </LoadingStateWrapper>
      </SetupCheck>
    </MembersWrapper>
  );
};

export default Tracking;

Tracking.getInitialProps = async ctx => {
  const ID = await getIdFromLocalCookie();

  if (ID === undefined) {
    return { DATA: false };
  }

  const res = await Adminfetcher(`/account/createTracking/${ID}`);
  let DATA = res;

  return { DATA };
};
