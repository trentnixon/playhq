import { Box, Group, Paper } from "@mantine/core";
import { Wrapper } from "../Members/Common/Containers";
import { P } from "../Members/Common/Type";
import { SelectDeliveryDay } from "../Members/Downloads/SelectDeliveryDay";
// Utils
import { daysUntil, checkDeliveryDate } from "./helpers";
import { useAccountDetails } from "../../lib/userContext";
export const DownloadsSelectDays = ({ renders }) => {
  const { account, ReRender } = useAccountDetails();
  const days_of_the_week =
    account.attributes.scheduler.data.attributes.days_of_the_week.data
      .attributes.Name;
  return (
    <>
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
    </>
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
           >{`Next Order will be delivered in ${daysUntil(
            days_of_the_week
          )} days`}</P>
        ) : (
          <P color={1} marginBottom={0}>{checkDeliveryDate(renders)}</P>
        )}
      </Box>
    </Paper>
  );
};
