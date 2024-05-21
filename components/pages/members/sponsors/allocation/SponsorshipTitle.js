import { Group, Stack } from "@mantine/core";
import { P } from "../../../../Members/Common/Type";
import { AllocationHeaderSection } from "../Sections/HeaderSection";

export const SponsorGroupTitles = ({ title, description }) => {
  return (
    <>
      <Group position="apart">
        <Stack spacing="0">
          <P marginBottom={0} Weight={800}>
            {title}
          </P>
          <P size="sm" marginBottom={0}>
            {description}
          </P>
        </Stack>

        <AllocationHeaderSection />
      </Group>
    </>
  );
};
