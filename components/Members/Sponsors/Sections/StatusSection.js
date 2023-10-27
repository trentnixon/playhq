import { Group, Paper } from "@mantine/core";
import { useMantineTheme } from "@mantine/styles";
import { P } from "../../Common/Type";
import { IconCheck } from "@tabler/icons";
import { IconInfoHexagon } from "@tabler/icons-react";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";

export const StatusSection = ({ account, Sponsors, SPONSORLIMIT }) => {
  const includesSponsors =
    account?.attributes.subscription_tier.data?.attributes.includeSponsors;
  const theme = useMantineTheme();
  const matches = useMediaQuery("(min-width: 48em)");
  return (
    <>
      <Group position="apart" my={10}>
      <Paper
          shadow="lg"
          p="md"
          withBorder
          radius="md"
          w={matches ? "auto" : "100%"}
          sx={(theme) => ({
            backgroundColor: theme.colors[theme.primaryColor][2],
          })}
        >
          <P
            color={'white'}
            marginBottom={0}
            Copy={`${SPONSORLIMIT - Sponsors.length} spaces remaining`}
          />
        </Paper>
        <Paper
          shadow="lg"
          p="md"
          withBorder
          radius="md"
          sx={(theme) => ({
            backgroundColor: includesSponsors
              ? theme.colors.green[7]
              : theme.colors.red[7],
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between", // This will space the icon and label
            padding: "10px 20px", // Adjust padding to suit your style
          })}
        >
          <Group position="apart" noWrap>
            <P color={'white'} marginBottom={0}>
              {includesSponsors
                ? "Sponsors included in subscription"
                : "Sponsors not included in your subscription"}
            </P>
            {includesSponsors ? (
              <IconCheck size={20} />
            ) : (
              <IconInfoHexagon size={20} color={theme.colors.yellow[5]} />
            )}
          </Group>
        </Paper>
        
      </Group>
      {!includesSponsors && (
        <Paper
          shadow="lg"
          p="xs"
          mt={10}
          mb={20}
          radius="sm"
          sx={(theme) => ({
            backgroundColor: theme.colors.white,
          })}
        >
          <P size={"sm"} marginBottom={0}>
            Sponsors are currently not available under your current subscription
            package. However, feel free to add your sponsors, and when you are
            ready to include them in your online assets, visit your{" "}
            <Link href={`/members/account/`}>
              <a>account page</a>
            </Link>{" "}
            to upgrade your subscription.
          </P>
        </Paper>
      )}
    </>
  );
};
