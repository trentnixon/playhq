import { Group } from '@mantine/core';
import { P } from '../../../../../../Members/Common/Type';
import { BTN_ONCLICK } from '../../../../../../Members/Common/utils/Buttons';

export const BTN_ReverseColors = props => {
  const { handleReverseColors } = props;
  return (
    <Group position='apart' mt={20}>
      <P size={'xs'}>
        Tip: To make your assets stand out, set the darker color as the primary.
      </P>
      <BTN_ONCLICK
        LABEL={'Reverse Colors'}
        THEME={'cta'}
        HANDLE={handleReverseColors}
      />
    </Group>
  );
};
