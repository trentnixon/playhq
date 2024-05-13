import { Paper } from "@mantine/core";

export const SelectDayPaperWrapper = ({ children }) => {
  return (
    <Paper
      shadow="lg"
      p="md"
      withBorder
      radius="md"
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[8],
      })}
    >
      {children}
    </Paper>
  );
};
