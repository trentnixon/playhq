import { P } from "../../Common/Type";
import { UserDetailsForSetup } from "../../UserDetails";
import { StepHeaderandDescription } from "./StepHeaderandDescription";

export const StepAboutUser = ({ user, setHasUpdated }) => {
  return (
    <>
      <StepHeaderandDescription 
        Header={"Let's Get Started with Your Weekly Content Delivery!"}
        Description={`We want to make sure your personalized content arrives flawlessly every week.`}
      />
      <UserDetailsForSetup user={user} setHasUpdated={setHasUpdated} />
    
      <P color={6} size={"xs"} textAlign="right">
        *These settings can be changed in your admin panel
      </P>
    </>
  );
};
export default StepAboutUser;
