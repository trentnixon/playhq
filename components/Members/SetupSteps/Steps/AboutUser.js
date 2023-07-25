import { P } from "../../Common/Type";
import { UserDetailsForSetup } from "../../UserDetails";
import { StepHeaderandDescription } from "./StepHeaderandDescription";

export const StepAboutUser = ({ user, setHasUpdated }) => {
  return (
    <>
      <StepHeaderandDescription
        Header={"Asset Delivery"}
        Description={
          "To ensure our dynamic assets reach the right hands, please provide us with the delivery email and the name you want the assets addressed to. Your weekly email will contain a personalized link to access all the latest content."
        }
      />
      <UserDetailsForSetup user={user} setHasUpdated={setHasUpdated} />
      <P Copy={` *These settings can be changes in your admin panel`} />
    </>
  );
};
export default StepAboutUser  