import { Badge, Card, Group, Stack, useMantineTheme } from "@mantine/core";
import { P } from "../Common/Type";

const getCardStyles = (theme) => {
  let styles = {
    opacity: 1,
    display: "block",
    backgroundColor: theme.colors.white,
  };

  return styles;
};
export const TeamList = (props) => {
  const { organizationDetails } = props;
  const theme = useMantineTheme();
  console.log(organizationDetails);
  if (!organizationDetails || !organizationDetails.data.attributes.teams.data) {
    return <p>No team data available.</p>;
  }

  const teams = organizationDetails.data.attributes.teams.data;

  return (
    <>
      <P marginBottom={14} size={24} Weight={900}>
        Team List
      </P>
      <Card
        shadow="sm"
        padding="lg"
        mb={50}
        p={`xs`}
        radius={`xs`}
        style={getCardStyles(theme)}
      >
        {teams.map((team) => (
          <Stack key={team.id} mb={30} spacing={0} >
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
                backgroundColor: theme.colors.gray[3],
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
      </Card>
    </>
  );
};
