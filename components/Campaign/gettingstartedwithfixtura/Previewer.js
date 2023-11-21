import { useEffect, useState } from "react";
import { Grid, Button } from "@mantine/core";
import { MediaTabs } from "./MediaTabs";
import { GradientTitle, P } from "../../Members/Common/Type";
import { IconCircle, IconCircleCheck } from "@tabler/icons";
function groupAssetsByCategory(assets) {
  return assets.reduce((groupedAssets, asset) => {
    const identifier =
      asset.attributes.asset_category?.data?.attributes?.Identifier;

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

  
const buttonStyles = {
  inner: {
    justifyContent: 'space-between', // Aligns text to left and icon to right
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
      <Grid.Col span={6}>
        <MediaTabs
          key={playerKey} // Assign the key here
          clubData={clubData}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          selectedMedia={selectedMedia}
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <GradientTitle title={"Begin Your Fixtura Journey"} />
        <P>
          Select a media type—videos, graphics, or
          write-ups—and choose from the asset list below. 
          Instantly see it in your club’s colors
          and logo for a perfect preview.
        </P>
        <Button.Group orientation="vertical">{buttons}</Button.Group>
        <P>Change your Colors</P>
        <P>Change your Logo</P>
      </Grid.Col>
    </Grid>
  );
};
