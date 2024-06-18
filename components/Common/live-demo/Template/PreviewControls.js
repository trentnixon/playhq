import React from "react";
import { P } from "../../../Members/Common/Type";
import { Image, Paper } from "@mantine/core";
import { FixturaCustomSelect } from "../../../Members/Common/utils/Selects";

export const PreviewControls = ({
  setSelectedAsset,
  selectedAsset,
  userAccount,
  selectedHeroImage,
  setHeroImage,
  assetOptions,
  requiresMedia,
}) => {
  if (!userAccount) {
    return <P>Loading...</P>;
  }

  const mediaGallery = userAccount.attributes.account_media_libraries.data;

  const handleAssetChange = (value) => {
    setSelectedAsset(value);
  };

  const imageOptions = mediaGallery.map((item) => {
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
      label: item.attributes.title || "Image Has No Title",
    };
  });

  imageOptions.unshift({
    value: JSON.stringify(null),
    label: "No Image",
  });

  const selectedHeroImageValue = JSON.stringify(selectedHeroImage);

  const handleImageChange = (value) => {
    setHeroImage(JSON.parse(value));
  };

  return (
    <>
      <SelectPreviewAsset
        label="Choose an asset"
        placeholder="Choose an asset"
        data={assetOptions[userAccount.attributes.Sport]}
        value={selectedAsset}
        onChange={handleAssetChange}
      />
      {requiresMedia && (
        <SelectPreviewImageOptional
          imageOptions={imageOptions}
          selectedHeroImageValue={selectedHeroImageValue}
          handleImageChange={handleImageChange}
          mediaGallery={mediaGallery}
          selectedHeroImage={selectedHeroImage}
        />
      )}
    </>
  );
};

const SelectPreviewAsset = (props) => {
  const { value, onChange, data } = props;
  return (
    <Paper withBorder shadow="xl" p={"md"}>
      <P marginBottom={0} Weight={900}>
        Catalogue Preview
      </P>
      <P size="sm" marginBottom={10}>
        Select an Asset type to preview
      </P>
      <FixturaCustomSelect
        label="Choose an asset"
        placeholder="Choose an asset"
        data={data}
        value={value}
        onChange={onChange}
      />
    </Paper>
  );
};

const SelectPreviewImageOptional = (props) => {
  const {
    imageOptions,
    selectedHeroImage,
    selectedHeroImageValue,
    handleImageChange,
    mediaGallery,
  } = props;
  return (
    <Paper withBorder shadow="xl" p={"md"} mt={20}>
      <P marginBottom={0} Weight={900}>
        Review Your Media Gallery
      </P>
      <P size="sm" marginBottom={10}>
        Choose an image from your media gallery to see how it looks in your
        Assets.
      </P>
      <FixturaCustomSelect
        label="Choose an image"
        placeholder="Choose an image"
        data={imageOptions}
        value={selectedHeroImageValue}
        onChange={handleImageChange}
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
  );
};
