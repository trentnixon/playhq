import { SetupInputs } from "../../Account/userFixturaSettings";
import { P } from "../../Common/Type";
import { StepHeaderandDescription } from "./StepHeaderandDescription";

export const StepAboutTheCricket = ({ user, setHasUpdated  }) => {
  return (
    <>
      <StepHeaderandDescription
        Header={"Tell Us About Your Organization – We Want to Get It Right!"}
        Description={
          "Tell us about your organization so we can ensure accuracy and tailor your experience accordingly."
        }
      /> 

      <SetupInputs user={user} setHasUpdated={setHasUpdated}/> 
      <P color={8} size={"xs"} textAlign="right">
        These settings CANNOT be changed in your admin panel.
      </P>
      
    </>
  );
};
export default StepAboutTheCricket;
