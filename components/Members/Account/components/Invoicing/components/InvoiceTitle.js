import { Box, Group } from '@mantine/core';
import { H } from '../../../../Common/Type';
export const InvoiceTitle = ({ order }) => (
  <Box
    position='apart'
    my={0}
    mx={0}
    py={30}
    px={20}
    borderRadius='md'
    className='gradient-color'
    sx={theme => ({
      borderRadius: `${theme.radius.sm} ${theme.radius.sm}  0 0 `,
    })}
  >
    <Group>
      <H mb={0} color={'white'}>
        {order?.subscription_tier?.data.attributes.Name}
      </H>
    </Group>
  </Box>
);
