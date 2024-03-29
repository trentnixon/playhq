import { useEffect, useState } from "react";
import { useAccountDetails } from "../../../../lib/userContext";
import { P, PageTitle } from "../../Common/Type";
import { Wrapper } from "../../Common/Containers";
import { Box, Group, List, Paper, useMantineTheme } from "@mantine/core";
import { FixturaLoading } from "../../Common/Loading";
import {
  IconTools,
  IconCalendarEvent,
  IconEye,
  IconCreditCard,
} from "@tabler/icons";
import { FindAccountLabel } from "../../../../lib/actions";
import { useMediaQuery } from "@mantine/hooks";
import { BTN_ONCLICK, BTN_TOINTERALLINK } from "../../Common/utils/Buttons";

const SetupCheck = ({ children }) => {
  const { account, ReRender } = useAccountDetails();
  const [isSetup, setIsSetup] = useState(null);
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  useEffect(() => {
    if (!isSetup) {
      const interval = setInterval(() => {
        ReRender(); // Trigger a re-fetch of the account details
      }, 500); // Poll every 10 seconds

      // Clear interval on component unmount
      return () => clearInterval(interval);
    }
  }, [isSetup, ReRender]);

  useEffect(() => {
    setIsSetup(account?.attributes?.isSetup); // Update isSetup when the account details change
  }, [account]);

  //console.log("isSetup", isSetup);

  if (isSetup === null || isSetup === undefined) return <FixturaLoading />;
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
                width: "100%",
              })}
            >
              <P
                Weight={600}
                textAlign={"center"}
                size={"xl"}
                textTransform={"uppercase"}
                marginBottom={20}
                color={"blue.8"}
              >
                Syncing in Progress with PlayHQ: 
              </P>

              <P textAlign={"center"} size={"md"} marginBottom={25} color={8}>
                We're actively syncing with PlayHQ to tailor our platform
                specifically for your club or association. Keep in mind, the
                size of your organization influences the syncing time – we're
                ensuring everything is just right for you.
              </P>
              <P textAlign={"center"} size={"md"} marginBottom={25} color={8}>
                Larger organizations might require a bit more time, but rest
                assured, we're efficiently processing everything.
              </P>

              <P Weight={600}>
                In the meantime, let's continue setting up your profile:
              </P>
              <Paper shadow="sm" p="md" withBorder>
                <List spacing="xs" size="sm" center>
                  <List.Item
                    icon={
                      <IconTools stroke={1.5} size="2rem" color={"#6699CC"} />
                    }
                  >
                    <Group position="apart"  mb={20}>
                      <P Weight={600} color={4}>
                        Customizer
                      </P>
                      <BTN_TOINTERALLINK
                        URL={`/members/customizer/`}
                        LABEL={"Customizer"}
                      />
                    </Group>
                    <P>
                      Step into a world of visual diversity with Fixtura's
                      Graphics Packages. Choose the style that resonates with
                      {FindAccountLabel(account)}'s identity, whether you're
                      looking for dynamic match summaries or elegant player
                      profiles. Our wide range ensures there's a perfect fit for
                      every club's personality.
                    </P>
                  </List.Item>
                 {/*  <List.Item
                    icon={
                      <IconCalendarEvent
                        stroke={1.5}
                        size="2rem"
                        color={"#6699CC"}
                      />
                    }
                  >
                    <Group position="apart">
                      <P Weight={600} color={4}>
                        Branding
                      </P>
                      <BTN_TOINTERALLINK
                        URL={`/members/graphics-packages/`}
                        LABEL={"Graphics Packages"}
                      />
                    </Group>
                    <P>
                      Your club's brand is central to your identity. Fixtura
                      empowers you to integrate your unique brand elements into
                      every digital asset. From embedding your logo to matching
                      your club's colors, each piece of content becomes an
                      authentic representation of {FindAccountLabel(account)}.
                    </P>
                    <P textAlign={`right`}>
                      <BTN_TOINTERALLINK
                        URL={`/members/bundles/`}
                        LABEL={"Bundles"}
                      />
                    </P>
                  </List.Item> */}
                  <List.Item
                    icon={
                      <IconEye stroke={1.5} size="2rem" color={"#6699CC"} />
                    }
                  >
                    <Group position="apart"  mb={20}>
                      <P Weight={600} color={4}>
                        Gallery Items
                      </P>
                      <BTN_TOINTERALLINK
                        URL={`/members/gallery/`}
                        LABEL={"Media Gallery"}
                      />
                    </Group>
                    <P>
                      Elevate your visual storytelling with Fixtura’s Gallery
                      Items. These images are not just static displays; they
                      become the backbone of your videos and graphics. Whether
                      it's for impactful background visuals or striking hero
                      images, the photos you upload set the stage for each
                      digital creation. Tailor your {FindAccountLabel(account)}'s narrative by
                      choosing images that resonate with your team’s spirit and
                      triumphs. With each upload, you're not just adding a
                      picture; you're crafting the visual essence of your club's
                      story.
                    </P>
                  </List.Item>
                  <List.Item
                    icon={
                      <IconCreditCard
                        stroke={1.5}
                        size="2rem"
                        color={"#6699CC"}
                      />
                    }
                  >
                    <Group position="apart" mb={20}>
                      <P Weight={600} color={4}>
                        Sponsorships
                      </P>
                      <BTN_TOINTERALLINK
                        URL={`/members/sponsors/`}
                        LABEL={"Add Sponsors"}
                      />
                    </Group>
                    <P>
                      Showcase the supporters behind {FindAccountLabel(account)}
                      with ease and impact. Fixtura simplifies the creation and
                      display of sponsor profiles, ensuring your partners
                      receive the recognition they deserve, while elevating your
                      club's digital footprint.
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
