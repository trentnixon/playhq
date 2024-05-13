import { Group } from "@mantine/core";
import { P } from "../../../../Members/Common/Type";
import { IconCalendar } from "@tabler/icons";

export const ListMonth = ({month}) => {
  return (
    <Group mt={0} position="left" w={"100%"}>
      <P marginBottom={0} size={30} weight={900}>
        {month}
      </P>
      {/* <IconCalendar size={"1.8em"} color="gray" /> */}
    </Group>
  );
};
