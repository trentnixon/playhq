import { Group } from '@mantine/core';
import { P } from '../../../../Members/Common/Type';
import { PageCopyWrapper } from '../../../../Members/Common/Containers';
export const DescriptionSection = () => (
  <Group position='apart'>
    <PageCopyWrapper>
      <P>
        Centralize and manage all your sponsors here. Add up to 50 sponsors,
        including their logos, to create a comprehensive sponsor pool. Once your
        season's sponsors are added, easily allocate them to your clubs,
        associations, teams, grades, or leagues by clicking the "Allocate
        Sponsors" button.
      </P>
    </PageCopyWrapper>
  </Group>
);
