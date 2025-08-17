import { Box } from '@mantine/core';
import { P } from '../../../../Members/Common/Type';

export const SponsorLimitMessage = ({ Sponsors, SPONSORLIMIT, isCreate }) => {
  if (isCreate) return null;

  const message =
    Sponsors.length >= SPONSORLIMIT
      ? 'You have reached the limit of your sponsors. Please edit or delete a sponsor to add a new one.'
      : ``;

  return (
    <Box
      sx={theme => ({
        padding: '0px 10px',
        marginTop: '0px', // Space between this message and previous components
      })}
    >
      <P
        color={6}
        size={'xs'}
        Weight={400}
        textAlign={'right'}
        marginBottom={0}
      >
        {message}
      </P>
    </Box>
  );
};
