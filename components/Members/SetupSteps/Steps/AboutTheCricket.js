import { SetupInputs } from "../../Account/userFixturaSettings";
import { StepHeaderandDescription } from "./StepHeaderandDescription";

export const StepAboutTheCricket = ({ user, setHasUpdated }) => {
  return ( 
    <>
      <StepHeaderandDescription
        Header={"About your association and or club"}
        Description={
          "Please select your account type and provide the name of your club and association."
        }
      />

      <SetupInputs user={user} setHasUpdated={setHasUpdated} />
    </>
  );
};
export default StepAboutTheCricket