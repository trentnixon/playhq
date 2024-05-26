import { P } from "../../../../../../Members/Common/Type";
import { UserDetailsForSetup } from "../../../../../../Members/UserDetails";
import { RoundedSectionContainer } from "../../../../../../UI/Containers/SectionContainer";

import { StepHeaderandDescription } from "./StepHeaderandDescription";

export const StepAboutUser = ({ user, setHasUpdated }) => {
  return (
    <>
      <RoundedSectionContainer
        headerContent={""}
        topContent={
          <StepHeaderandDescription
            Header={"Let's Get Started with Your Weekly Content Delivery!"}
            Description={`We want to make sure your personalized content arrives flawlessly every week.`}
          />
        }
        bottomContent={
          <>
            <UserDetailsForSetup user={user} setHasUpdated={setHasUpdated} />

            <P color={6} size={"xs"} textAlign="right">
              *These settings can be changed in your admin panel
            </P>
          </>
        }
      />
    </>
  );
};
export default StepAboutUser;
