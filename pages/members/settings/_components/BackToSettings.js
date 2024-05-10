import { Group } from "@mantine/core";
import { Wrapper } from "../../../../components/Members/Common/Containers";
import { BTN_TOINTERALLINK } from "../../../../components/Members/Common/utils/Buttons";

export const BackToSettings = () => {
  return (
    <Wrapper>
      <Group position="right">
        <BTN_TOINTERALLINK LABEL={"Back to Settings"} URL={"/members/settings/"} />
      </Group>
    </Wrapper>
  );
};
