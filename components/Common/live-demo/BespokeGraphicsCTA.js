import { H, P, SubHeaders } from '../../../components/Members/Common/Type';
import {
  PageCopyWrapper,
  PaperWithBorder,
} from '../../../components/Members/Common/Containers';
import { Group, Space } from '@mantine/core';

import { BTN_TOEXTLINK } from '../../../components/Members/Common/utils/Buttons';

import { IconScissors } from '@tabler/icons-react';

export const BespokeGraphicsCTA = () => {
  return (
    <>
      <SubHeaders
        Copy={'Bespoken Graphics'}
        ICON={<IconScissors size={30} />}
      />
      <PaperWithBorder>
        <H size={'h4'} align={'left'} mb={10}>
          Already have a design theme in mind or in use?
        </H>
        <P>
          Let's work together to adapt and integrate your vision into our
          system, ensuring a consistent and authentic online presence. To learn
          more or start the design journey, DM us on our Facebook page.
        </P>
        <Group position='center' mt={20} mb={20}>
          <BTN_TOEXTLINK
            URL='https://www.facebook.com/profile.php?id=100095406210560'
            LABEL={'Start Your Bespoke Journey'}
          />
        </Group>
      </PaperWithBorder>
    </>
  );
};
