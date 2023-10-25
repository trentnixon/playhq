//import { Stack, Space } from "@mantine/core";
//import { Wrapper } from "./Common/Containers";
//import { SelectFixturaSetting } from "./Common/formelements/Select_FixturaSettings";
import { P } from "./Common/Type";
import { SelectATheme } from "./Common/Customiser/Design/SelectATheme";

export const FixturaCustomiser = ({ user, setHasUpdated }) => {
  //console.log(user);
  return (
    <>
      <SelectATheme />
    </>
  );
};

/* const LabelMe = ({ label }) => {
  return (
    <Wrapper>
      <P color={4} Weight={900} marginBottom={0} textTransform={"uppercase"}>
        {label}
      </P>
    </Wrapper>
  );
}; */

/* <LabelMe label="Select a Template" />
      <ShadowWrapper size={"lg"}> 
        <SelectFixturaSetting
          CollectionFrom={"templates"}
          CollectionSaveTo={"accounts"}
          RelationProperty={"template"}
          COLLECTIONID={user.id}
          SelectedBaseValueObject={user.attributes?.template?.data?.attributes}
          SelectLabel={"Select a Template"}
          SelectPlaceholder={"Select a Template"}
          user={user}
          setHasUpdated={setHasUpdated}
        />
      </ShadowWrapper> */
/* <Space h="lg" />
      <LabelMe label="Select Background Music" />
      <ShadowWrapper size={"lg"}>
      
      <SelectFixturaSetting
        CollectionFrom={"audio-options"}
        CollectionSaveTo={"accounts"}
        RelationProperty={"audio_option"}
        COLLECTIONID={user.id}
        SelectedBaseValueObject={
          user.attributes?.audio_option?.data?.attributes
        }
        SelectLabel={"Select a Audio Option"}
        SelectPlaceholder={"Select a Audio Option"}
        user={user}
        setHasUpdated={setHasUpdated}
      />
      </ShadowWrapper> */
/* 
      <SelectFixturaSetting
        CollectionFrom={"themes"}
        CollectionSaveTo={"accounts"}
        RelationProperty={"theme"}
        COLLECTIONID={user.id}
        SelectedBaseValueObject={user.attributes?.theme?.data?.attributes}
        SelectLabel={"Select a theme"}
        SelectPlaceholder={"Select a theme"}
        user={user}
        setHasUpdated={setHasUpdated}
      /> */
