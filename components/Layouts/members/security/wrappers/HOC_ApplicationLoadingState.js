import { Center, Paper } from '@mantine/core';
import { FixturaLoading } from '../../../../Members/Common/Loading';
import { useEffect } from 'react';

export const HOC_ApplicationLoadingState = ({ conditions, children }) => {
  const isLoading = conditions.some(condition => !condition);

  useEffect(() => {}, [conditions]);
  return isLoading ? (
    <Paper
      radius='md'
      shadow='md'
      withBorder
      my={60}
      p='lg'
      sx={theme => ({
        backgroundColor: theme.colors.dark[4],
      })}
    >
      <Center>
        <FixturaLoading />
      </Center>
    </Paper>
  ) : (
    children
  );
};
