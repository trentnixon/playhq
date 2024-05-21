import { ActionIcon, Group, Stack, Tooltip } from "@mantine/core";
import { P } from "../../../../Members/Common/Type";
import { IconInfoHexagonFilled } from "@tabler/icons-react";

export  const SponsorLabel = ({ level }) => {
  return (
    <Group>
      <Stack spacing="0">
        <P marginBottom={0}>{level.name}</P>
        <P size={"xs"} marginBottom={0}>
          {level.label}
        </P>
      </Stack>
      <Tooltip
        multiline
        label={level.description}
        color="blue"
        withArrow
        radius="md"
        width={220}
      >
        <ActionIcon
          variant="filled"
          radius="xl"
          aria-label="Information"
          size={"sm"}
        >
          <IconInfoHexagonFilled  />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};