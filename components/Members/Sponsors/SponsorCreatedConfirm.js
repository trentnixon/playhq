import { Avatar, Center, Group } from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import { P } from "../Common/Type";

export const SponsorCreatedConfirm = ({ Sponsor }) => {
    return (
        <Center>
        <Group mt={50}>
          <Avatar color={"green"} size={80} radius={80}>
            <IconCheck size={40} />
          </Avatar>
          <P
            marginBottom={0}
            Weight={900}
            textTransform={`uppercase`}
            Copy={`Sponsor ${Sponsor.attributes.Name} Created`}
          />
        </Group>
      </Center>
    );
  };