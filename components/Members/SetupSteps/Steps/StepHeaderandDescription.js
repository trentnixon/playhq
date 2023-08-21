import { Space, useMantineTheme } from "@mantine/core";
import { Wrapper } from "../../Common/Containers";
import { P } from "../../Common/Type";
import { useMediaQuery } from "@mantine/hooks";
export const StepHeaderandDescription = ({ Header, Description }) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return (
    <>
      <Space h={mobile ? 0 : 20} />
      <Wrapper px={mobile ? 0 : "sm"}>
        <P
          color={2}
          size={mobile ? 'md' : "xl"}
          Weight={900}
          marginBottom={10}
          textTransform={"uppercase"}
          Copy={Header}
        />
        <P color={2} size={mobile ? 'sm' : "md"} Copy={Description} lineHeight={"1.3em"} />
      </Wrapper>
    </>
  );
};
