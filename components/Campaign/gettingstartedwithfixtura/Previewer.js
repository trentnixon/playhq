import { useEffect, useState } from "react";
import { Grid, Button, Paper, Space, Group, Tooltip, Box } from "@mantine/core";
import { MediaTabs } from "./MediaTabs";
import { GradientTitle, H, P } from "../../Members/Common/Type";
import { IconCircle, IconCircleCheck, IconQuestionCircle } from "@tabler/icons";
import ColorPickerComponent from "./ColorPickerComponent";
import ImageUploader from "./ImageUploader";
import { IconAlertCircle, IconShieldOff } from "@tabler/icons-react";
function groupAssetsByCategory(assets) {
  // Define the list of CompositionIDs to exclude
  const excludeTerms = [
    "RosterPoster",
    "Up Coming Fixtures (Twitter)",
    "Weekend Results (Long Form)",
    "Weekend Results (Twitter)",
    "Stumps Review (Twitter)",
    "Stumps Review (Article)",
  ];

  return assets.reduce((groupedAssets, asset) => {
    const identifier =
      asset.attributes.asset_category?.data?.attributes?.Identifier;
    const compositionID = asset.attributes.CompositionID;

    // Skip adding the asset if its CompositionID is in the excludeTerms
    if (excludeTerms.includes(compositionID)) {
      return groupedAssets;
    }

    // Initialize the category array if not already done
    if (!groupedAssets[identifier]) {
      groupedAssets[identifier] = [];
    }

    // Add the current asset to its category array
    groupedAssets[identifier].push(asset);

    return groupedAssets;
  }, {});
}

export const Previewer = ({ clubData, useAssets }) => {
  const groupedAssets = groupAssetsByCategory(useAssets);
  const [selectedTab, setSelectedTab] = useState("VIDEO");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [playerKey, setPlayerKey] = useState(Date.now()); // Unique key for the player component
  const [selectedButton, setSelectedButton] = useState(null); // New state for selected button
  const [userColors, setUserColors] = useState([]);
  const [logoUrl, setLogoUrl] = useState(false);

  const handleImageSelect = (url) => {
    setLogoUrl(url);
    setPlayerKey(Date.now());
  };
  useEffect(() => {
    // Automatically select the first asset when the tab changes or on component load
    if (groupedAssets[selectedTab]?.length > 0) {
      const firstAsset = groupedAssets[selectedTab][0];
      setSelectedMedia(firstAsset.attributes);
      setSelectedButton(firstAsset.id);
      setPlayerKey(Date.now());
    }
  }, [selectedTab, useAssets]);

  const handleButtonClick = (asset) => {
    setSelectedMedia(asset.attributes);
    setSelectedButton(asset.id); // Update the selected button state
    setPlayerKey(Date.now()); // Reset the playerKey to force re-render of the player
  };

  const handleColorChange = ({ Primary, Secondary }) => {
    setUserColors([Primary, Secondary]);
  };
  const buttonStyles = {
    inner: {
      justifyContent: "space-between", // Aligns text to left and icon to right
    },
  };
  const buttons = groupedAssets[selectedTab]?.map((asset) => (
    <Button
      key={asset.id}
      variant={selectedButton === asset.id ? "filled" : "filled"}
      onClick={() => handleButtonClick(asset)}
      color={selectedButton === asset.id ? "blue" : "gray.5"}
      rightIcon={
        selectedButton === asset.id ? (
          <IconCircleCheck size={24} />
        ) : (
          <IconCircle size={24} />
        )
      }
      styles={buttonStyles} // Apply custom styles
    >
      {asset.attributes.Name}
    </Button>
  ));

  return (
    <Grid>
      <Grid.Col md={1} lg={7}>
        <MediaTabs
          key={playerKey} // Assign the key here
          clubData={clubData}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          selectedMedia={selectedMedia}
          userColors={userColors}
          userlogoUrl={logoUrl}
        />

        <Paper
          p={10}
          my={10}
          withBorder
          style={{
            backgroundColor: "#dee2e6",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconShieldOff size={"4em"} style={{ marginRight: "10px" }} />
          <P size={"xs"} marginBottom={0} style={{ flex: 1 }}>
            Demo content blends international teams with your club's details for
            illustrative purposes only. The write-ups are examples from the real
            world, modified for privacy by removing names and teams.
          </P>
        </Paper>
      </Grid.Col>

      <Grid.Col md={1} lg={5}>
        <GradientTitle size={"h2"} title={"Customise Your Fixtura Journey"} />
        <P>
          Choose from the asset list below. Instantly see it in your club’s
          colors and logo for a perfect preview.
        </P>

        <Group position="apart">
          <GradientTitle size={"h3"} title={"Select an Asset"} />
          <Tooltip
            multiline
            width={220}
            label="Pick a content category, such as Weekend Results or Top 5 Performances, to see a relevant preview."
            color="blue"
            withArrow
            arrowPosition="center"
          >
            <Box>
              <IconQuestionCircle color="gray" />
            </Box>
          </Tooltip>
        </Group>
        <Paper
          p={0}
          withBorder
          shadow="lg"
          style={{ backgroundColor: "#dee2e6" }}
        >
          <Button.Group orientation="vertical">{buttons}</Button.Group>
        </Paper>
        <Space h={20} />
        <Group position="apart">
          <GradientTitle size={"h3"} title={"Change your Logo"} />
          <Tooltip
            multiline
            width={220}
            label="Upload your club's logo to see it seamlessly integrated into the assets."
            color="blue"
            withArrow
            arrowPosition="center"
          >
            <Box>
              <IconQuestionCircle color="gray" />
            </Box>
          </Tooltip>
        </Group>
        <Paper
          p={10}
          withBorder
          shadow="lg"
          style={{ backgroundColor: "#adb5bd" }}
        >
          <ImageUploader onImageSelect={handleImageSelect} />
        </Paper>
        <Space h={20} />

        <Group position="apart">
          <GradientTitle size={"h3"} title={"Club Colors Customization"} />
          <Tooltip
            multiline
            width={220}
            label="Adjust the color scheme of the assets to match your club's official branding."
            color="blue"
            withArrow
            arrowPosition="center"
          >
            <Box>
              <IconQuestionCircle color="gray" />
            </Box>
          </Tooltip>
        </Group>

        <P>
          Refine your assets' theme by tweaking the colors, initially estimated
          from your logo, to precisely match your club's branding.
        </P>
        <Paper
          p={10}
          withBorder
          shadow="md"
          mb={20}
          style={{ backgroundColor: "#adb5bd" }}
        >
          <ColorPickerComponent onColorChange={handleColorChange} />
        </Paper>

        <Paper
          p={10}
          my={10}
          withBorder
          style={{
            backgroundColor: "#dee2e6",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconAlertCircle size={"4em"} style={{ marginRight: "10px" }} />
          <P marginBottom={0} style={{ flex: 1 }}>
            Looking for something more personalized? Contact us to integrate
            your own designs into Fixtura and enhance your club's uniqueness.
          </P>
        </Paper>
      </Grid.Col>
    </Grid>
  );
};
