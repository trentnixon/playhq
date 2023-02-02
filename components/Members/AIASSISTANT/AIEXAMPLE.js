// Core
import React from "react";
import { useEffect, useState } from "react";

// UTILS
import { useGetAIExample } from "../../../Hooks/useAI";
import { P } from "../../../components/Members/Common/Type";
import { FixturaLoading } from "../../../components/Members/Common/Loading";
// PACK
import { Box, Paper } from "@mantine/core";

export const AIEXAMPLE = ({ AISETTINGS }) => {
  const [AIExample, CreateAIExample] = useGetAIExample();
  const [prompt, setPrompt] = useState(false);

  const CreateSentence = (AISETTINGS) => {
    const Sentence = `Write a ${AISETTINGS.ai_writting_tone}, 
      1 paragraph article about world cricket in 2022, that is ${AISETTINGS.ai_writting_style} for 
      ${AISETTINGS.ai_publication}`;
    //setPrompt(Sentence)
    return Sentence;
  };

  useEffect(() => {
    if (AIExample === null) {
      CreateAIExample(CreateSentence(AISETTINGS));
    }
  }, []);

  useEffect(() => {
    CreateAIExample(CreateSentence(AISETTINGS));
  }, [
    AISETTINGS.ai_writting_tone,
    AISETTINGS.ai_publication,
    AISETTINGS.ai_writting_style,
  ]);

  return (
    <>
      <Box>
        <Paper
          radius="sm"
          shadow="md"
          withBorder
          p="xs"
          mb={20}
          sx={(theme) => ({
            backgroundColor: theme.colors.members[1],
          })}
        >
          <P fontStyle="italic" Copy={`Example`} />
          <P
            Weight={600}
            size={"sm"}
            textTransform={"uppercase"}
            lineHeight={"1em"}
            Copy={CreateSentence(AISETTINGS)}
          />
        </Paper>
        <P fontStyle="italic" Copy={`Response`} />
        <Paper
          radius="sm"
          shadow="md"
          withBorder
          p="xs"
          sx={(theme) => ({
            backgroundColor: theme.colors.members[2],
          })}
        >
          {typeof AIExample !== "string" ? (
            <FixturaLoading />
          ) : (
            <P color={0} lineHeight={"1.4em"} Copy={AIExample} />
          )}
        </Paper>
      </Box>
    </>
  );
};
