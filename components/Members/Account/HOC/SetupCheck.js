import { useEffect, useState } from "react";
import { useAccountDetails } from "../../../../lib/userContext";
import { P, PageTitle } from "../../Common/Type";
import { Wrapper } from "../../Common/Containers";
import { Box, Group, List, Paper } from "@mantine/core";
import { FixturaLoading } from "../../Common/Loading";
import {
  IconTools,
  IconCalendarEvent,
  IconEye,
  IconCreditCard,
} from "@tabler/icons";
import { FindAccountLabel } from "../../../../lib/actions";

const SetupCheck = ({ children }) => {
  const { account, ReRender } = useAccountDetails();
  const [isSetup, setIsSetup] = useState(account?.attributes?.isSetup);

 
  useEffect(() => {
    if (!isSetup) {
      const interval = setInterval(() => {
        ReRender(); // Trigger a re-fetch of the account details
      }, 10000); // Poll every 10 seconds

      // Clear interval on component unmount
      return () => clearInterval(interval);
    }
  }, [isSetup, ReRender]);

  useEffect(() => {
    setIsSetup(account?.attributes?.isSetup); // Update isSetup when the account details change
  }, [account]);

  if (isSetup) {
    return children;
  } else {
    return (
      <div>
        <PageTitle Copy={`Setting up your account`} ICON={<FixturaLoading />} />
        <Wrapper>
          <Group position="apart">
            <Box
              sx={(theme) => ({
                width: "80%",
              })}
            >
              <P
                Weight={600}
                textAlign={"center"}
                size={"xl"}
                textTransform={"uppercase"}
                marginBottom={0}
                 color={8}
              >
                Syncing with PlayHQ
              </P>
              <P textAlign={"center"} size={"xs"} marginBottom={25} color={8}>
                There is no need to reload this page as your account will
                display when it is ready. ETA:3-5 minutes
              </P>

              <P>What awaits you after this process:</P>
              <Paper shadow="sm" p="md" withBorder>
              <List spacing="xs" size="sm" center>
                <List.Item icon={<IconTools stroke={1.5} size="2rem" color={"#6699CC"} />}>
                  <P Weight={600}  color={4}>Customization Galore</P>
                  <P>
                    Once Fixtura has learned about {FindAccountLabel(account)}, you can
                    tailor your experience just the way you like. Select
                    layouts, audio themes, and more.
                  </P>
                </List.Item>
                <List.Item
                  icon={<IconCalendarEvent stroke={1.5} size="2rem" color={"#6699CC"} />}
                >
                  <P Weight={600}  color={4}>Scheduled Delivery</P>
                  <P>
                    Choose the day for your weekly asset delivery and know
                    exactly when to expect your content.
                  </P>
                </List.Item>
                <List.Item icon={<IconEye stroke={1.5} size="2rem" color={"#6699CC"}/>}>
                  <P Weight={600}  color={4}>Season Tracking</P>
                  <P>
                    We'll keep an eye on the fixtures throughout your season, so
                    you're always in the loop.
                  </P>
                </List.Item>
                <List.Item icon={<IconCreditCard stroke={1.5} size="2rem" color={"#6699CC"} />}>
                  <P Weight={600}  color={4}>Subscription Selection</P>
                  <P>
                    Pick the subscription that suits you, sit back, and watch as
                    custom-made assets about your weekend fixtures fill your
                    inbox.
                  </P>
                </List.Item>
              </List>
              </Paper>
            </Box>
          </Group>
        </Wrapper>
      </div>
    );
  }
};

export default SetupCheck;
