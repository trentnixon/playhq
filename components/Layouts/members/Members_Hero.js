import { Container, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FixturaHeaderMeta } from '../../Members/Account/userFixturaSettings';
import { useAccountDetails } from '../../../context/userContext';

export const MembersHero = () => {
  const { account } = useAccountDetails();
  const isMobile = useMediaQuery('(max-width: 767px)');

  // Don't render on mobile
  if (isMobile) {
    return null;
  }

  return (
    <Container fluid mx={0} p={0}>
      <Box
        pt={40}
        sx={theme => ({
          height: '70px',
          backgroundColor: theme.colors.gray[8],
          display: 'flex',
          justifyContent: 'flex-end',
          alignContent: 'baseline',
          flexDirection: 'column',
        })}
      >
        <FixturaHeaderMeta user={account} />
      </Box>
    </Container>
  );
};
