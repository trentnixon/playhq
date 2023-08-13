import { P } from "../../Common/Type";
import { UserDetailsForSetup } from "../../UserDetails";
import { StepHeaderandDescription } from "./StepHeaderandDescription";

export const StepAboutUser = ({ user, setHasUpdated }) => {
  return (
    <>
      <StepHeaderandDescription
        Header={"Let's Get Started with Your Weekly Content Delivery!"}
        Description={`We want to make sure your personalized content arrives flawlessly every week. Simply provide us with the details below`}
      />
      <UserDetailsForSetup user={user} setHasUpdated={setHasUpdated} />
    
      <P color={6} size={"xs"} textAlign="right">
        *These settings can be changes in your admin panel
      </P>
    </>
  );
};
export default StepAboutUser;
