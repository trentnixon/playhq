import { Paper } from '@mantine/core';

export const SelectDayPaperWrapper = ({ children }) => {
  return (
    <Paper
      shadow='xs'
      p='md'
      withBorder
      radius='md'
      sx={theme => ({
        backgroundColor: theme.colors.gray[3],
      })}
    >
      {children}
    </Paper>
  );
};
