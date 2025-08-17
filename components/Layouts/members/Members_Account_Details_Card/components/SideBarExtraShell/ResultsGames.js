import { Group } from '@mantine/core';
import { P } from '../../../../../Members/Common/Type';
import { sumProperty } from '../../../../../../utils/actions';

export const ResultsGames = ({ renders }) => {
  const totalResults = sumProperty(renders, 'game_results_in_renders');
  return (
    <Group position='apart'>
      <Group position='left' spacing='xs' align='center'>
        <P size='sm' fw={500} marginBottom={0}>
          Fixture Results Analysed
        </P>
      </Group>
      <P size='sm' c='dimmed' marginBottom={0} Weight={800}>
        {totalResults}
      </P>
    </Group>
  );
};
