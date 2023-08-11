import { SetupInputs } from "../../Account/userFixturaSettings";
import { P } from "../../Common/Type";
import { StepHeaderandDescription } from "./StepHeaderandDescription";

export const StepAboutTheCricket = ({ user, setHasUpdated }) => {
  return (
    <>
      <StepHeaderandDescription
        Header={"About your association/club"}
        Description={
          "Select the appropriate organization type from the options below. Next, enter the names of your association then club in the provided boxes to ensure accurate setup of your account. Please double-check your selections, as these options cannot be changed later. "
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
