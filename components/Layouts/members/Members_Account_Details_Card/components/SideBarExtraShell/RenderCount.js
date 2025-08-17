import { Group } from '@mantine/core';
import { P } from '../../../../../Members/Common/Type';

export const RenderCount = ({ renders }) => {
  return (
    <Group position='apart'>
      <Group position='left' spacing='xs' align='center'>
        <P size='sm' fw={500} marginBottom={0}>
          Bundles
        </P>
      </Group>
      <P size='sm' c='dimmed' marginBottom={0} Weight={800}>
        {renders.renders.length}
      </P>
    </Group>
  );
};
