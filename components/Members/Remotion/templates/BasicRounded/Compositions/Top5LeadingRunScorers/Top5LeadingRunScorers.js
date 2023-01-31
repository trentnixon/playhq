import { AbsoluteFill, useCurrentFrame } from "remotion";

import TitleSequence from './TitleSequence'

export const Top5LeadingRunsScorers = () => {


  return (
    <AbsoluteFill>
      <TitleSequenceContaner fps={30} durationInFrames={90} />
      <MainSequence fps={30} durationInFrames={1000} label="Main Sequence" />
      <EndTitlesSequence fps={30} durationInFrames={90} />
    </AbsoluteFill>
  );
};

const TitleSequenceContaner = ({

  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  if (frame > durationInFrames) {
    return null;
  }

  return (
    <div>
      <TitleSequence durationInFrames={30} />
    </div>
  );
};

const MainSequence = ({  durationInFrames, label }) => {
  const frame = useCurrentFrame();

  if (frame > durationInFrames) {
    return null;
  }

  return (
    <div>
      {/* Add your main sequence content here */}
      <div>{label}</div>
    </div>
  );
};

const EndTitlesSequence = ({  durationInFrames }) => {
  const frame = useCurrentFrame();

  if (frame > durationInFrames) {
    return null;
  }

  return (
    <div>
      {/* Add your end titles sequence content here */}
    </div>
  );
};

export default Top5LeadingRunsScorers