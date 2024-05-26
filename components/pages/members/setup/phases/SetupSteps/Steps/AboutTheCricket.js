import { SetupInputs } from "../../../../../../Members/Account/userFixturaSettings";
import { P } from "../../../../../../Members/Common/Type";
import { RoundedSectionContainer } from "../../../../../../UI/Containers/SectionContainer";
import { StepHeaderandDescription } from "./StepHeaderandDescription";

export const StepAboutTheCricket = ({ user, setHasUpdated }) => {
  return (
    <RoundedSectionContainer
      headerContent={""}
      topContent={
        <StepHeaderandDescription
          Header={"Tell Us About Your Organization – We Want to Get It Right!"}
          Description={
            "Tell us about your organization so we can ensure accuracy and tailor your experience accordingly."
          }
        />
      }
      bottomContent={
        <>
          <SetupInputs user={user} setHasUpdated={setHasUpdated} />
          <P color={8} size={"xs"} textAlign="right">
            These settings CANNOT be changed in your admin panel.
          </P>
        </>
      }
    />
  );
};
export default StepAboutTheCricket;
