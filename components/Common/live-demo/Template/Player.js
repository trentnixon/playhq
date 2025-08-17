import { Player } from '@remotion/player';

export const MembersPreviewPlayer = ({ Data }) => {
  const resetStyles = {
    all: 'unset', // Reset all inherited styles
    width: '100%',
    height: '100%',
    display: 'block',
    fontSize: 'initial',
    lineHeight: 'normal',
    fontFamily: 'initial',
  };
  return (
    <div style={resetStyles}>
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
        style={{ width: '100%' }}
      />
    </div>
  );
};
