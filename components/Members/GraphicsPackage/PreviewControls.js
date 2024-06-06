import React from "react";

import { P } from "../../../components/Members/Common/Type";

import { Image, Paper, Select, Space } from "@mantine/core";

export const PreviewControls = ({
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
        <P marginBottom={0} Weight={900}>
          Catalogue Preview
        </P>
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
        <P marginBottom={0} Weight={900}>
          Review Your Media Gallery
        </P>
        <P size="sm" marginBottom={10}>
          Choose an image from your media gallery to see how it looks in your
          Assets.
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
            width={160}
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
