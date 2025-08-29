import { Container, useMantineTheme } from '@mantine/core';
import { useAccountDetails } from '../../../context/userContext';
import { UserDetailsCard } from './Members_Account_Details_Card/Members_Account_Details_Card';
import { SideBarExtraShell } from './Members_Account_Details_Card/SideBarExtras';
import { useMediaQuery } from '@mantine/hooks';
export const MembersSidebar = () => {
  const { account } = useAccountDetails();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  if (mobile) return null;
  if (!account) return null;
  return (
    <Container fluid mx={0} p={0}>
      <UserDetailsCard user={account} />
      <SideBarExtraShell account={account} />
    </Container>
  );
};
