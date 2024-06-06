import { Group, Button } from "@mantine/core";
import { BTN_ONCLICK } from "../../../Members/Common/utils/Buttons";
import { FixturaLoading } from "../../../Members/Common/Loading";

const TemplateCTABtns = ({
  loading,
  handleBackClick,
  handleSelectTemplate,
  isSelectedTemplate,
  error,
}) => (
  <Group position="right" mb="md">
    {loading ? (
      <FixturaLoading />
    ) : (
      <>
        <BTN_ONCLICK THEME="error" LABEL="Back to Templates" HANDLE={handleBackClick} />
        {!isSelectedTemplate ? (
          <BTN_ONCLICK THEME="success" LABEL="Select this template" HANDLE={handleSelectTemplate} />
        ) : (
          <Button disabled>Selected Template</Button>
        )}
      </>
    )}
    {error && <div style={{ color: 'red' }}>{error}</div>}
  </Group>
);

export default TemplateCTABtns;
