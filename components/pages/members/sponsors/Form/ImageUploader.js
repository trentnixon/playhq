import { Box, Group, List, Text, ThemeIcon } from '@mantine/core';
import { IconUpload, IconCircleCheck } from '@tabler/icons';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { useUploadImageViaDropzone } from '../../../../../Hooks/useUploadViaDropzone';
import { useEffect, useState } from 'react';
import { BTN_ONCLICK } from '../../../../Members/Common/utils/Buttons';
import { P, SubHeaders } from '../../../../Members/Common/Type';
import { IconError404 } from '@tabler/icons-react';

/*
  !IMOPORTANT!
  THIS FILE NEEDS TO BE MOVED TO A UTILS FOLDER

*/

export function StrapiImageUploader({ setLogo, setLogoPath, SAVEDLOGO }) {
  //const theme = useMantineTheme();
  // useSTate
  const [ProcessingImage, setProcessingImage] = useState(false);
  const [rejected, setRejected] = useState(false);
  // Hooks
  const [DropZoneImage, UploadDropZoneImage] = useUploadImageViaDropzone();

  // FUNC
  const handleFileUpload = _FILE => {
    //console.log(_FILE);
    UploadDropZoneImage(_FILE);
    setProcessingImage(true);
    //setCloseDisabled(true);
  };

  useEffect(() => {
    //console.log("DropZoneImage", DropZoneImage);
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
      sx={theme => ({
        textAlign: 'center',
      })}
    >
      <Dropzone
        onDrop={files => handleFileUpload(files)}
        onReject={files => {
          setRejected(true);
          //console.log("rejected files", files);
        }}
        maxSize={10 * 1024 ** 2}
        accept={[MIME_TYPES.jpeg, MIME_TYPES.png, MIME_TYPES.gif]}
        multiple={false}
        loading={ProcessingImage}
      >
        <Group
          position='center'
          spacing='xl'
          style={{ minHeight: 220, pointerEvents: 'none' }}
        >
          <Dropzone.Idle>
            <IconUpload />
          </Dropzone.Idle>

          <div>
            <Text size='xl' inline>
              Select a file
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
export default StrapiImageUploader;
const RejectedFiles = ({ rejected, setRejected }) => {
  //console.log(rejected[0].errors);
  return (
    <>
      <SubHeaders ICON={<IconError404 size={30} />}>ERROR!</SubHeaders>

      <P>
        The following errors occurred whilst attempting to upload your image.
      </P>

      <List
        size='lg'
        withPadding
        center
        icon={
          <ThemeIcon color='red' size={24} radius='xl'>
            <IconCircleCheck size={16} />
          </ThemeIcon>
        }
        style={{
          margin: '2em 0',
        }}
      >
        {rejected[0].errors.map((err, i) => {
          return <List.Item key={i}>{err.message}</List.Item>;
        })}
      </List>

      <BTN_ONCLICK
        HANDLE={() => {
          setRejected(false);
        }}
        LABEL='Retry'
      />
    </>
  );
};
