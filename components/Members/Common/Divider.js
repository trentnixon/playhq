import { Divider, Space } from '@mantine/core';
import { Wrapper } from './Containers';

export const FixturaDivider = () => {
  return (
    <Wrapper>
      <Space h={30} />
      <Divider size={5} color={'#f1f1f1'} />
      <Space h={30} />
    </Wrapper>
  );
};
