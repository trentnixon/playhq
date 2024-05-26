import { useMediaQuery } from "@mantine/hooks";
import { Space, useMantineTheme } from "@mantine/core";
import { Wrapper } from "../../../../../../Members/Common/Containers";
import { P } from "../../../../../../Members/Common/Type";

export const StepHeaderandDescription = ({ Header, Description }) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return (
    <>
     
      <Wrapper px={mobile ? 0 : "sm"}>
        <P
          color={6}
          size={mobile ? "md" : "xl"}
          Weight={900}
          marginBottom={10}
          textTransform={"uppercase"}
          Copy={Header}
        />
        <P
          color={6}
          size={mobile ? "sm" : "md"}
          Copy={Description}
          lineHeight={"1.3em"}
        />
      </Wrapper>
    </>
  );
};
