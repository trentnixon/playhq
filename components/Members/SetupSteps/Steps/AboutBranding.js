import { P } from "../../../../components/Members/Common/Type";
import { SelectATheme } from "../../Common/Customiser/Design/SelectATheme";

export const StepAboutBranding = ({ user, setHasUpdated }) => {
  return (
    <>
      
        <SelectATheme />
        <P
          textAlign="left"
          color={7}
          Copy={`All of these settings can be changed via your admin panel.`}
        />
    </>
  );
};
export default StepAboutBranding;
