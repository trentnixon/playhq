import React from "react";
import styled from "styled-components";
import { Sequence, Series } from "remotion";
import { Match } from "./Sections";
import { MatchContainer } from "./Sections/MatchContainer";

export const Results = (props) => {
  const { DATA, FPS_SCORECARD } = props;

  const groupsOfTwo = splitIntoGroupsOfTwo(DATA);
  //console.log(DATA)
  return (
    <ResultsContainer>
      {groupsOfTwo.map((item, index) => {
        return (
          <Sequence
            durationInFrames={FPS_SCORECARD}
            from={FPS_SCORECARD * index}
            key={index}
          >
            <MatchContainer>
              {item.map((game, i) => (
                <Match
                  key={`${index}_${i}`}
                  INT={i}
                  matchData={game}
                  {...props}
                />
              ))}
            </MatchContainer>
          </Sequence>
        );
      })}
    </ResultsContainer>
  );
};

function splitIntoGroupsOfTwo(arr) {
  return arr.reduce((acc, curr, i) => {
    if (i % 2 === 0) {
      acc.push([curr]);
    } else {
      acc[acc.length - 1].push(curr);
    }
    return acc;
  }, []);
}

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 90%;
  margin: 0 5%;
  height: 960px;
  position: relative;
  top: 260px;
`;
