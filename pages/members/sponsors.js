import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  MembersWrapper,
  PageCopyWrapper,
} from "../../components/Members/Common/Containers";
import { PageTitle, P } from "../../components/Members/Common/Type";
import { Box, Group, Paper, useMantineTheme } from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import { useAccountDetails } from "../../lib/userContext";
import { useUser } from "../../lib/authContext";

// Existing Component Imports
import { CreateaSponsorForm } from "../../components/Members/Sponsors/TheForm";
import { DragnDropSponsorList } from "../../components/Members/Sponsors/ListofDragnDrop";
import { SPONSOR_CTABTN } from "../../components/Members/Sponsors/SPONSOR_CTABTN";
import { CreateFirstSponsor } from "../../components/Members/Sponsors/CreateFirstSponsor";
import { IconInfoHexagon } from "@tabler/icons-react";
import Link from "next/link";

const SPONSORS = () => {
  const SPONSORLIMIT = 5;
  const { account } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const [isCreate, setIsCreate] = useState(false);
  const [Sponsors, setSponsors] = useState(
    userAccount?.attributes?.sponsors?.data
  );
  const { user, loading } = useUser();
  const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    if (!user) router.push(`/members/verification/?prev=${currentRoute}`);
  }, []);

  useEffect(() => {
    setUserAccount(account);
    setSponsors(account?.attributes?.sponsors?.data);
  }, [account]);

  if (!user || !userAccount || !Sponsors) return false;

  return (
    <MembersWrapper>
      <PageTitleSection />
      <DescriptionSection />
      <StatusSection
        account={account}
        Sponsors={Sponsors}
        SPONSORLIMIT={SPONSORLIMIT}
      />
      <HeaderSection
        Sponsors={Sponsors}
        SPONSORLIMIT={SPONSORLIMIT}
        setIsCreate={setIsCreate}
        isCreate={isCreate}
      />
      <ContentSection
        Sponsors={Sponsors}
        SPONSORLIMIT={SPONSORLIMIT}
        isCreate={isCreate}
        setIsCreate={setIsCreate}
        userAccount={userAccount}
      />
      <SponsorLimitMessage
        Sponsors={Sponsors}
        SPONSORLIMIT={SPONSORLIMIT}
        isCreate={isCreate}
      />
    </MembersWrapper>
  );
};

const PageTitleSection = () => (
  <PageTitle Copy={"SPONSORS"} ICON={<IconCheck size={40} />} />
);

const DescriptionSection = () => (
  <Group position="apart">
    <PageCopyWrapper>
      <P>
        Sponsors are a great way to add a personal touch to your assets and show
        your appreciation for your club's supporters. To create a sponsor,
        simply click the create button, upload an image of the sponsor's logo,
        add their name and website.
      </P>
      <P>
        You can add multiple sponsors and easily update or remove them as
        needed. With Fixtura, it's easy to give your sponsors the recognition
        they deserve while keeping your assets looking professional and
        cohesive.
      </P>
    </PageCopyWrapper>
  </Group>
);

const StatusSection = ({ account, Sponsors, SPONSORLIMIT }) => {
  const includesSponsors =
    account.attributes.subscription_tier.data.attributes.includeSponsors;
  const theme = useMantineTheme();

  return (
    <>
      <Group position="apart" my={10}>
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
          <Group position="apart">
            <P color={0} marginBottom={0}>
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
        <Paper
          shadow="lg"
          p="md"
          withBorder
          radius="md"
          sx={(theme) => ({
            backgroundColor: theme.colors[theme.primaryColor][2],
          })}
        >
          <P
            color={0}
            marginBottom={0}
            Copy={`${SPONSORLIMIT - Sponsors.length} spaces remaining`}
          />
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

const HeaderSection = ({ Sponsors, SPONSORLIMIT, setIsCreate, isCreate }) => (
  <Box
    sx={(theme) => ({
      backgroundColor: theme.colors.members[1],
      padding: "10px 20px",
      borderRadius: "10px 10px 0 0 ",
      borderBottom: `1px solid ${theme.colors.members[3]}`,
    })}
  >
    <Group position="right">
      {Sponsors.length < SPONSORLIMIT ? (
        <Group position="right">
          <P
            color={3}
            Weight={400}
            textTransform={`uppercase`}
            Copy={`sponsors : ${Sponsors.length}`}
            marginBottom={0}
          />
          <SPONSOR_CTABTN setIsCreate={setIsCreate} isCreate={isCreate} />
        </Group>
      ) : (
        <P color={3} Weight={400} marginBottom={0}>
          Sponsor limit has been reached.
        </P>
      )}
    </Group>
  </Box>
);

const ContentSection = ({
  Sponsors,
  SPONSORLIMIT,
  isCreate,
  setIsCreate,
  userAccount,
}) => {
  if (isCreate) {
    return (
      <CreateaSponsorForm
        OBJ={{
          Name: null,
          URL: null,
          Tagline: null,
          Logo: null,
          LogoPath: false,
          account: [userAccount.id],
          Create: true,
          UpdateSponsor: false,
          isActive: true,
          Order: 100,
          setIsCreate:setIsCreate
        }}
      />
    );
  } else if (Sponsors.length === 0) {
    return <CreateFirstSponsor setIsCreate={setIsCreate} isCreate={isCreate} />;
  } else {
    return (
      <DragnDropSponsorList
        SPONSORS={Sponsors}
        SPONSORLIMIT={SPONSORLIMIT}
        setIsCreate={setIsCreate}
      />
    );
  }
};

const SponsorLimitMessage = ({ Sponsors, SPONSORLIMIT, isCreate }) => {
  if (isCreate) return null;

  const message =
    Sponsors.length >= SPONSORLIMIT
      ? "You have reached the limit of your sponsors. Please edit or archive a sponsor to add a new one."
      : `Create up to ${SPONSORLIMIT} sponsors for your videos and images.`;

  return (
    <Box
      sx={(theme) => ({
        padding: "10px 20px",
        marginTop: "10px", // Space between this message and previous components
      })}
    >
      <P color={2} Weight={400} textAlign={"right"}>
        {message}
      </P>
    </Box>
  );
};

export default SPONSORS;
