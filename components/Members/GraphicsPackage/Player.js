import { Player } from "@remotion/player";
import { Center } from "@mantine/core";
import { P } from "../Common/Type";
import {
  updateDataBasedOnSelected,
  mergeData,
} from "../../../utils/RemotionUtils";
import { ASSETS, DEFAULTLOGO } from "../../../utils/RemotionAssets";

export const MembersPreviewPlayer = ({ OBJ, Selected, HeroImage }) => {
  const templateType = OBJ.template.Category;

  if (!ASSETS[templateType] || !ASSETS[templateType][Selected]) {
    return (
      <Center>
        <P marginBottom={0}>Invalid template or asset type selected.</P>
      </Center>
    );
  }

  const useData = ASSETS[templateType][Selected];
  let updatedData = mergeData(useData.DATA, OBJ);
  updatedData = updateDataBasedOnSelected(
    updatedData,
    Selected,
    OBJ.Account.logo,
    OBJ.Account.name,
    DEFAULTLOGO
  );

  return (
    <Player
      component={useData.component}
      durationInFrames={[
        updatedData.TIMINGS.FPS_INTRO,
        updatedData.TIMINGS.FPS_MAIN,
        updatedData.TIMINGS.FPS_OUTRO,
      ].reduce((a, b) => a + b, 0)}
      compositionHeight={1350}
      compositionWidth={1080}
      fps={30}
      controls
      inputProps={{ DATA: updatedData }}
      style={{ width: "100%" }}
    />
  );
};
