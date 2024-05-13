import { P } from "../../../../Members/Common/Type";

export const ClubTeamList = ({ club }) => {
    return (
      <>
        {club.attributes.teams.data.map((team) => (
          <P key={team.id} marginBottom={0} size={16} Weight={400}>
            {team.attributes.teamName}
          </P>
        ))}
      </>
    );
  };

