import { Box, Group, Paper } from "@mantine/core";
import { Wrapper } from "../Members/Common/Containers";
import { P } from "../Members/Common/Type";
import { SelectDeliveryDay } from "../Members/Downloads/SelectDeliveryDay";
// Utils
import { daysUntil, checkDeliveryDate } from "./helpers";
export const DownloadsSelectDays = ({ Renders }) => {
  const { scheduler } = Renders;
  return (
    <Wrapper>
      <Group position="apart">
        <Box
         p={0}
         m={0}
        >
          <SelectDeliveryDay />
        </Box>
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
            {!checkDeliveryDate(scheduler.data) ? (
              <P
                color={1}
                marginBottom={0}
                Copy={`Next Order will be delivered in ${daysUntil(
                  scheduler.data.attributes.days_of_the_week.data.attributes
                    .Name
                )} days`}
              />
            ) : (
              <P
                color={1}
                marginBottom={0}
                Copy={checkDeliveryDate(scheduler.data)}
              />
            )}
          </Box>
        </Paper>
      </Group>
    </Wrapper>
  );
};