// Core
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// UTILS
import { useAccountDetails } from "../../lib/userContext";
import { useUser } from "../../lib/authContext";

import {
  MembersWrapper,
  PageCopyWrapper,
  Wrapper,
} from "../../components/Members/Common/Containers";

import { PageTitle, P } from "../../components/Members/Common/Type";

// PACK
import { Box, Group, Paper } from "@mantine/core";
import { IconCheck } from "@tabler/icons";
// Components
//import { FixturaLoading } from "../../components/Members/Common/Loading";
import { CreateaSponsorForm } from "../../components/Members/Sponsors/TheForm";
import { DragnDropSponsorList } from "../../components/Members/Sponsors/ListofDragnDrop";
import { SPONSOR_CTABTN } from "../../components/Members/Sponsors/SPONSOR_CTABTN";
import { CreateFirstSponsor } from "../../components/Members/Sponsors/CreateFirstSponsor";

/*
-explaination as to what a sponsor is and where they will be positioned
      -icons explaintion as to what a title sponsor is.
*/

const SPONSORS = () => {
  // VARS
  const SPONSORLIMIT = 5;
  // HOOKS
  const { account, ReRender } = useAccountDetails();

  // STATE
  const [userAccount, setUserAccount] = useState(account);
  const [isCreate, setIsCreate] = useState(false);
  const [Sponsors, setSponsors] = useState(
    userAccount?.attributes?.sponsors?.data
  );

  // Set SET ACCOUNT DATA
  useEffect(() => {
    setUserAccount(account);
    setSponsors(account?.attributes?.sponsors?.data);
  }, [account]);

  /* is User Auth */
  const { user, loading } = useUser();
  const router = useRouter();
  const currentRoute = router.pathname;
  useEffect(() => {
    if (!user) router.push(`/members/verification/?prev=${currentRoute}`);
  }, []);
  /* End User Check*/

  useEffect(() => {
    console.log("userAccount ", userAccount);
  }, [userAccount]);

  if (!user || !userAccount || !Sponsors) return false;
  return (
    <MembersWrapper>
      <PageTitle Copy={"SPONSORS"} ICON={<IconCheck size={40} />} />
      <Wrapper>
        <Group position="apart">
        <PageCopyWrapper>
            <P
              Copy={`Sponsors are a great way to add a personal touch to your assets and show your 
              appreciation for your club's supporters. To create a sponsor, 
              simply click the create button,  upload an image of the sponsor's logo, add their name 
              and website.
             
              You can add multiple sponsors and easily update or remove them as needed. 
              With Fixtura, it's easy to give your sponsors the recognition they deserve 
              while keeping your assets looking professional and cohesive.`}
            />
          </PageCopyWrapper>
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

        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.members[1],
            padding: "10px 20px",
            borderRadius: "10px 10px 0 0 ",
            borderBottom: `1px solid ${theme.colors.members[3]}`,
          })}
        >
          <Group position="right">
            {Sponsors.length > SPONSORLIMIT ? (
              false
            ) : (
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
            )}
          </Group>
        </Box>

        {isCreate ? (
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
            }}
          />
        ) : Sponsors.length === 0 && !isCreate ? (
          <CreateFirstSponsor setIsCreate={setIsCreate} isCreate={isCreate} />
        ) : (
          <>
            <DragnDropSponsorList
              SPONSORS={Sponsors}
              SPONSORLIMIT={SPONSORLIMIT}
              setIsCreate={setIsCreate}
            />
          </>
        )}
      </Wrapper>
    </MembersWrapper>
  );
};
export default SPONSORS;
