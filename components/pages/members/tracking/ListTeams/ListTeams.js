import { Badge, Group, Stack } from "@mantine/core";
import { useMantineTheme } from "@mantine/styles";
import { P } from "../../../../Members/Common/Type";

const getCardStyles = (theme) => {
    let styles = {
      opacity: 1,
      display: "block",
      backgroundColor: theme.colors.white,
    };
  
    return styles;
  };
  
export const ListTeams = (props) => {
  const { teams } = props;
  const theme = useMantineTheme();
  return (
    <>
      {teams.map((team) => (
        <Stack key={team.id} mb={30} spacing={0}>
          <Group position="apart">
            <P marginBottom={0} size={18} Weight={600}>
              {team.attributes.teamName}
            </P>
            <Badge color="gray"> Form: {team.attributes.form}</Badge>
          </Group>
          <Group
            position="apart"
            px={10}
            py={3}
            style={{
              backgroundColor: theme.colors.gray[0],
              borderRadius: "5px",
            }}
          >
            <P marginBottom={0} size={14} Weight={400}>
              Played: {team.attributes.gamesPlayed}
            </P>
            <P marginBottom={0} size={14} Weight={400}>
              W: {team.attributes.wins}
            </P>
            <P marginBottom={0} size={14} Weight={400}>
              L: {team.attributes.losses}
            </P>
          </Group>
        </Stack>
      ))}
    </>
  );
};
