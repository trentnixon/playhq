import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Group,
  Space,
  Paper,
  SimpleGrid,
  Container,
  Box,
  useMantineTheme,
} from "@mantine/core";
import { useAccountDetails } from "../../../lib/userContext";
import { useSetAccountTrue } from "../../../Hooks/useAccount";
import { setAccountFromLocalCookie } from "../../../lib/auth";
import { IconCheck, IconHome2, IconMailbox, IconSettings2, IconShield, IconUser, IconUsersGroup } from "@tabler/icons-react";
import { BTN_ONCLICK } from "../../../components/Members/Common/utils/Buttons";
import { P, PageTitle } from "../Common/Type";
import { FixturaLoading } from "../../../components/Members/Common/Loading";

const ReviewContainer = ({ OBJ, Title }) => {
  const theme = useMantineTheme();
  return (
    <>
      <P
        marginBottom={0}
        Copy={Title}
        size={"md"}
        Weight={900}
        textTransform={`uppercase`}
      />
      <Paper shadow="sm" p="md" withBorder>
        {OBJ.map((item, i) => (
          <Group key={i} position="apart" mb={20} grow>
            <Group>
              {item.icon}
              <P Copy={item.key} size={"md"} Weight={600} color={3} marginBottom={0} />
            </Group>
            <P Copy={item.value} size={"md"} textAlign="left" marginBottom={0} />
            <IconCheck size="2em" color={theme.colors.green[5]} />
          </Group>
        ))}
      </Paper>
    </>
  );
};

export const ReviewSetupData = ({ DATA }) => {
  const theme = useMantineTheme();
  const { account, ReRender } = useAccountDetails();
  const [AccountTrue, CreateSetAccountTrue] = useSetAccountTrue();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const CompleteRegistration = async () => {
    setLoading(true);
    console.log('CompleteRegistration')
    try {
      await CreateSetAccountTrue(DATA.id);
    } catch (error) {
      console.error("An error occurred while registering:", error);
    } finally {
      //setLoading(false);
    }
  };

  useEffect(() => {
    if (AccountTrue) {
      setAccountFromLocalCookie(DATA.id);
      router.push("/members/account/");
    }
  }, [AccountTrue, ReRender, router, setAccountFromLocalCookie]);

  if (loading) {
    return (
      <Container size="lg" pt={200} pb={70}>
        <FixturaLoading />
      </Container>
    );
  }

  return (
    <Container size="lg" pt={50} pb={70}>
      <PageTitle Copy="Review Setup" ICON={<IconSettings2 size={40} />} />
      <SimpleGrid
        cols={1}
        breakpoints={[
          { minWidth: "sm", cols: 1 },
          { minWidth: "md", cols: 1 },
          { minWidth: 1200, cols: 1 },
        ]}
      >
        <ReviewContainer
          Title="Recipient"
          OBJ={[
            { key: "Name", value: DATA.attributes.FirstName, icon: <IconUser size="2em" color={theme.colors.blue[5]} /> },
            { key: "Email", value: DATA.attributes.DeliveryAddress, icon: <IconMailbox size="2em" color={theme.colors.blue[5]} /> },
          ]}
        />
        <ReviewContainer
          Title="Organisation"
          OBJ={[
            {
              key: "Account Type",
              value: DATA.attributes.account_type.data.attributes.Name,
              icon: <IconShield size="2em" color={theme.colors.blue[5]} />,
            },
            {
              key: "Association",
              value: DATA.attributes.associations.data[0].attributes.Name,
              icon: <IconUsersGroup size="2em" color={theme.colors.blue[5]} />,
            },
            {
              key: "Club",
              value: DATA.attributes.clubs.data[0].attributes.Name,
              icon: <IconHome2 size="2em" color={theme.colors.blue[5]} />,
            },
          ]}
        />
      </SimpleGrid>
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
