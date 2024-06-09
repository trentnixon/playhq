import { Group } from "@mantine/core";
import { sumProperty } from "../../../../../../utils/actions";
import { P } from "../../../../../Members/Common/Type";

export const UpcomingGames = ({ renders }) => {
    const totalUpcoming = sumProperty(renders, "upcoming_games_in_renders");
    return (
      <Group position="apart">
        <Group position="left" spacing="xs" align="center">
          <P size="sm" fw={500} marginBottom={0}>
            Upcoming Fixtures Analysed
          </P>
        </Group>
        <P size="sm" c="dimmed" marginBottom={0} Weight={800}>
          {totalUpcoming}
        </P>
      </Group>
    );
  };