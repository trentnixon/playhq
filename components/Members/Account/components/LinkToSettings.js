import { Box, Group } from '@mantine/core';
import { Wrapper } from '../../Common/Containers';
import { BTN_TOINTERALLINK } from '../../Common/utils/Buttons';

export const LinkToSettings = () => {
  return (
    <Wrapper>
      <Group position='apart'>
        <Box
          sx={theme => ({
            width: '60%',
          })}
        ></Box>
        <BTN_TOINTERALLINK
          LABEL='What is in the Subscription'
          URL='/members/settings/'
          THEME='cta'
        />
      </Group>
    </Wrapper>
  );
};
