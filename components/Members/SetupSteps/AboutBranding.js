import { Wrapper } from "../../../components/Members/Common/Containers";
import { P } from "../../../components/Members/Common/Type";
import { FixturaCustomiser } from "../../../components/Members/userFixturaCustomiser";
import { StepHeaderandDescription } from "./StepHeaderandDescription";

export const StepAboutBranding = ({ user, setHasUpdated }) => {
  return (
    <>
      <StepHeaderandDescription
        Header={"About your Brand"}
        Description={
          "Customize your look and feel by choosing colors, fonts, and logos that match your club or association's branding"
        }
      />
      <Wrapper>
        <P
          textAlign="left"
          color={7}
          Copy={`All of these settings can be changed via your admin panel.`}
        />
      </Wrapper>
      <FixturaCustomiser user={user} setHasUpdated={setHasUpdated} />
    </>
  );
};
export default StepAboutBranding;
