import { P } from "../../Common/Type";
import { UserDetailsForSetup } from "../../UserDetails";
import { StepHeaderandDescription } from "./StepHeaderandDescription";

export const StepAboutUser = ({ user, setHasUpdated }) => {
  return (
    <>
      <StepHeaderandDescription
        Header={"Content Delivery"}
        Description={`To ensure your content reach the right hands, please provide us 
        with the delivery email and the name you want the assets addressed to. 
        Your weekly email will contain a personalized link to access all the latest content.`}
      />
      <UserDetailsForSetup user={user} setHasUpdated={setHasUpdated} />
      <P>*These settings can be changes in your admin panel</P>
    </>
  );
}; 
export default StepAboutUser;
