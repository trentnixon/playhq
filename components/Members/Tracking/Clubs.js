import { Badge, Card, Group, Stack, useMantineTheme } from "@mantine/core";
import { P } from "../Common/Type";

const getCardStyles = (theme) => {
  return {
    opacity: 1,
    display: "block",
    backgroundColor: theme.colors.white,
  };
};

export const ClubList = (props) => {
  const { organizationDetails } = props;
  const theme = useMantineTheme();

  if (!organizationDetails || !organizationDetails.data.attributes.clubs.data) {
    return <p>No club data available.</p>;
  }

  const clubs = organizationDetails.data.attributes.clubs.data;

  return (
    <>
      <P marginBottom={14} size={24} Weight={900}>
        Club List
      </P>
      {clubs.map((club) => (
        <Card
          key={club.id}
          shadow="sm"
          padding="lg"
          mb={50}
          p={`xs`}
          radius={`xs`}
          style={getCardStyles(theme)}
        >
          <P marginBottom={14} size={20} Weight={600}>
            {club.attributes.Name}
          </P>
          <Stack mb={30} spacing={0}>
            {club.attributes.teams.data.map((team) => (
              <P key={team.id} marginBottom={0} size={16} Weight={400}>
                {team.attributes.teamName}
              </P>
            ))}
          </Stack>
        </Card>
      ))}
    </>
  );
};
