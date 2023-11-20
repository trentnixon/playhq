import { useState } from "react";

import { Grid, Select } from "@mantine/core";

import { MediaTabs } from "./MediaTabs";
import { P } from "../../../../components/Members/Common/Type";

function groupAssetsByCategory(assets) {
  return assets.reduce((groupedAssets, asset) => {
    // Extract the Identifier from the asset
    console.log(asset.attributes.asset_category.data?.attributes?.Identifier);
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

 

  const mediaOptions = groupedAssets[selectedTab]?.map((asset) => ({
    value: asset.id, // Assuming each asset has a unique id
    label: asset.attributes.Name,
  }));

  const handleMediaChange = (selectedValue) => {
    const selectedAsset = groupedAssets[selectedTab].find(
      (asset) => asset.id === selectedValue
    );
    console.log("selectedAsset", selectedAsset.attributes);
    setSelectedMedia(selectedAsset.attributes);
  };

  //console.log(groupedAssets[selectedTab][selectedMedia]?.attributes)
  return (
    <Grid>
      <Grid.Col span={6}>
        <P>Select a Media Type to preview</P>
        {/* <MediaTabs
          clubData={clubData}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          selectedMedia={selectedMedia}
        /> */}
      </Grid.Col>

      <Grid.Col span={6}>
       {/*  [Title] [small instruction text] [Asset Selector] [color selector] */}
       {/*  <Select
          label="Choose Media Option"
          value={selectedMedia?.id}
          onChange={handleMediaChange}
          data={mediaOptions || []}
        /> */}
        {/* <Controls clubData={clubData} /> */}
      </Grid.Col>
    </Grid>
  );
};
