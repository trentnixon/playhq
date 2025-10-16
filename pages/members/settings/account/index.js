import { PageTitle } from '../../../../components/Members/Common/Type';
import { useAccountDetails } from '../../../../context/userContext';
import { IconUserCircle } from '@tabler/icons-react';
import { BackToSettings } from '../../../../components/pages/members/settings/_components/BackToSettings';
import { RoundedSectionContainer } from '../../../../components/UI/Containers/SectionContainer';
import SecureRouteHOC from '../../../../components/Layouts/members/security/SecureRouteHC';
import { PageMetaData } from '../../../../components/Layouts/members/Meta/pageMetaData';
import { LoadingOverlay } from '@mantine/core';
import { useUserDetails } from '../../../../Hooks/useUserDetails';
import { AccountInformation } from '../../../../components/pages/members/settings/account/components/AccountInformation';
//import { SubscriptionInformation } from '../../../../components/pages/members/settings/account/components/SubscriptionInformation';

const AccountSettings = () => {
  const { account, forceRefresh } = useAccountDetails();
  const { user, loading, refresh: refreshUser } = useUserDetails();

  const MetaOBJ = {
    title: 'Account Settings - Fixtura',
    description: 'View and manage your account settings and information',
    keywords: 'Account settings, user profile, Fixtura account',
  };

  if (!account && !loading) return null;

  return (
    <SecureRouteHOC conditions={[account || loading]}>
      <PageMetaData MetaOBJ={MetaOBJ} />

      <PageTitle
        Copy={'Settings - Account'}
        ICON={<IconUserCircle size={40} />}
      />
      <BackToSettings />

      <LoadingOverlay visible={loading} />

      {!loading && user && account && (
        <>
          <RoundedSectionContainer
            headerContent='Authentication & Request Details'
            topContent='Your login credentials and asset delivery information.'
            bottomContent={
              <AccountInformation
                user={user}
                account={account}
                onUpdate={forceRefresh}
                onUserUpdate={refreshUser}
              />
            }
          />

          {/*        <Divider my={30} />

          <RoundedSectionContainer
            headerContent='Subscription & Orders'
            topContent='Your active subscriptions, orders, and trial status.'
            bottomContent={
              <SubscriptionInformation user={user} account={account} />
            }
          /> */}
        </>
      )}
    </SecureRouteHOC>
  );
};

export default AccountSettings;
