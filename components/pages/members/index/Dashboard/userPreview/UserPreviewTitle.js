import { Box, Group } from "@mantine/core";
import { P } from "../../../../../Members/Common/Type";
import { BTN_TOINTERALLINK } from "../../../../../Members/Common/utils/Buttons";
export const UserPreviewTitle = () => {
  return (
    <Group position="apart">
      <Box w={"70%"}>
        <P marginBottom={0}>
          Preview your assets here with our sample data. For a look that
          perfectly fits your brand, don't forget to visit our customization
          section
        </P>
      </Box>
      <Group position="right">
        <BTN_TOINTERALLINK
          LABEL={"More Templates"}
          URL={"/members/templates/"}
        />
      </Group>
    </Group>
  );
};
