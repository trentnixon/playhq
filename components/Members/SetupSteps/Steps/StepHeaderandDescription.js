import { Space } from "@mantine/core";
import { Wrapper } from "../../Common/Containers";
import { P } from "../../Common/Type";

export const StepHeaderandDescription = ({ Header, Description }) => {
  return (
    <>
      <Space h={20} />
      <Wrapper>
        <P
          color={2}
          Weight={900}
          marginBottom={0}
          textTransform={"uppercase"}
          Copy={Header}
        />
        <P color={2} Copy={Description} />
      </Wrapper>
    </>
  );
};