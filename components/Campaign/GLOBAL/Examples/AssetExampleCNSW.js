import { Sequence } from "remotion";
import { ExampleSHELL } from "../../../../remotion/templates/CNSW/MarketingExamples/SHELL";
import { Example_Video_Upcoming } from "../../../../remotion/templates/CNSW/MarketingExamples/Example_Video_Upcoming";
import { Example_Video_WEEKENDRESULTS } from "../../../../remotion/templates/CNSW/MarketingExamples/Example_Video_WeekendResults";
import { Example_Video_Top5Runs } from "../../../../remotion/templates/CNSW/MarketingExamples/Example_Video_Top5Runs";
import { Example_Video_Ladder } from "../../../../remotion/templates/CNSW/MarketingExamples/Example_Video_Ladder";
import { Example_Video_WeekendSingleGameResult } from "../../../../remotion/templates/Basic/MarketingExamples/Example_Video_WeekendSingleGameResult";
import { Example_Video_Top5Bowlers } from "../../../../remotion/templates/CNSW/MarketingExamples/Example_Video_Top5Bowlers";
export const UpComingFixtures = ({ DATA }) => {
  return (
    <> 
      <Sequence
        durationInFrames={[
          DATA.TIMINGS.FPS_INTRO,
          DATA.TIMINGS.FPS_MAIN,
          DATA.TIMINGS.FPS_OUTRO,
        ].reduce((a, b) => a + b, 0)}
        from={0}
      >
        <ExampleSHELL DATA={DATA}> 
          <Example_Video_Upcoming DATA={DATA} />
        </ExampleSHELL> 
      </Sequence> 
    </>
  ); 
};

export const WeekendResults = ({ DATA }) => {
  return (
    <>
      <Sequence
        durationInFrames={[
          DATA.TIMINGS.FPS_INTRO,
          DATA.TIMINGS.FPS_MAIN,
          DATA.TIMINGS.FPS_OUTRO,
        ].reduce((a, b) => a + b, 0)}
        from={0}
      >
        <ExampleSHELL DATA={DATA}>
          <Example_Video_WEEKENDRESULTS DATA={DATA} />
        </ExampleSHELL>
      </Sequence>
    </>
  );
};

export const Top5BattingList = ({ DATA }) => {
    return (
      <>
        <Sequence
          durationInFrames={[
            DATA.TIMINGS.FPS_INTRO,
            DATA.TIMINGS.FPS_MAIN,
            DATA.TIMINGS.FPS_OUTRO,
          ].reduce((a, b) => a + b, 0)}
          from={0}
        >
          <ExampleSHELL DATA={DATA}>
            <Example_Video_Top5Runs DATA={DATA} TYPE={"BATTING"} />
          </ExampleSHELL> 
        </Sequence>
      </>
    );
  };

  export const Top5BowlingList = ({ DATA }) => {
    return (
      <>
        <Sequence
          durationInFrames={[
            DATA.TIMINGS.FPS_INTRO,
            DATA.TIMINGS.FPS_MAIN,
            DATA.TIMINGS.FPS_OUTRO,
          ].reduce((a, b) => a + b, 0)}
          from={0}
        >
          <ExampleSHELL DATA={DATA}>
            <Example_Video_Top5Bowlers DATA={DATA}  TYPE={"BOWLING"}/>
          </ExampleSHELL>
        </Sequence>
      </>
    );
  };
  

  export const Ladder = ({ DATA }) => {
    return (
      <>
        <Sequence
          durationInFrames={[
            DATA.TIMINGS.FPS_INTRO,
            DATA.TIMINGS.FPS_MAIN,
            DATA.TIMINGS.FPS_OUTRO,
          ].reduce((a, b) => a + b, 0)}
          from={0}
        >
          <ExampleSHELL DATA={DATA}>
            <Example_Video_Ladder DATA={DATA} />
          </ExampleSHELL>
        </Sequence>
      </>
    );
  };
  

  export const WeekendSingleGameResult = ({ DATA }) => {
    return (
      <>
        <Sequence
          durationInFrames={[
            DATA.TIMINGS.FPS_INTRO,
            DATA.TIMINGS.FPS_MAIN,
            DATA.TIMINGS.FPS_OUTRO,
          ].reduce((a, b) => a + b, 0)}
          from={0}
        >
          <ExampleSHELL DATA={DATA}>
            <Example_Video_WeekendSingleGameResult DATA={DATA} />
          </ExampleSHELL>
        </Sequence>
      </>
    );
  };

  export const RosterPoster = ({ DATA }) => {
    return (
      <>
        <Sequence
          durationInFrames={[
            DATA.TIMINGS.FPS_INTRO,
            DATA.TIMINGS.FPS_MAIN,
            DATA.TIMINGS.FPS_OUTRO,
          ].reduce((a, b) => a + b, 0)}
          from={0}
        >
          <ExampleSHELL DATA={DATA}>
            <Example_Video_WeekendSingleGameResult DATA={DATA} />
          </ExampleSHELL>
        </Sequence>
      </>
    );
  };
  

  