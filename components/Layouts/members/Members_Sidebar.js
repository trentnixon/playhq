import { Container } from '@mantine/core';
import { useAccountDetails } from '../../../context/userContext';
import { UserDetailsCard } from './Members_Account_Details_Card/Members_Account_Details_Card';
import { SideBarExtraShell } from './Members_Account_Details_Card/SideBarExtras';
import { useEffect } from 'react';
export const MembersSidebar = () => {
  const { account } = useAccountDetails();

  if (!account) return null;
  return (
    <Container fluid mx={0} p={0}>
      <UserDetailsCard user={account} />
      <SideBarExtraShell account={account} />
    </Container>
  );
};
