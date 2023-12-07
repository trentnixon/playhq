import { useEffect, useState } from "react";
import { Grid, Button, Paper, Space, Group, Tooltip, Box } from "@mantine/core";
import { MediaTabs } from "./MediaTabs";
import { GradientTitle, H, P } from "../../Members/Common/Type";
import { IconCircle, IconCircleCheck, IconQuestionCircle } from "@tabler/icons";
import ColorPickerComponent from "../GLOBAL/ColorPickerComponent";
import ImageUploader from "../GLOBAL/ImageUploader";
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

export const Previewer = ({ AccountData, useAssets }) => {
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
          AccountData={AccountData}
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
            All demo content is for illustration. See how your association’s
            data can be visually transformed with Fixtura.
          </P>
        </Paper>
      </Grid.Col>

      <Grid.Col md={1} lg={5}>
        <GradientTitle size={"h2"} title={"Tailor Fixtura to Your Association"} />
        <P>
        Select from our asset list to preview them in your association’s colors and logo. It’s simple and quick!

        </P>

        <Group position="apart">
          <GradientTitle size={"h3"} title={"Select an Asset"} />
          <Tooltip
            multiline
            width={220}
            label="Pick an asset type to see how your association’s data transforms into engaging content."
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
          <GradientTitle size={"h3"} title={"Upload Your Logo"} />
          <Tooltip
            multiline
            width={220}
            label="Add your logo to see it featured in your custom content."
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
          <GradientTitle size={"h3"} title={"Customize Your Colors"} />
          <Tooltip
            multiline
            width={220}
            label="Fine-tune the colors to match your association’s branding."
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
        Easily adjust the theme colors to align perfectly with your association’s identity.
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
          Want more customization? Reach out to us for personalized designs that make your association stand out.
          </P>
        </Paper>
      </Grid.Col>
    </Grid>
  );
};
