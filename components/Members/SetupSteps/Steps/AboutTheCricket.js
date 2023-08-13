import { SetupInputs } from "../../Account/userFixturaSettings";
import { P } from "../../Common/Type";
import { StepHeaderandDescription } from "./StepHeaderandDescription";

export const StepAboutTheCricket = ({ user, setHasUpdated }) => {
  return (
    <>
      <StepHeaderandDescription
        Header={"Tell Us About Your Organization – We Want to Get It Right!"}
        Description={
          "Are you part of an association or a club? Your selection helps us tailor the experience to your specific needs. Choose the appropriate organization type and fill in the names below. Remember, take a moment to double-check your choices; they'll be set in stone once you proceed!"
        }
      />

      <SetupInputs user={user} setHasUpdated={setHasUpdated} />
      <P color={8} size={"xs"} textAlign="right">
        These settings CANNOT be changes in your admin panel.
      </P>
      
    </>
  );
};
export default StepAboutTheCricket;
