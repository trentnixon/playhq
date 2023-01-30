import { UserDetails } from "../../../components/Members/UserDetails";
import { StepHeaderandDescription } from "./StepHeaderandDescription";

export const StepAboutUser = ({ user, setHasUpdated }) => {
  return (
    <>
      <StepHeaderandDescription
        Header={"About you"}
        Description={
          "Please provide your name and the email address to which you would like the assets to be delivered."
        }
      />
      <UserDetails user={user} setHasUpdated={setHasUpdated} />
    </>
  );
};
