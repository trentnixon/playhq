import { useEffect, useState } from "react";
import { Grid, Button, Paper, Space } from "@mantine/core";
import { MediaTabs } from "./MediaTabs";
import { GradientTitle, H, P } from "../../Members/Common/Type";
import { IconCircle, IconCircleCheck } from "@tabler/icons";
import ColorPickerComponent from "./ColorPickerComponent";
import ImageUploader from "./ImageUploader";
function groupAssetsByCategory(assets) {
  // Define the list of CompositionIDs to exclude
  const excludeTerms = [
    "RosterPoster",
    "Up Coming Fixtures (Twitter)",
    "Weekend Results (Long Form)",
    "Weekend Results (Twitter)",
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
      color={selectedButton === asset.id ? "blue" : "gray.7"}
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
      <Grid.Col span={7}>
        <MediaTabs
          key={playerKey} // Assign the key here
          clubData={clubData}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          selectedMedia={selectedMedia}
          userColors={userColors}
          userlogoUrl={logoUrl}
        />
        <Paper p={10} my={10} withBorder style={{ backgroundColor:"#dee2e6"}}>
          <P marginBottom={0}>
            Explore with our Free Basic template, available to all users.
            Looking for something more personalized? Contact us to integrate
            your own designs into Fixtura and enhance your club's uniqueness.
          </P>
        </Paper >
        <Paper p={10} my={10} withBorder style={{ backgroundColor:"#dee2e6"}}>
          <P marginBottom={0}>
            The data in videos and graphics is a fun showcase of Fixtura's
            capabilities, featuring your fixtures and leagues. The write-ups use
            real-world content from our 23/24 season, bringing authentic stories
            to your club's media.
          </P>
        </Paper>
      </Grid.Col>

      <Grid.Col span={5}>
        <GradientTitle size={"h2"} title={"Customise Your Fixtura Journey"} />
        <P>
          Choose from the asset list below. Instantly see it in your club’s
          colors and logo for a perfect preview.
        </P>

        <GradientTitle size={"h3"} title={"Select an Asset"} />
        <Paper
          p={0}
          withBorder
          shadow="lg"
          style={{ backgroundColor: "#dee2e6" }}
        >
          <Button.Group orientation="vertical">{buttons}</Button.Group>
        </Paper>
        <Space h={20} />

        <GradientTitle size={"h3"} title={"Change your Logo"} />
        <Paper
          p={10}
          withBorder
          shadow="lg"
          style={{ backgroundColor: "#495057" }}
        >
          <ImageUploader onImageSelect={handleImageSelect} />
        </Paper>
        <Space h={20} />
        <GradientTitle size={"h3"} title={"Club Colors Customization"} />
        <P>
          Refine your club's theme by adjusting the colors to match your exact
          branding.
        </P>
        <Paper
          p={10}
          withBorder
          shadow="lg"
          style={{ backgroundColor: "#495057" }}
        >
          <ColorPickerComponent onColorChange={handleColorChange} />
        </Paper>
      </Grid.Col>
    </Grid>
  );
};
