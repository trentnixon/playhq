import { Group } from "@mantine/core";
import { P } from "../../../../../Members/Common/Type";

export const DeliveryDay = ({ scheduler }) => {
    return (
      <Group position="apart">
        <Group position="left" spacing="xs" align="center">
          <P size="sm" fw={500} marginBottom={0}>
            Bundle Delivery
          </P>
        </Group>
        <P size="sm" c="dimmed" marginBottom={0} Weight={800}>
          {scheduler.days_of_the_week.data.attributes.Name}
        </P>
      </Group>
    );
  };