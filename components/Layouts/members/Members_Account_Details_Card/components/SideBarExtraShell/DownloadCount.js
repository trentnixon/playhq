import { Group } from '@mantine/core';
import { sumProperty } from '../../../../../../utils/actions';
import { P } from '../../../../../Members/Common/Type';

export const DownloadCount = ({ renders }) => {
  const totalDownloads = sumProperty(renders, 'downloads');
  return (
    <Group position='apart'>
      <Group position='left' spacing='xs' align='center'>
        <P size='sm' fw={500} marginBottom={0}>
          Downloads Created
        </P>
      </Group>
      <P size='sm' c='dimmed' marginBottom={0} Weight={800}>
        {totalDownloads}
      </P>
    </Group>
  );
};
