import { P } from '../../../../Common/Type';
import { Group } from '@mantine/core';

export const InvoiceHeader = ({ payment_status }) => (
  <Group position='apart' my={0} mx={100}>
    <P marginBottom={0} color={7}>
      INVOICE
    </P>
    <P marginBottom={0} color={7}>
      Status: {payment_status}
    </P>
  </Group>
);
