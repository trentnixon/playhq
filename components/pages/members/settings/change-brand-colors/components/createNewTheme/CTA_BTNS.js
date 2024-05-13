import { Group } from "@mantine/core";
import { BTN_ONCLICK } from "../../../../../../Members/Common/utils/Buttons";

export const CTA_BTNS = (props) => {
  const { setCreateNew, processing, handleCreateNewTheme, idDisabled } = props;
  return (
    <Group position="right">
      <BTN_ONCLICK
        LABEL={"Back"}
        THEME={"error"}
        HANDLE={() => {
          setCreateNew(false);
        }}
      />
      <BTN_ONCLICK
        LABEL={processing ? "Update" : "Create"}
        HANDLE={handleCreateNewTheme}
        idDisabled={idDisabled}
      />
    </Group>
  );
};
