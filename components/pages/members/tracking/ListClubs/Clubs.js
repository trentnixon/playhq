import { RoundedSectionContainer } from "../../../../UI/Containers/SectionContainer";
import { ClubName } from "./ClubName";
import { ClubTeamList } from "./ClubTeamList";

export const ClubList = (props) => {
  const { organizationDetails } = props;

  if (!organizationDetails || !organizationDetails.data.attributes.clubs.data) {
    return <p>No club data available.</p>;
  }

  const clubs = organizationDetails.data.attributes.clubs.data;

  return (
    <>
      {clubs.map((club) => (
        <RoundedSectionContainer
          key={club.id}
          headerContent={"Club List"}
          topContent={<ClubName ClubName={club.attributes.Name} />}
          bottomContent={<ClubTeamList club={club} />}
        />
      ))}
    </>
  );
};
