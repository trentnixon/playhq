import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// LIB
import { useAccountDetails } from "../../lib/userContext";
import { useUser } from "../../lib/authContext";
///api/orders/confirm
import { useConfirmOrder } from "../../Hooks/useOrder";
import {
  MembersWrapper,
  ShadowWrapper,
  Wrapper,
} from "../../components/Members/Common/Containers";
import { PageTitle, P, SubHeaders } from "../../components/Members/Common/Type";
import { Box, Button, Center, Container, Group, Paper } from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import {
  BTN_ONCLICK,
  BTN_TOINTERALLINK,
} from "../../components/Members/Common/utils/Buttons";

// Components
import { CreateaSponsorForm } from "./Sponsors/TheForm";
import { FixturaLoading } from "../../components/Members/Common/Loading";
import { DragnDropSponsorList } from "./Sponsors/ListofDragnDrop";

const SPONSORS = () => {
  // VARS
  const SPONSORLIMIT = 10;
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
    console.log("NEW ACCOUNT DATA FOUND");
    console.log(account);
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
          <Box
            sx={(theme) => ({
              width: "60%",
            })}
          >
            <P
              Copy={`Sponsors are a great way to add a personal touch to your assets and show your 
              appreciation for your club's supporters. To create a sponsor, 
              simply click the create button,  upload an image of the sponsor's logo, add their name 
              and website.
             
              You can add multiple sponsors and easily update or remove them as needed. 
              With Fixtura, it's easy to give your sponsors the recognition they deserve 
              while keeping your assets looking professional and cohesive.`}
            />
            -explaination as to what a sposnor -icons explaintion as to what a
            title sponsor is.
          </Box>
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
              Copy={`${
                SPONSORLIMIT - Sponsors.length
              } spaces remaining`}
            />
          </Paper>
        </Group>



        {Sponsors.length > SPONSORLIMIT ? (
        false
      ) : (
        <Group position="right">
          <CTABTN setIsCreate={setIsCreate} isCreate={isCreate} />
        </Group>
      )}

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
            <P
              color={2}
              textTransform={`uppercase`}
              Copy={`sponsors : ${Sponsors.length} `}
            />
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

const CreateFirstSponsor = (props) => {
  return (
    <>
      <Container>
        <SubHeaders Copy={`Create First Sponsor`} />
        <P Copy={`No Sponsors Found`} />
        <CTABTN {...props} />
      </Container>
    </>
  );
};

const CTABTN = ({ setIsCreate, isCreate }) => {
  return (
    <BTN_ONCLICK
      LABEL={isCreate ? `back` : `Create New`}
      HANDLE={() => {
        setIsCreate(!isCreate);
      }}
    />
  );
};
