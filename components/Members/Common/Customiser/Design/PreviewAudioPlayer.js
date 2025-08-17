import { useEffect, useRef, useState } from 'react';
import {
  ActionIcon,
  Group,
  Paper,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { IconSquareX } from '@tabler/icons';
import { P } from '../../Type';
import {
  IconEyePause,
  IconPlayerPause,
  IconPlayerPlay,
} from '@tabler/icons-react';

const audioStyles = {
  width: '100%',
  backgroundColor: 'white',
  borderRadius: '5px',
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
};

const playButtonStyles = {
  cursor: 'pointer',
  marginRight: '10px',
};

const progressBarStyles = {
  flex: 1,
  height: '15px',
  borderRadius: '5px',
  background: '#DEE2E6',
};

export const PreviewAudioPlayer = ({ currentSong, DeSelectAudio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioElem = useRef(null);
  const theme = useMantineTheme();

  useEffect(() => {
    if (audioElem.current) {
      audioElem.current.src = currentSong.attributes.URL;
      audioElem.current.load();
      audioElem.current.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

  useEffect(() => {
    const updateProgress = () => {
      if (audioElem.current) {
        setProgress(
          (audioElem.current.currentTime / audioElem.current.duration) * 100
        );
      }
    };

    if (audioElem.current) {
      audioElem.current.addEventListener('timeupdate', updateProgress);
    }

    // Cleanup
    return () => {
      if (audioElem.current) {
        audioElem.current.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioElem.current.pause();
    } else {
      audioElem.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Paper
      radius='md'
      shadow='md'
      withBorder
      mb={20}
      p='xs'
      sx={theme => ({
        backgroundColor: theme.colors.white,
      })}
    >
      <Group position='apart' my={0}>
        <P
          marginBottom={0}
          size='md'
          textTransform='uppercase'
          color={6}
          fontStyle='italic'
        >
          {`Preview  : ${currentSong.attributes.Name}`}
        </P>
        <Tooltip label='Close Player' color='cyan.5' withArrow>
          <ActionIcon
            onClick={() => {
              DeSelectAudio();
            }}
          >
            <IconSquareX color={theme.colors.red[6]} />
          </ActionIcon>
        </Tooltip>
      </Group>

      <div style={audioStyles}>
        <div style={playButtonStyles} onClick={togglePlayPause}>
          {isPlaying ? (
            <IconPlayerPause color={theme.colors.gray[7]} />
          ) : (
            <IconPlayerPlay color={theme.colors.green[5]} />
          )}
        </div>
        <div style={progressBarStyles}>
          <div
            style={{
              width: `${progress}%`,
              background: theme.colors.blue[5],
              height: '100%',
              borderRadius: '5px',
            }}
          ></div>
        </div>
      </div>
      <audio ref={audioElem} style={{ display: 'none' }} />
    </Paper>
  );
};
