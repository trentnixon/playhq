import React, { useEffect, useState } from "react";
import { useAccountDetails } from "../../lib/userContext";
import { useUser } from "../../lib/authContext";
import cookie from "cookie"; // Make sure to import the cookie library
import { fetcher } from "../../lib/api";
import { P, PageTitle, SubHeaders } from "../../components/Members/Common/Type";
import {
  MembersWrapper,
  PageCopyWrapper,
} from "../../components/Members/Common/Containers";
import { Grid, Group, Image, Paper, Select, Space, Tabs } from "@mantine/core";
import { IconColorPicker } from "@tabler/icons";
import { DesignTabs } from "../../components/Members/Design/DesignTabs";
import { LoadingStateWrapper } from "../../components/Members/Account/HOC/LoadingStateWrapper";
import { BTN_TOEXTLINK } from "../../components/Members/Common/utils/Buttons";
import Meta from "../../components/Layouts/Meta";
import { MembersPreviewShell } from "../../components/Members/GraphicsPackage/PreviewShell";
import { AccountLogo } from "../../components/Members/Design/AddLogo";
import { IconPhoto } from "@tabler/icons-react";
import { IconMessageCircle } from "@tabler/icons-react";
import { UpdateYourTheme } from "../../components/Members/GraphicsPackage/UpdateYourTheme";
import { FixturaDivider } from "../../components/Members/Common/Divider";
const qs = require("qs");

const query = qs.stringify(
  {
    populate: [
      "template",
      "theme",
      "audio_option",
      "ai_publication",
      "ai_writting_tone",
      "ai_writting_style",
      "account_media_libraries",
      "account_media_libraries.imageId",
    ],
  },
  {
    encodeValuesOnly: true,
  }
);

const Design = ({ Response }) => {
  const { account } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const [selectedAsset, setSelectedAsset] = useState("UpComingFixtures");
  const [selectedHeroImage, setHeroImage] = useState(null);
  const [playerKey, setPlayerKey] = useState(Date.now());
  //const [isPlaying, setIsPlaying] = useState(false);
  const { user } = useUser();

  useEffect(() => {}, [userAccount]);
  useEffect(() => { 
    setUserAccount(account);
  }, [account]);

  useEffect(() => {
    setPlayerKey(Date.now());
  }, [selectedHeroImage, selectedAsset]);
  return (
    <LoadingStateWrapper conditions={[user, userAccount]}>
      <MembersWrapper>
        <Meta
          title="Member Graphics Packages - Fixtura: Choose Your Style"
          description="Select and customize graphics packages for your club as a Fixtura member. Elevate your sports media with our diverse designs."
          keywords="Member graphics, Fixtura packages, sports media styles, club content design, digital visuals"
        />
        <PageTitle
          Copy={"Graphics Package"}
          ICON={<IconColorPicker size={40} />}
        />

        <PageCopyWrapper>
          <P>
            Experience the power and flexibility of Fixtura's Graphics Packages.
            With a simple selection process, you can choose a visual style that
            truly represents your club or association. Remember, there are two
            primary options to consider for your organization's graphics:
          </P>
        </PageCopyWrapper>
        <Space h={20} />
        <Grid>
          <Grid.Col  sm={12} md={6}>
            <MembersPreviewShell
              key={playerKey}
              userAccount={userAccount}
              selectedAsset={selectedAsset}
              selectedHeroImage={selectedHeroImage} 
            />
          </Grid.Col>
          <Grid.Col  sm={12} md={6}>
            <Tabs defaultValue="setting" variant="pills" color="blue">
              <Paper
                p={"xs"}
                sx={(theme) => ({
                  backgroundColor: theme.colors.gray[3],
                })}
              >
                <Tabs.List grow position="center">
                  <Tabs.Tab value="setting" icon={<IconPhoto size="0.8rem" />}>
                    Preview Settings
                  </Tabs.Tab>
                  <Tabs.Tab value="gallery" icon={<IconPhoto size="0.8rem" />}>
                    Update Theme
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="messages"
                    icon={<IconMessageCircle size="0.8rem" />}
                  >
                    Update Logo
                  </Tabs.Tab>
                </Tabs.List>
              </Paper>
              <Tabs.Panel value="setting" pt="xs">
                <PreviewControls
                  setSelectedAsset={setSelectedAsset}
                  selectedAsset={selectedAsset}
                  userAccount={userAccount}
                  selectedHeroImage={selectedHeroImage}
                  setHeroImage={setHeroImage}
                />
              </Tabs.Panel>
              <Tabs.Panel value="gallery" pt="xs">
                <UpdateYourTheme />
              </Tabs.Panel>

              <Tabs.Panel value="messages" pt="xs">
                <Paper>
                  <AccountLogo />
                </Paper>
              </Tabs.Panel>
            </Tabs>
          </Grid.Col>
          <Grid.Col span={12}>
            <FixturaDivider />

            <SubHeaders Copy={"Select a Template"} />
            <P>
              Dive into our collection of ready-to-use graphics, available at no
              cost. As we continually expand our library, we recommend staying
              updated with our social channels for the latest graphic package
              releases.
            </P>
            <DesignTabs
              userAccount={userAccount}
              hasMediaItems={
                Response?.attributes.account_media_libraries.data.length
              }
            />
          </Grid.Col>
        </Grid>

        <PageCopyWrapper>
          <SubHeaders Copy={"Bespoken Graphics"} />
          <P>
            For a truly unique and tailored feel, collaborate with us to craft
            bespoke graphics that resonate with your organization's brand and
            identity. Already have a design theme in mind or in use? Let's work
            together to adapt and integrate your vision into our system,
            ensuring a consistent and authentic online presence.
          </P>

          <Group position="right" mt={20} mb={20}>
            <P marginBottom={0}>
              To learn more or start the design journey, DM us on our Facebook
              page.
            </P>
            <BTN_TOEXTLINK
              URL="https://www.facebook.com/profile.php?id=100095406210560"
              LABEL={"Start Your Bespoke Journey"}
            />{" "}
          </Group>
        </PageCopyWrapper>
      </MembersWrapper>
    </LoadingStateWrapper>
  );
};

export async function getServerSideProps(ctx) {
  // Parse cookies from the incoming headers
  const parsedCookies = cookie.parse(ctx.req.headers.cookie || "");
  const jwt = parsedCookies["jwt"]; // Use the actual key you set the JWT cookie with
  const linkedAccount = parsedCookies["LinkedAccount"]; // Use the actual key

  // Now you can use these in your fetcher
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${linkedAccount}?${query}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const Response = response.data;
  return { props: { Response } }; // Return the response data as props
}

export default Design;

const PreviewControls = ({
  setSelectedAsset,
  selectedAsset,
  userAccount,
  selectedHeroImage,
  setHeroImage,
}) => {
  //console.log(userAccount.attributes.account_media_libraries.data);
  const mediaGallery = userAccount.attributes.account_media_libraries.data;

  const assetOptions = [
    { value: "UpComingFixtures", label: "Upcoming Fixtures" },
    { value: "WeekendResults", label: "Weekend Results" },
    { value: "Top5BattingList", label: "Top 5 Batting" },
    { value: "Top5BowlingList", label: "Top 5 Bowling" },
    { value: "Ladder", label: "Ladder" },
  ];

  const handleAssetChange = (value) => {
   
    setSelectedAsset(value);
  };

  const imageOptions = userAccount.attributes.account_media_libraries.data.map(
    (item) => {
      //console.log(item);
      const imageUrl = item.attributes.imageId.data.attributes.url;
      const imageWidth = item.attributes.imageId.data.attributes.width;
      const imageHeight = item.attributes.imageId.data.attributes.height;
      const imageRatio = imageWidth > imageHeight ? "landscape" : "portrait";

      return {
        value: JSON.stringify({
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
          ratio: imageRatio,
        }),
        label: item.attributes.title
          ? item.attributes.title
          : "Image Has No Title",
      };
    }
  );

  imageOptions.unshift({
    value: JSON.stringify(null),
    label: "No Image",
  });
  // Find the value that matches the selectedHeroImage
  const selectedHeroImageValue = JSON.stringify(selectedHeroImage);
  const handleImageChange = (value) => {
   
    setHeroImage(JSON.parse(value));
  };
  return (
    <>
      <Paper withBorder shadow="xl" p={"md"} sx={(theme) => ({})}>
        <P marginBottom={0} Weight={900} >Catalogue Preview</P>
        <P size="sm" marginBottom={10}>
        Select an Asset type to preview
        </P>
        <Select
          placeholder="Choose an asset"
          data={assetOptions}
          value={selectedAsset}
          onChange={handleAssetChange}
          mb={20}
        />
      </Paper>
      <Paper withBorder shadow="xl" p={"md"} sx={(theme) => ({})} mt={20}>
        <P marginBottom={0} Weight={900} >Review Your Media Gallery</P>
        <P size="sm" marginBottom={10}>
        Choose an image from your media gallery to see how it looks in your Assets.
        </P>
        <Select
          placeholder="Choose an image"
          data={imageOptions}
          value={selectedHeroImageValue}
          onChange={handleImageChange}
          mb={20}
        />

        {selectedHeroImage && selectedHeroImage.url && (
          <Image
            src={selectedHeroImage.url}
            alt="Selected Hero Image"
            caption={selectedHeroImage.label}
            mb={10}
          />
        )}

        {mediaGallery.length === 0 && (
          <P color="dimmed" size="sm">
            To add images to your gallery, go to the Media Gallery Page.
          </P>
        )}
      </Paper>
    </>
  );
};
