import { Box, Paper } from '@mantine/core';
import { DisplayDaysTillDelivery } from './DisplayDaysTillDelivery';

export const DaysTillWithWrapper = ({ renders }) => {
  return (
    <DaysTillDeliverWrapper>
      <DisplayDaysTillDelivery renders={renders} />
    </DaysTillDeliverWrapper>
  );
};

const DaysTillDeliverWrapper = ({ children }) => {
  return (
    <Paper
      shadow='xs'
      p='md'
      withBorder
      radius='md'
      sx={theme => ({
        background: theme.colors.gray[3],
      })}
    >
      <Box>{children}</Box>
    </Paper>
  );
};
