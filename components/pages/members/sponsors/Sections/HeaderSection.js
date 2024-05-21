import { Box, Group } from "@mantine/core";
import { P } from "../../../../Members/Common/Type";
import { SPONSOR_CTABTN } from "../Components/SPONSOR_CTABTN";
import { BTN_TOINTERALLINK } from "../../../../Members/Common/utils/Buttons";

export const HeaderSection = ({
  Sponsors,
  SPONSORLIMIT,
  setIsCreate,
  isCreate,
}) => (
  <Group position="apart">
    <Box
      sx={(theme) => ({
        width: "40%",
      })}
    >
      <P Weight={800} marginBottom={0}>Manage your Sponsors.</P>
      <P size="xs" marginBottom={0}>Add, Edit, Allocate your sponsors</P>
    </Box>
    <Group position="right">
      {Sponsors.length < SPONSORLIMIT ? (
        <Group position="right">
          <SPONSOR_CTABTN setIsCreate={setIsCreate} isCreate={isCreate} />
        </Group>
      ) : (
        <P color={6} Weight={400} marginBottom={0}>
          Sponsor limit has been reached.
        </P>
      )}
      <BTN_TOINTERALLINK
        LABEL=" Allocate Sponsors"
        URL="/members/sponsors/allocation/"
        THEME="success"
      />
    </Group>
  </Group>
);

export const AllocationHeaderSection = () => (
  <Group position="right">
    <BTN_TOINTERALLINK
      LABEL="Manage Sponsors"
      URL="/members/sponsors/"
      THEME="success"
    />
  </Group>
);
