import { SwitchAssets } from "../../../components/Members/Common/Switch_Assets";
import { StepHeaderandDescription } from "./StepHeaderandDescription";
export const StepAboutAssets= ({ user, setHasUpdated }) => {
  return (
    <>
    
     <StepHeaderandDescription
        Header={"Select your Assets"}
        Description={
          "Please select the assets you wish to receive, and remember that you can add or remove assets at any time"
        }
      />
      <SwitchAssets
            USERASSETS={user.attributes.assets?.data}
            COLLECTIONID={user.id}
            setHasUpdated={setHasUpdated}
          />
    </>
  );
};
