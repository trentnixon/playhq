// Example Player Dialog

import { Group, Modal, useMantineTheme } from '@mantine/core';
import { Player } from '@remotion/player';
import { useDisclosure } from '@mantine/hooks';
import { BTN_ONCLICK } from '../../../Members/Common/utils/Buttons';
import { P } from '../../../Members/Common/Type';

export const ExamplePlayerDialog = ({
  selectedTemplate,
  compositionLength,
  selectedDataset,
  VideoRatio,
}) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  return (
    <>
      <Group position='center'>
        <BTN_ONCLICK LABEL={'Video Preview'} HANDLE={toggle} THEME='standard' />{' '}
      </Group>
      <Modal
        opened={opened}
        withCloseButton={false}
        onClose={close}
        size='md'
        padding='xs'
        radius='md'
        centered
        overlayProps={{
          color: theme.colors.gray[9],
          opacity: 0.65,
          blur: 3,
        }}
        styles={{
          title: {
            color: theme.colors.gray[0],
          },

          content: { backgroundColor: theme.colors.gray[9] },
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '100%',
            margin: '0 auto',
            aspectRatio: `${VideoRatio.width} / ${VideoRatio.height}`,
            background: theme.colors.gray[9],
          }}
        >
          <Player
            component={selectedTemplate}
            durationInFrames={compositionLength}
            compositionWidth={VideoRatio.width}
            compositionHeight={VideoRatio.height}
            fps={VideoRatio.fps}
            inputProps={{
              data: selectedDataset,
            }}
            controls
            style={{
              width: '100%',
              height: '100%',
            }}
          />
          <div className='flex justify-center items-center py-2'>
            <P size='xs' color={4} textAlign='center' marginBottom='0'>
              Please Note: Real time Playback can be jumpy for some settings on
              some devices. We recommend using a desktop computer for the best
              experience.
            </P>
          </div>
        </div>
      </Modal>
    </>
  );
};
