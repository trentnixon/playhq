import { Badge, Card, Group, Stack, useMantineTheme } from '@mantine/core';
import { P } from '../../../../Members/Common/Type';
import { RoundedSectionContainer } from '../../../../UI/Containers/SectionContainer';
import { ListTeams } from './ListTeams';

export const TeamList = props => {
  const { organizationDetails } = props;
  const theme = useMantineTheme();
  //console.log(organizationDetails);
  if (!organizationDetails || !organizationDetails.data.attributes.teams.data) {
    return <p>No team data available.</p>;
  }

  const teams = organizationDetails.data.attributes.teams.data;

  return (
    <>
      <RoundedSectionContainer
        headerContent={'Team List'}
        topContent={''}
        bottomContent={<ListTeams teams={teams} />}
      />
    </>
  );
};
