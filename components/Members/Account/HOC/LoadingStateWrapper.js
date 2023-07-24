import { Paper } from "@mantine/core";
import { FixturaLoading } from "../../Common/Loading";


export const LoadingStateWrapper = ({ conditions, children }) => {
  const isLoading = conditions.some(condition => !condition);
  
  return isLoading ? (
    <Paper
      radius="md"
      shadow="md"
      withBorder
      my={20}
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colors.dark[4],
      })}
    ><FixturaLoading/></Paper>
  ) : children;
};
