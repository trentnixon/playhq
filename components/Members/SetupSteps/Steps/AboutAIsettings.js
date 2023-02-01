import { FixturaAIsettings } from "../../userFixturaAIsettings";
import { StepHeaderandDescription } from "./StepHeaderandDescription";
import { Button, Center } from "@mantine/core";
import { Wrapper } from "../../Common/Containers";
import { P } from "../../Common/Type";

export const StepAboutAISettings= ({ user, setHasUpdated }) => {
  return (
    <>
      <StepHeaderandDescription
        Header={"Select a day of the week"}
        Description={
          "Please select the day of the week that you would like to receive your personalized digital assets via email."
        }
      />
      <Wrapper>
        <P
          textAlign="left"
          color={7}
          Copy={`All of these settings can be changed via your admin panel.`}
        />
      </Wrapper>
      <FixturaAIsettings user={user} setHasUpdated={setHasUpdated} />
    
    </>
  );
};


export default StepAboutAISettings