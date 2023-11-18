import { Group, Image, Paper, Select, SimpleGrid, Switch } from "@mantine/core";
import { useEffect, useState } from "react";
import { BTN_ONCLICK } from "../Common/utils/Buttons";
import ImageMarker from "react-image-marker";
import { P } from "../Common/Type";
import { IconTarget } from "@tabler/icons-react";

// TitleInput Component
const TitleInput = ({ value, onChange }) => (
  <Group my={5}>
    <input
      type="text"
      className="form-control"
      placeholder={"Title"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </Group>
);

// AgeGroupSelect Component
const AgeGroupSelect = ({ value, onChange }) => (
  <Group my={5}>
    <Select
      style={{
        width: "100%",
      }}
      size="md"
      label="Is this image particularly suited for seniors, juniors, or both?"
      placeholder="Select Age Group"
      value={value}
      onChange={onChange}
      data={[
        { value: "Seniors", label: "Seniors" },
        { value: "Juniors", label: "Juniors" },
        { value: "Both", label: "Both" },
      ]}
    />
  </Group>
);

// AssetTypeSelect Component
const AssetTypeSelect = ({ value, onChange }) => (
  <Group my={5}>
    <Select
      style={{
        width: "100%",
      }}
      size="md"
      label="Would you like to assign this image to a specific asset type, or should it be included in all types?"
      placeholder="Select Asset Type"
      value={value}
      onChange={onChange}
      data={[
        "ALL",
        "Upcoming Fixtures",
        "Weekend Results",
        "Top 5 Run Scorers",
        "Top 5 Bowlers",
        "League Tables",
        "Team List",
      ].map((type) => ({ value: type, label: type }))}
    />
  </Group>
);

// DetailsForm Component
export const DetailsForm = ({
  initialData,
  onSubmit,
  resetForm,
  ImagePath,
}) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [AgeGroup, setAgeGroup] = useState(initialData.AgeGroup || "Both");
  const [AssetType, setAssetType] = useState(initialData.AssetType || "ALL");
  const [markerPosition, setMarkerPosition] = useState([]);

  const handleAddMarker = (marker) => {
    console.log(marker);
    setMarkerPosition([marker]); // Ensure it's an array
  };

  const handleSubmit = () => {
    const isActive = true; // Replace with a checkbox or toggle switch if needed
    onSubmit(title, isActive, AgeGroup, AssetType, markerPosition);
    resetForm();
  };

  return (
    <>
      <SimpleGrid
        breakpoints={[
          { minWidth: "sm", cols: 1 },
          { minWidth: "md", cols: 2 },
        ]}
      >
        {/* Image and Paper Components */}
        <Paper shadow="xs" p="md" withBorder>
          <ImageMarker
            src={ImagePath[0].url}
            markers={markerPosition}
            onAddMarker={handleAddMarker}
            width={"100%"}
          />
          <Group noWrap>
            <IconTarget size={40} style={{ marginRight: "5px" }} />
            <P size={"xs"} marginBottom={0}>
              Please click on the image to mark the focus point. This will help
              identify players or key items in your videos and graphics.
            </P>
          </Group>
          {/* <Image src={ImagePath[0].url} width={"100%"} radius={5} /> */}
        </Paper>
        <Paper p="md">
          <TitleInput value={title} onChange={setTitle} />
          <AgeGroupSelect value={AgeGroup} onChange={setAgeGroup} />
          <AssetTypeSelect value={AssetType} onChange={setAssetType} />
          <Group my={5} position="right">
            <BTN_ONCLICK
              HANDLE={handleSubmit}
              LABEL={"Submit Details"}
              THEME="cta"
            />
          </Group>
        </Paper>
      </SimpleGrid>
    </>
  );
};

// EditDetailsForm Component
export const EditDetailsForm = ({
  initialData,
  onSubmit,
  resetForm,
  imageDetails,
}) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [isActive, setIsActive] = useState(initialData.isActive || false);
  const [AgeGroup, setAgeGroup] = useState(initialData.AgeGroup || "Both");
  const [AssetType, setAssetType] = useState(initialData.AssetType || "ALL");

  useEffect(() => {
    if (imageDetails) {
      setTitle(imageDetails.title);
      if ("isActive" in imageDetails) setIsActive(imageDetails.isActive);
    }
  }, [imageDetails]);

  const handleSubmit = () => {
    onSubmit(title, isActive, AgeGroup, AssetType);
    resetForm();
  };

  return (
    <>
      <Paper p="md">
        <TitleInput value={title} onChange={setTitle} />
        <AgeGroupSelect value={AgeGroup} onChange={setAgeGroup} />
        <AssetTypeSelect value={AssetType} onChange={setAssetType} />
        <Group my={5} position="right">
          <label>Active:</label>
          <Switch
            checked={isActive}
            onChange={(event) => setIsActive(event.currentTarget.checked)}
          />
        </Group>
        <Group my={5} position="right">
          <BTN_ONCLICK
            HANDLE={handleSubmit}
            LABEL={"Update Image"}
            THEME="cta"
          />
        </Group>
      </Paper>
    </>
  );
};
