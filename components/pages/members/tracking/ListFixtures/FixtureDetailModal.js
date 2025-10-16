import { Modal, Stack, Divider } from '@mantine/core';
import { P } from '../../../../Members/Common/Type';

export const FixtureDetailModal = ({ opened, onClose, fixture }) => {
  if (!fixture) return null;

  const {
    teamHome,
    teamAway,
    date,
    month,
    grade,
    round,
    status,
    scores,
    result,
  } = fixture;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`${status} | ${date} ${month}`}
      size='md'
      centered
    >
      <Stack spacing='md'>
        <Stack spacing='md' align='center'>
          <Stack spacing={4} align='center'>
            <P marginBottom={0} size={12} color={6} Weight={600}>
              HOME
            </P>
            <P marginBottom={0} size={22} Weight={700}>
              {teamHome}
            </P>
            {scores && (
              <P marginBottom={0} size={20} Weight={600} color='blue'>
                {scores.home} {scores.homeOvers}
              </P>
            )}
          </Stack>

          <P marginBottom={0} size={16} color={6} Weight={600}>
            vs
          </P>

          <Stack spacing={4} align='center'>
            <P marginBottom={0} size={12} color={6} Weight={600}>
              AWAY
            </P>
            <P marginBottom={0} size={22} Weight={700}>
              {teamAway}
            </P>
            {scores && (
              <P marginBottom={0} size={20} Weight={600} color='blue'>
                {scores.away} {scores.awayOvers}
              </P>
            )}
          </Stack>
        </Stack>

        <Divider />

        <P marginBottom={0} size={14} color={6} textAlign='center'>
          {grade && `${grade}`} {round && `| ${round}`}
        </P>
        {result && (
          <P marginBottom={0} size={16} Weight={600} textAlign='center'>
            {result}
          </P>
        )}
      </Stack>
    </Modal>
  );
};
