import { useEffect, useMemo, useState } from "react";
import {
  Grid,
  Button,
  Paper,
  Space,
  Group,
  Tooltip,
  Box,
  Select,
  Text,
} from "@mantine/core";
import { MediaTabs } from "./MediaTabs";
import { GradientTitle, H, P } from "../../Members/Common/Type";
import { IconCircle, IconCircleCheck, IconQuestionCircle } from "@tabler/icons";
import ColorPickerComponent from "../GLOBAL/ColorPickerComponent";
import ImageUploader from "../GLOBAL/ImageUploader";
import { IconAlertCircle, IconShieldOff } from "@tabler/icons-react";
import Link from "next/link";
import { trackButtonClick } from "../../../lib/GA";

const sharedPaperStyles = {
  p: 10,
  withBorder: true,
  shadow: "lg",
  mb: 20,
  style: { backgroundColor: "transparent" },
};

const sharedButtonStyles = {
  inner: {
    justifyContent: "space-between",
  },
};

function groupAssetsByCategory(assets) {
  if (!Array.isArray(assets)) {
    // Handle error or return a default value
    console.error("Invalid assets format");
    return {};
  }

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
  //const groupedAssets = groupAssetsByCategory(useAssets);
  const groupedAssets = useMemo(
    () => groupAssetsByCategory(useAssets),
    [useAssets]
  );

  const [selectedTab, setSelectedTab] = useState("VIDEO");
  const [selectedTemplate, setSelectedTemplate] = useState({
    Template: "Basic",
    label: "Basic Square",
    TemplateVariation: {
      borderRadius: "0px",
    },
  });
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [playerKey, setPlayerKey] = useState(Date.now()); // Unique key for the player component
  const [selectedButton, setSelectedButton] = useState(null); // New state for selected button
  const [userColors, setUserColors] = useState([]);
  const [logoUrl, setLogoUrl] = useState(false);
  const [BackgroundImageUrl, setBackgroundImageUrl] = useState(false);

  const handleImageSelect = (url) => {
    setLogoUrl(url);
    setPlayerKey(Date.now());
  };

  const handleBackgroundImageSelect = (IMAGE) => {
    setBackgroundImageUrl(IMAGE);
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
  }, [selectedTab, useAssets, groupedAssets]);

  const handleButtonClick = (asset) => {
    setSelectedMedia(asset.attributes);
    setSelectedButton(asset.id); // Update the selected button state
    setPlayerKey(Date.now()); // Reset the playerKey to force re-render of the player
  };

  const handleColorChange = ({ Primary, Secondary }) => {
    setUserColors([Primary, Secondary]);
  };

  return (
    <>
      <Grid>
        <Grid.Col md={1} lg={7}>
          <LiveDemoPreviewer
            playerKey={playerKey}
            AccountData={AccountData}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            selectedMedia={selectedMedia}
            userColors={userColors}
            logoUrl={logoUrl}
            selectedTemplate={selectedTemplate}
            BackgroundImageUrl={BackgroundImageUrl}
          />
        </Grid.Col>
        <Grid.Col md={1} lg={5}>
          <LiveDemoControls
            onImageSelect={handleImageSelect}
            onBackgroundImageSelect={handleBackgroundImageSelect}
            onColorChange={handleColorChange}
            groupedAssets={groupedAssets[selectedTab]}
            handleButtonClick={handleButtonClick}
            selectedButton={selectedButton}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
          <Text
            align="center"
            sx={{
              "@media (max-width: 48em)": {
                textAlign: "center",
              },
            }}
          >
            <Link href="/sign-up">
              <a
                className="btn btn-secondary"
                onClick={() =>
                  trackButtonClick("Campaign Header CTA Click SIGN UP")
                }
              >
                Start Your Free Trial!
              </a>
            </Link>
          </Text>
        </Grid.Col>
      </Grid>
    </>
  );
};

/************************************************************ */
// GRID SECTIONS
/************************************************************ */
const LiveDemoControls = ({
  groupedAssets,
  handleButtonClick,
  onImageSelect,
  onBackgroundImageSelect,
  onColorChange,
  selectedButton,
  selectedTemplate,
  setSelectedTemplate,
}) => (
  <>
    <Space h={35} />
    <GradientTitle size={"h4"} title={"Fixtura Options"} ta={"right"} />
    <Paper {...sharedPaperStyles}>
      <TemplateSelection
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
      />
      <AssetSelection
        groupedAssets={groupedAssets}
        handleButtonClick={handleButtonClick}
        selectedButton={selectedButton}
      />
    </Paper>
    <GradientTitle size={"h4"} ta={"right"} title={"About your club"} />
    <Paper {...sharedPaperStyles}>
      <ColorPickerSection onColorChange={onColorChange} />
      <ImageUploaderSection onImageSelect={onImageSelect} />
      <BackgroundImageSelection
        onBackgroundImageSelect={onBackgroundImageSelect}
      />
    </Paper>
    <InfoPaper
      icon={<IconAlertCircle size={"3em"} style={{ marginRight: "10px" }} />}
    >
      Looking for something more personalized? Contact us to integrate your own
      designs into Fixtura and enhance your club's uniqueness.
    </InfoPaper>
  </>
);

const LiveDemoPreviewer = ({
  playerKey,
  AccountData,
  selectedTab,
  setSelectedTab,
  selectedMedia,
  userColors,
  logoUrl,
  selectedTemplate,
  BackgroundImageUrl,
}) => (
  <>
    <MediaTabs
      key={playerKey}
      AccountData={AccountData}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      selectedMedia={selectedMedia}
      userColors={userColors}
      userlogoUrl={logoUrl}
      selectedTemplate={selectedTemplate}
      BackgroundImageUrl={BackgroundImageUrl}
    />
    <InfoPaper
      icon={<IconShieldOff size={"3em"} style={{ marginRight: "10px" }} />}
    >
      Demo content blends international teams with your club's details for
      illustrative purposes only. The write-ups are examples from the real
      world, modified for privacy by removing names and teams.
    </InfoPaper>
  </>
);

/************************************************************ */
// Refactored Components:
/************************************************************ */
const TemplateSelection = ({ selectedTemplate, setSelectedTemplate }) => {
  const templates = [
    {
      value: "Basic Square",
      templateData: {
        Template: "Basic",
        TemplateVariation: { borderRadius: "0px" },
        label: "Basic Square",
      },
    },
    {
      value: "Basic Rounded",
      templateData: {
        Template: "Basic",
        TemplateVariation: { borderRadius: "10px" },
        label: "Basic Rounded",
      },
    },
    {
      value: "Basic Pill",
      templateData: {
        Template: "Basic",
        TemplateVariation: { borderRadius: "50px" },
        label: "Basic Pill",
      },
    },
    {
      value: "CNSW Blank",
      templateData: {
        Template: "CNSW",
        TemplateVariation: { Background: null },
        label: "CNSW Blank",
      },
    },
    {
      value: "CNSW with Gradient",
      templateData: {
        Template: "CNSW",
        TemplateVariation: { Background: "Gradient" },
        label: "CNSW with Gradient",
      },
    },
    {
      value: "CNSW with Image",
      templateData: {
        Template: "CNSW",
        TemplateVariation: { Background: "Image" },
        label: "CNSW with Image",
      },
    },
  ];

  const handleSelectChange = (value) => {
    //console.log(value);
    const selectedOption = templates.find(
      (template) => template.value === value
    );
    if (selectedOption) {
      //console.log("selectedOption.templateData ", selectedOption.templateData);
      setSelectedTemplate(selectedOption.templateData);
    }
  };

  // Determine the current value for the Select component
  const currentValue = templates.find(
    (template) => template.templateData.label === selectedTemplate.label
  )?.value;

  return (
    <>
      <TitleWithTooltip
        title={"Templates"}
        tooltipLabel="Choose a template to preview."
      />
      <Paper
        p={0}
        withBorder
        shadow="lg"
        style={{ backgroundColor: "#dee2e6" }}
      >
        <Select
          label=""
          value={currentValue}
          onChange={handleSelectChange}
          data={templates.map((template) => ({
            value: template.value,
            label: template.templateData.label,
          }))}
        />
      </Paper>
      <Space h={20} />
    </>
  );
};

const AssetSelection = ({
  groupedAssets,
  handleButtonClick,
  selectedButton,
}) => {
  const assetOptions = groupedAssets?.map((asset) => ({
    value: asset.id,
    label: asset.attributes.Name,
  }));

  const handleSelectChange = (value) => {
    const selectedAsset = groupedAssets.find((asset) => asset.id === value);
    if (selectedAsset) {
      handleButtonClick(selectedAsset);
    }
  };

  return (
    <>
      <TitleWithTooltip
        title={"Asset types"}
        tooltipLabel="Pick a content category, such as Weekend Results or Top 5 Performances, to see a relevant preview."
      />
      <Paper
        p={0}
        withBorder
        shadow="lg"
        style={{ backgroundColor: "#dee2e6" }}
      >
        <Select
          value={selectedButton}
          onChange={handleSelectChange}
          data={assetOptions}
          placeholder="Select an asset"
        />
      </Paper>
      <Space h={20} />
    </>
  );
};

const BackgroundImageSelection = ({ onBackgroundImageSelect }) => {
  const [selectedBackground, setSelectedBackground] = useState(null);
  // Placeholder data for background images
  const backgroundImages = [
    {
      value: "Portrait",
      imageData: {
        url: "https://fixtura.s3.ap-southeast-2.amazonaws.com/0_D5_A3728_a27721699b.JPG", // Replace with actual URLs
        ratio: "portrait",
        height: 3640,
        width: 2427,
        label: "portrait",
      },
      label: "Portrait",
    },
    {
      value: "Landscape",
      imageData: {
        url: "https://fixtura.s3.ap-southeast-2.amazonaws.com/0_D5_A3161_406b9fd933.JPG", // Replace with actual URLs
        ratio: "landscape",
        height: 2667,
        width: 4000,
        label: "landscape",
      },
      label: "Landscape",
    },
    // Add more options as needed
  ];

  const handleSelectChange = (value) => {
    const selectedOption = backgroundImages.find(
      (image) => image.value === value
    );
    //console.log(selectedOption);
    if (selectedOption) {
      setSelectedBackground(selectedOption.imageData);
      onBackgroundImageSelect(selectedOption.imageData);
    } else {
      console.error("Selected background option not found:", value);
    }
  };

  // Determine the current value for the Select component
  const currentValue = backgroundImages.find(
    (image) => image.imageData.label === (selectedBackground?.label ?? "")
  )?.value;

  if (backgroundImages.length === 0) {
    return <div>No background images available</div>;
  }

  return (
    <>
      <TitleWithTooltip
        title={"Try a Background Image"}
        tooltipLabel="Choose a background image for preview."
      />
      <Paper
        p={0}
        withBorder
        shadow="lg"
        style={{ backgroundColor: "#dee2e6" }}
      >
        <Select
          label=""
          value={currentValue}
          onChange={handleSelectChange}
          data={backgroundImages.map((image) => ({
            value: image.value,
            label: image.label,
          }))}
          aria-label="Select a background image"
        />
      </Paper>
      <Space h={20} />
    </>
  );
};

/* const AssetSelection = ({
  groupedAssets,
  handleButtonClick,
  selectedButton,
}) => {
  // Update the buttons mapping to use the AssetButton component
  const buttons = groupedAssets?.map((asset) => (
    <AssetButton
      key={asset.id}
      asset={asset}
      isSelected={selectedButton === asset.id}
      onClick={() => handleButtonClick(asset)}
    />
  ));
  return (
    <>
      <TitleWithTooltip
        title={"Select an Asset"}
        tooltipLabel="Pick a content category, such as Weekend Results or Top 5 Performances, to see a relevant preview."
      />

      <Paper
        p={0}
        withBorder
        shadow="lg"
        style={{ backgroundColor: "#dee2e6" }}
      >
        <Button.Group orientation="vertical">{buttons}</Button.Group>
      </Paper>
      <Space h={20} />
    </>
  );
}; 
const AssetButton = ({ asset, isSelected, onClick }) => {
  return (
    <Button
      variant="filled"
      onClick={onClick}
      color={isSelected ? "blue" : "gray.5"}
      rightIcon={
        isSelected ? <IconCircleCheck size={24} /> : <IconCircle size={24} />
      }
      styles={{ ...sharedButtonStyles }}
    >
      {asset.attributes.Name}
    </Button>
  );
};
*/

// UTILS
const TitleWithTooltip = ({ title, tooltipLabel }) => (
  <Group position="apart">
    {/* <GradientTitle size={"h3"} title={title} /> */}
    <P Weight={800} color={"gray.8"}>
      {title}
    </P>
    <Tooltip
      multiline
      width={220}
      label={tooltipLabel}
      color="blue"
      withArrow
      arrowPosition="center"
    >
      <Box>
        <IconQuestionCircle color="gray" />
      </Box>
    </Tooltip>
  </Group>
);

const InfoPaper = ({ children, icon, style }) => {
  return (
    <Paper
      p={10}
      my={10}
      withBorder
      style={{
        backgroundColor: "#dee2e6",
        display: "flex",
        alignItems: "center",
        ...style,
      }}
    >
      {icon}
      <P size={"xs"} marginBottom={0} style={{ flex: 1 }}>
        {children}
      </P>
    </Paper>
  );
};

const ColorPickerSection = ({ onColorChange }) => {
  return (
    <>
      <TitleWithTooltip
        title={"Club Colors"}
        tooltipLabel={
          "Adjust the color scheme of the assets to match your club's official branding."
        }
      />
      <ColorPickerComponent onColorChange={onColorChange} />
    </>
  );
};

const ImageUploaderSection = ({ onImageSelect }) => {
  return (
    <>
      <TitleWithTooltip
        title={"Change Logo"}
        tooltipLabel={
          "Upload your club's logo to see it seamlessly integrated into the assets. Uploads are not saved"
        }
      />
      <ImageUploader onImageSelect={onImageSelect} />
      <Space h={20} />
    </>
  );
};
