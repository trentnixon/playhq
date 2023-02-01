import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
// UTILS
import { fetcher } from "../../../lib/api";

// PACK
import Cookies from "js-cookie";
import { Group, Space, Paper, SimpleGrid, Container, Box } from "@mantine/core";

// Components

// Steps
import { FixturaLoading } from "../../../components/Members/Common/Loading";
import { BTN_ONCLICK } from "../../../components/Members/Common/utils/Buttons";
import { P, SubHeaders } from "../Common/Type";
import { useAccountDetails } from "../../../lib/userContext";
import { useSetAccountTrue } from "../../../Hooks/useAccount";
import { setAccountFromLocalCookie } from "../../../lib/auth";

export const ReviewSetupData = ({ DATA }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { account, ReRender } = useAccountDetails();
  const [AccountTrue, CreateSetAccountTrue] = useSetAccountTrue();
  const router = useRouter(); 


  console.log(DATA)
// the accounts are not being set to true

  const CompleteRegistration = async () => {
    console.log("CompleteRegistration", DATA.id);

    try {
      setLoading(true);
      
      CreateSetAccountTrue(DATA.id);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(AccountTrue)
    if (AccountTrue) {
      console.log("RunLogin Check");
      setLoading(false);
      ReRender();
      setAccountFromLocalCookie(DATA.id)
      router.push("/members/account/");
    }
  }, [AccountTrue]);

  if (loading) {
    return (
      <Container size={`lg`} pt={200} pb={70}>
        <FixturaLoading />
      </Container>
    );
  }
  return (
    <Container size={`lg`} pt={100} pb={70}>
      <SubHeaders Copy={"Setup Review"} />
      <Container size={"lg"}>
        <SimpleGrid
          cols={1}
          breakpoints={[
            { minWidth: "sm", cols: 2 },
            { minWidth: "md", cols: 2 },
            { minWidth: 1200, cols: 2 },
          ]}
        >
          <ReviewContainer
            Title="User"
            OBJ={[
              { key: "Name", value: DATA.attributes.FirstName },
              { key: "Email", value: DATA.attributes.DeliveryAddress },
            ]}
          />

          <ReviewContainer
            Title="Cricket"
            OBJ={[
              {
                key: "Account Type",
                value: DATA.attributes.account_type.data.attributes.Name,
              },
              {
                key: "Association",
                value: DATA.attributes.associations.data[0].attributes.Name,
              },
              {
                key: "Club",
                value: DATA.attributes.clubs.data[0].attributes.Name,
              },
            ]}
          />

          <ReviewContainer
            Title="Design"
            OBJ={[
              {
                key: "Template",
                value: DATA.attributes.template.data.attributes.Name,
              },
              {
                key: "Theme",
                value: DATA.attributes.theme.data.attributes.Name,
              },
              {
                key: "Audio",
                value: DATA.attributes.audio_option.data.attributes.Name,
              },
            ]}
          />

          <ReviewContainer
            Title="AI"
            OBJ={[
              {
                key: "Publication",
                value: DATA.attributes.ai_publication.data.attributes.Name,
              },
              {
                key: "Style",
                value: DATA.attributes.ai_writting_style.data.attributes.Name,
              },
              {
                key: "Tone",
                value: DATA.attributes.ai_writting_tone.data.attributes.Name,
              },
            ]}
          />
        </SimpleGrid>
      </Container>
      <Space h={30} />
      <Box
        sx={(theme) => ({
          padding: theme.spacing.md,
          border: `1px solid ${theme.colors.members[1]}`,
          backgroundColor: theme.colors.members[1],
          borderRadius: "5px",
          textAlign: "right",
        })}
      >
        <BTN_ONCLICK LABEL="Complete Setup" HANDLE={CompleteRegistration} />
      </Box>
    </Container>
  );
};

const ReviewContainer = ({ OBJ, Title }) => {
  return (
    <Paper shadow="sm" p="md" withBorder>
      <P Copy={Title} size={"xl"} Weight={900} textTransform={`uppercase`} />
      {OBJ.map((item, i) => {
        return (
          <Group position="apart" key={i}>
            <P Copy={item.key} size={"md"} Weight={600} color={3} />
            <P Copy={item.value} size={"md"} />
          </Group>
        );
      })}
    </Paper>
  );
};
