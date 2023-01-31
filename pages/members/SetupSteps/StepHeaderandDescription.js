import { Space } from "@mantine/core";
import { Wrapper } from "../../../components/Members/Common/Containers";
import { P } from "../../../components/Members/Common/Type";

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
  export default StepHeaderandDescription