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
  createStyles,
  Avatar,
  Text,
  Stack,
  Center,
} from "@mantine/core";
import { useAccountDetails } from "../../../../../../context/userContext";
import {
  useDeleteAccount,
  useSetAccountTrue,
} from "../../../../../../Hooks/useAccount";
import { setAccountFromLocalCookie } from "../../../../../../lib/auth";
import {
  IconCheck,
  IconHome2,
  IconMailbox,
  IconSettings2,
  IconShield,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";
import { IconPhoneCall, IconAt } from "@tabler/icons-react";
import { BTN_ONCLICK } from "../../../../../Members/Common/utils/Buttons";
import { P, PageTitle } from "../../../../../Members/Common/Type";
import { FixturaLoading } from "../../../../../Members/Common/Loading";
import { FindAccountLogo } from "../../../../../../lib/actions";
import { useMediaQuery } from "@mantine/hooks";
import { PaperWithBorder } from "../../../../../Members/Common/Containers";
import { RoundedSectionContainer } from "../../../../../UI/Containers/SectionContainer";

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
        {OBJ.map((item, i) => {
          if (item.value)
            return (
              <Group key={i} position="apart" mb={20} grow>
                <Group>
                  {item.icon}
                  <P
                    Copy={item.key}
                    size={"md"}
                    Weight={600}
                    color={6}
                    marginBottom={0}
                  />
                </Group>
                <P
                  Copy={item.value}
                  size={"md"}
                  textAlign="left"
                  marginBottom={0}
                />
                <IconCheck size="2em" color={theme.colors.green[5]} />
              </Group>
            );
        })}
      </Paper>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export const ReviewSetupData = ({ DATA }) => {
  const { account, ReRender } = useAccountDetails();
  const [AccountTrue, CreateSetAccountTrue] = useSetAccountTrue();
  const [deleting, deleteAccount] = useDeleteAccount();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [ConfirmReset, setConfirmReset] = useState(false);
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const CompleteRegistration = async () => {
    setLoading(true);
    //console.log("CompleteRegistration");
    try {
      await CreateSetAccountTrue(DATA.id);
    } catch (error) {
      console.error("An error occurred while registering:", error);
    } finally {
      //setLoading(false);
    }
  };

  const handleProceed = () => {
    deleteAccount(account.id); // Pass the account ID to delete
  };

  useEffect(() => {
    if (AccountTrue) {
      setAccountFromLocalCookie(DATA.id);
      router.push("/members/");
    }
  }, [AccountTrue, ReRender, router, setAccountFromLocalCookie]);

  useEffect(() => {
    if (deleting) {
      window.location.reload(); // Refresh the page or navigate to a different route as needed
    }
  }, [deleting]);

  if (deleting) {
    return (
      <Container size="lg" pt={200} pb={70}>
        <FixturaLoading />
      </Container>
    );
  }
  if (loading) {
    return (
      <Container size="lg" pt={200} pb={70}>
        <FixturaLoading />
      </Container>
    );
  }

  return (
    <Container size="lg" px={0} pt={50} pb={70}>
      <PageTitle Copy="Almost Done" ICON={<IconSettings2 size={40} />} />

      <RoundedSectionContainer
        headerContent={
          <P Weight={600}>Let's Make Sure Everything's Perfect!</P>
        }
        topContent={
          mobile ? (
            false
          ) : (
            <P>
              We're excited to learn about your upcoming season, but first, we
              need to make sure everything is spot on. Take a moment to review
              the details below. It's vital we get this right, as it will help
              us tailor your Fixtura experience to your unique needs.
            </P>
          )
        }
        bottomContent={
          <>
            {ConfirmReset ? (
              <ConfirmResetCopy onProceed={handleProceed} />
            ) : (
              <ReviewAccontDetails DATA={DATA} />
            )}

            <Space h={20} />
            <Box
              sx={(theme) => ({
                padding: theme.spacing.md,
                border: `1px solid ${theme.colors.members[1]}`,
                backgroundColor: theme.colors.members[1],
                borderRadius: "5px",
                textAlign: "right",
              })}
            >
              <P textAlign="center">
                It's time to link up with PlayHQ and embark on an exciting
                journey with Fixtura.
              </P>
              {mobile ? (
                false
              ) : (
                <P textAlign="center">
                  Your custom-made content and insights are just a click away.
                </P>
              )}
              {mobile ? (
                false
              ) : (
                <P textAlign="center">
                  {" "}
                  Ready to transform your season? Let's sync and get started!
                </P>
              )}

              <Group position="center">
                <BTN_ONCLICK
                  LABEL={ConfirmReset ? "Back" : "Reset"}
                  THEME={ConfirmReset ? "success" : "error"}
                  HANDLE={() => {
                    setConfirmReset(!ConfirmReset);
                  }}
                />
                {ConfirmReset ? (
                  false
                ) : (
                  <BTN_ONCLICK LABEL="Finish" HANDLE={CompleteRegistration} />
                )}
              </Group>
            </Box>
          </>
        }
      />
    </Container>
  );
};

const ConfirmResetCopy = ({ onProceed }) => {
  return (
    <PaperWithBorder>
      <P Weight={600}>Reset Setup</P>
      <P>
        Please note that items such as name, email, logo, and colors can be
        amended after setup. Only the organization type, club, and association
        cannot be amended.
      </P>
      <P>Do you wish to proceed? Any data entered will be lost.</P>
      <Group position="center">
        <BTN_ONCLICK LABEL="Proceed" HANDLE={onProceed} THEME={"error"} />
      </Group>
    </PaperWithBorder>
  );
};

const ReviewAccontDetails = ({ DATA }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return (
    <PaperWithBorder>
      {mobile ? (
        <Center>
          <Avatar src={FindAccountLogo(DATA)} size={120} radius="md" />
        </Center>
      ) : (
        false
      )}
      <Group noWrap position="apart">
        <div>
          <Group noWrap spacing={10} my={5}>
            <IconUser
              size="1.5rem"
              color={"#6699CC"}
              className={classes.icon}
            />
            <P size={"md"} marginBottom={0}>
              {DATA.attributes.FirstName}
            </P>
          </Group>
          <Group noWrap spacing={10} my={5}>
            <IconMailbox
              size="1.5rem"
              color={"#6699CC"}
              className={classes.icon}
            />
            <P size={"md"} marginBottom={0}>
              Email Address: {DATA.attributes.DeliveryAddress}
            </P>
          </Group>
          <Group noWrap spacing={10} my={5}>
            <IconShield
              size="1.5rem"
              color={"#6699CC"}
              className={classes.icon}
            />
            <P size={"md"} marginBottom={0}>
              {DATA.attributes.account_type.data.attributes.Name}
            </P>
          </Group>

          <Group noWrap spacing={10} my={5}>
            <IconUsersGroup
              size="1.5rem"
              color={"#6699CC"}
              className={classes.icon}
            />
            <P size={"md"} marginBottom={0}>
              {DATA.attributes.associations.data[0].attributes.Name}
            </P>
          </Group>
          {DATA.attributes.account_type.data.attributes.Name ===
          "Association" ? (
            false
          ) : (
            <Group noWrap spacing={10} my={5}>
              <IconHome2
                size="1.5rem"
                color={"#6699CC"}
                className={classes.icon}
              />
              <P size={"md"} marginBottom={0}>
                {DATA.attributes?.clubs?.data[0]?.attributes?.Name}
              </P>
            </Group>
          )}
        </div>
        {mobile ? (
          false
        ) : (
          <Avatar src={FindAccountLogo(DATA)} size={120} radius="md" />
        )}
      </Group>
    </PaperWithBorder>
  );
};
