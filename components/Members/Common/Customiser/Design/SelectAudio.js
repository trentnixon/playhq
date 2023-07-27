import { useEffect, useRef, useState } from "react";
import { FixturaLoading } from "../../Loading";
import dynamic from "next/dynamic";

import {
  ActionIcon,
  Center,
  Group,
  Paper,
  Table,
  useMantineTheme,
} from "@mantine/core";
import {
  useAssignDesignElement,
  useGETDesignElement,
} from "../../../../../Hooks/useCustomizer";
import { BTN_ONCLICK } from "../../utils/Buttons";
import {
  IconCircleCheck,
  IconVolume,
  IconEar,
  IconEarOff,
  IconSquareX,
} from "@tabler/icons";
import { useAccountDetails } from "../../../../../lib/userContext";
import { P, SubHeaders } from "../../Type";
import { FixturaDivider } from "../../Divider";

export const SelectAudio = ({ isPlaying }) => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setuserAccount] = useState(account);
  const [loading, setLoading] = useState(false);
  const theme = useMantineTheme();
  // Assign Hook
  const [DesignElement, CreateDesignElement] = useAssignDesignElement();
  const [GetElement, FetchElement] = useGETDesignElement();

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlayer, setIsPlayer] = useState(false);

  /*
  Audio
*/

  const SelectAudio = (URL) => {
    setCurrentSong(URL);
    setIsPlayer(true);
  };

  const DeSelectAudio = () => {
    setCurrentSong(null);
    setIsPlayer(false);
  };

  // check if the Remotion Player is playing
  useEffect(() => {
    isPlaying ? DeSelectAudio() : false;
  }, [isPlaying]);

  // Fetch Design Element
  useEffect(() => {
    FetchElement({ COLLECTIONID: "audio-options" });
  }, []);

  // Set SET ACCOUNT DATA
  useEffect(() => {
    setuserAccount(account);
    setLoading(false);
  }, [account]);

  // Fire HOOK to sotre new Design Element to user
  const StoreUSerChange = (item) => {
    const OBJ = {
      CollectionSaveTo: "accounts",
      Body: [item.id],
      COLLECTIONID: userAccount.id,
      RelationProperty: "audio_option",
    };
    setLoading(true);
    CreateDesignElement(OBJ);
  };

  // change UI on return Value
  useEffect(() => {
    ReRender();
  }, [DesignElement]);

  useEffect(() => {}, [currentSong]);

  if (
    loading ||
    GetElement === true ||
    GetElement === null ||
    userAccount === false
  ) {
    return <FixturaLoading />;
  }

  return (
    <>
      <SubHeaders Copy={`Set the Tone`} />
      <P Copy={`Choose the Perfect Audio to Add Extra Excitement to Your Videos and Images. Preview and select from our collection of audio tracks that resonate with your club's personality and complement your content.`} />
      <Paper
        radius="md"
        shadow="md"
        withBorder
        p="lg"
        sx={(theme) => ({
          backgroundColor: theme.white,
        })}
      >
        <Table>
          <tbody>
            {GetElement.map((item, i) => {
              return (
                <tr key={i}>
                  <td>
                    <Group>
                      {isPlaying ? (
                        <IconEarOff color={theme.colors.green[5]} />
                      ) : (
                        <Center>
                          {item.id === currentSong?.id ? (
                            <IconVolume color={theme.colors.blue[9]} />
                          ) : (
                            <ActionIcon
                              color="gray.5"
                              size="lg"
                              onClick={() => {
                                SelectAudio(item);
                              }}
                            >
                              <IconEar />
                            </ActionIcon>
                          )}
                        </Center>
                      )}
                      <P
                        marginBottom={0}
                        color={
                          userAccount.attributes.audio_option.data.id ===
                          item.id
                            ? 2
                            : 2
                        }
                        Copy={item.attributes.Name}
                      />
                    </Group>
                  </td>

                  <td style={{ textAlign: "right" }}>
                    {userAccount.attributes.audio_option.data.id === item.id ? (
                      <IconCircleCheck color={theme.colors.green[5]} />
                    ) : (
                      <BTN_ONCLICK
                        HANDLE={() => {
                          StoreUSerChange(item);
                        }}
                        LABEL={`Select`}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {isPlayer ? (
          <Player currentSong={currentSong} DeSelectAudio={DeSelectAudio} />
        ) : (
          false
        )}
      </Paper>
      <FixturaDivider />
    </>
  );
};

const Player = ({ currentSong, DeSelectAudio }) => {
  const audioElem = useRef();
  const theme = useMantineTheme();
  useEffect(() => {
    audioElem.current.src = currentSong.attributes.URL;
    audioElem.current.load();
    audioElem.current.play();
  }, [currentSong]);

  return (
    <Paper
      radius="md"
      shadow="md"
      withBorder
      my={20}
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colors.dark[4],
      })}
    >
      <Group position="apart" my={10} sx={(theme) => ({})}>
        <P
          marginBottom={0}
          size="lg"
          textTransform="uppercase"
          Copy={`Now Playing: ${currentSong.attributes.Name}`}
          color={0}
          fontStyle="italic"
        />

        <ActionIcon
          onClick={() => {
            DeSelectAudio();
          }}
        >
          <IconSquareX color={theme.colors.red[6]} />
        </ActionIcon>
      </Group>

      <audio ref={audioElem} controls />
    </Paper>
  );
};
