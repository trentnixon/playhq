import { Center, Group } from "@mantine/core";
import { useMantineTheme } from "@mantine/styles";
import { IconCircleCheck } from "@tabler/icons";
import { P } from "../../../../../../Members/Common/Type";

export const SelectColorLabel = ({ Selector, LABEL }) => {
    const theme = useMantineTheme();
    return (
      <Group>
        <Center>
          <IconCircleCheck
            color={Selector ? theme.colors.green[6] : theme.colors.gray[1]}
          />
        </Center>
        <P marginBottom={0} Weight={900} textTransform={"uppercase"}>
          {LABEL}
        </P>
      </Group>
    );
  };