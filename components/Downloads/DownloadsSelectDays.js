import { Box, Group, Paper } from "@mantine/core";
import { Wrapper } from "../Members/Common/Containers";
import { P } from "../Members/Common/Type";
import { SelectDeliveryDay } from "../Members/Downloads/SelectDeliveryDay";
// Utils
import { daysUntil, checkDeliveryDate } from "./helpers";
export const DownloadsSelectDays = ({ days_of_the_week, renders }) => {
  return (
    <Wrapper>
      <Group position="apart">
        <Box p={0} m={0}>
          <SelectDeliveryDay />
        </Box>

        {days_of_the_week ? (
          <DaysTill days_of_the_week={days_of_the_week} renders={renders} />
        ) : (
          false
        )}
      </Group>
    </Wrapper>
  );
};

const DaysTill = ({ days_of_the_week, renders }) => {
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
      <Box>
        {!checkDeliveryDate(renders) ? (
          <P
            color={1}
            marginBottom={0}
            Copy={`Next Order will be delivered in ${daysUntil(
              days_of_the_week.Name
            )} days`}
          />
        ) : (
          <P color={1} marginBottom={0} Copy={checkDeliveryDate(renders)} />
        )}
      </Box>
    </Paper>
  );
};
