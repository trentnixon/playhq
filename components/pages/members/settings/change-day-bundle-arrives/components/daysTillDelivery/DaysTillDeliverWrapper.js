import { Box, Paper } from "@mantine/core";
import { DisplayDaysTillDelivery } from "./DisplayDaysTillDelivery";


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
        shadow="lg"
        p="md"
        withBorder
        radius="xs"
        sx={(theme) => ({
          background: theme.fn.linearGradient(
            45,
            theme.colors.blue[5],
            theme.colors.cyan[5]
          ),
        })}
      >
        <Box>{children}</Box>
      </Paper>
    );
  };