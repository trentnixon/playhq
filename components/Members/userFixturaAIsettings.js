//Core

//utils
import { P } from "./Common/Type";
import { ShadowWrapper, Wrapper } from "./Common/Containers";
//PACK
import { Space } from "@mantine/core";

//Components

import { SelectFixturaSetting } from "./Common/formelements/Select_FixturaSettings";
import {StepHeaderandDescription} from "./SetupSteps/Steps/StepHeaderandDescription";

export const FixturaAIsettings = ({
  user,
  setHasUpdated,
  showDayOfWeek = true,
}) => {
  return (
    <>
      {showDayOfWeek ? (
        <>
          <LabelMe label="Select a Day of the Week" />
          <ShadowWrapper>
            <SelectFixturaSetting
              CollectionFrom={"days-of-the-weeks"}
              CollectionSaveTo={"schedulers"}
              RelationProperty={"days_of_the_week"}
              SelectedBaseValueObject={{ ID: null, Name: null }}
              SelectLabel={`Delivered on : ${user.attributes?.scheduler?.data?.attributes?.days_of_the_week?.data?.attributes?.Name}`}
              SelectPlaceholder={"Select a day of the week"}
              user={user}
              setHasUpdated={setHasUpdated}
              COLLECTIONID={user.attributes.scheduler.data.id}
              WithIcon={false}
            />
          </ShadowWrapper>
          <Space h="lg" />
        </>
      ) : (
        false
      )}

      <StepHeaderandDescription
        Header={"Fine tune your AI Assistant"}
        Description={
          "Please select the day of the week that you would like to receive your personalized digital assets via email."
        }
      />
      <LabelMe label="Select a publication style." />
      <ShadowWrapper size={"lg"}>
        <SelectFixturaSetting
          CollectionFrom={"ai-publications"}
          CollectionSaveTo={"accounts"}
          RelationProperty={"ai_publication"}
          COLLECTIONID={user.id}
          SelectedBaseValueObject={
            user.attributes?.ai_publication?.data?.attributes
          }
          SelectLabel={"Select a AI Publication"}
          SelectPlaceholder={"Select a Publication"}
          user={user}
          setHasUpdated={setHasUpdated}
        />
      </ShadowWrapper>
      <Space h="lg" />
      <LabelMe label="Select a Writting style." />
      <ShadowWrapper size={"lg"}>
        <SelectFixturaSetting
          CollectionFrom={"ai-writting-styles"}
          CollectionSaveTo={"accounts"}
          RelationProperty={"ai_writting_style"}
          COLLECTIONID={user.id}
          SelectedBaseValueObject={
            user.attributes?.ai_writting_style?.data?.attributes
          }
          SelectLabel={"Select a writting style"}
          SelectPlaceholder={"Select a writting style"}
          user={user}
          setHasUpdated={setHasUpdated}
        />
      </ShadowWrapper>
      <Space h="lg" />
      <LabelMe label="Select a AI writing tone." />
      <ShadowWrapper size={"lg"}>
        <SelectFixturaSetting
          CollectionFrom={"ai-writting-tones"}
          CollectionSaveTo={"accounts"}
          RelationProperty={"ai_writting_tone"}
          COLLECTIONID={user.id}
          SelectedBaseValueObject={
            user.attributes?.ai_writting_tone?.data?.attributes
          }
          SelectLabel={"Select a writing  Tone"}
          SelectPlaceholder={"Select a writing  Tone"}
          user={user}
          setHasUpdated={setHasUpdated}
        />
      </ShadowWrapper>
    </>
  );
};

const LabelMe = ({ label }) => {
  return (
    <Wrapper>
      <P
        color={4}
        Weight={900}
        marginBottom={0}
        textTransform={"uppercase"}
        Copy={label}
      />
    </Wrapper>
  );
};
