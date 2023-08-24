import { Box, Group } from "@mantine/core";
import { P } from "../../Common/Type";
import { SPONSOR_CTABTN } from "../Components/SPONSOR_CTABTN";

export const HeaderSection = ({ Sponsors, SPONSORLIMIT, setIsCreate, isCreate }) => (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.members[1],
        padding: "10px 20px",
        borderRadius: "10px 10px 0 0 ",
        borderBottom: `1px solid ${theme.colors.members[3]}`,
      })}
    >
      <Group position="right">
        {Sponsors.length < SPONSORLIMIT ? (
          <Group position="right">
            <P
              color={3}
              Weight={400}
              textTransform={`uppercase`}
              Copy={`sponsors : ${Sponsors.length}`}
              marginBottom={0}
            />
            <SPONSOR_CTABTN setIsCreate={setIsCreate} isCreate={isCreate} />
          </Group>
        ) : (
          <P color={3} Weight={400} marginBottom={0}>
            Sponsor limit has been reached.
          </P>
        )}
      </Group>
    </Box>
  );