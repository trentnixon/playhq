import { Box, Group, Text, useMantineTheme } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons";
import {
  Dropzone,
  DropzoneProps,
  DropzoneStatus,
  MIME_TYPES,
} from "@mantine/dropzone";
import { useUploadImageViaDropzone } from "../../../Hooks/useUploadViaDropzone";
import { useEffect, useState } from "react";
import { BTN_ONCLICK } from "../../../components/Members/Common/utils/Buttons";

export function UploadSponsorsLogos({ setLogo, setLogoPath, SAVEDLOGO }) {
  const theme = useMantineTheme();
  // useSTate
  const [ProcessingImage, setProcessingImage] = useState(false);
  const [rejected, setRejected] = useState(false);
  // Hooks
  const [DropZoneImage, UploadDropZoneImage] = useUploadImageViaDropzone();

  // FUNC
  const handleFileUpload = (_FILE) => {
    console.log(_FILE);
    UploadDropZoneImage(_FILE);
    setProcessingImage(true);
    //setCloseDisabled(true);
  };

  useEffect(() => {
    console.log("DropZoneImage", DropZoneImage);
    if (DropZoneImage !== null) {
      setProcessingImage(false);
      setLogo(DropZoneImage[0].id);
      setLogoPath(DropZoneImage);
    }
  }, [DropZoneImage]);
  if (rejected)
    return <RejectedFiles setRejected={setRejected} rejected={rejected} />;
  return (
    <Box
      sx={(theme) => ({
        textAlign: "center",
      })}
    >
      <Dropzone
        onDrop={(files) => handleFileUpload(files)}
        onReject={(files) => {
          setRejected(files);
          console.log("rejected files", files);
        }}
        maxSize={10 * 1024 ** 2}
        accept={[MIME_TYPES.jpeg, MIME_TYPES.png, MIME_TYPES.gif]}
        multiple={false}
        loading={ProcessingImage}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: 220, pointerEvents: "none" }}
        >
          <Dropzone.Idle><IconUpload /></Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Click to select files
            </Text>
          </div>
        </Group>
      </Dropzone>
      {!SAVEDLOGO ? (
        false
      ) : (
        <BTN_ONCLICK
          LABEL={`Cancel`}
          THEME={`error`}
          HANDLE={() => {
            setLogoPath(SAVEDLOGO);
          }}
        />
      )}
    </Box>
  );
}

const RejectedFiles = ({ rejected, setRejected }) => {
  console.log(rejected[0].errors);
  return (
    <>
      <H3>ERROR!</H3>
      <P>
        The following errors occurred whilst attempting to upload your image.
      </P>
      <List
        size="lg"
        withPadding
        center
        icon={
          <ThemeIcon color="red" size={24} radius="xl">
            <IconCircleCheck size={16} />
          </ThemeIcon>
        }
        style={{
          margin: "2em 0",
        }}
      >
        {rejected[0].errors.map((err, i) => {
          return <List.Item>{err.message}</List.Item>;
        })}
      </List>

      <BTN_CREATE
        CALLBACK={() => {
          setRejected(false);
        }}
        LABEL="Retry"
      />
    </>
  );
};
