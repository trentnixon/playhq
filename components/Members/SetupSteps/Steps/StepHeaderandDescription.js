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
          size={'xl'}
          Weight={900}
          marginBottom={10}
          textTransform={"uppercase"}
          Copy={Header}
        />
        <P color={2} Copy={Description} lineHeight={'1.3em'}/>
      </Wrapper>
    </>
  );
};