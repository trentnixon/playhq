import { Player } from "@remotion/player";

export const MembersPreviewPlayer = ({ Data }) => {
  return (
    <Player
      component={Data.component}
      durationInFrames={[
        Data.data.TIMINGS.FPS_INTRO,
        Data.data.TIMINGS.FPS_MAIN,
        Data.data.TIMINGS.FPS_OUTRO,
      ].reduce((a, b) => a + b, 0)}
      compositionHeight={1350}
      compositionWidth={1080}
      fps={30}
      controls
      inputProps={{ DATA: Data.data }}
      style={{ width: "100%" }}
    />
  );
};
