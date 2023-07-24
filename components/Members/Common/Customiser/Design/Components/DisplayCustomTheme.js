import {
  ActionIcon,
  Center,
  ColorSwatch,
  Group,
  Paper,
  Space,
  Table,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";

import { BTN_ONCLICK } from "../../../utils/Buttons";
import { IconCircleCheck, IconEditCircle } from "@tabler/icons";

import { P } from "../../../Type";
import { IconEdit } from "@tabler/icons-react";
import { FindAccountLabel } from "../../../../../../lib/actions";

export const DisplayCustomTheme = (props) => {
  const { GetElement, userAccount, StoreUSerChange, setCreateNew } = props;

  
  //useEffect(()=>{},[userAccount])

  const CTHEME = GetElement.filter(
    (item) => item.attributes.CreatedBy === userAccount.id
  );

  console.log(CTHEME);
  const theme = useMantineTheme();
  const swatches = (ARR) => {
    return ARR.map((color) => (
      <ColorSwatch key={color} color={color} size={15} radius="sm" />
    ));
  };
  if (CTHEME.length === 0)
    return (
      <Paper
        radius="md"
        shadow="lg"
        withBorder
        p="sm"
        my={20}
        sx={(theme) => ({
          backgroundColor: theme.white,
          backgroundColor: theme.colors.members[1],
        })}
      >
        <Group position="apart">
          <P marginBottom={0} Copy={`Create your own Theme!`} />
          <BTN_ONCLICK
            LABEL={"Create New"}
            THEME={"success"}
            HANDLE={() => {
              setCreateNew(true);
            }}
          />
        </Group>
      </Paper>
    );
  return (
    <>
      {/* <SubHeaders Copy={`Your Custom Theme`} /> */}

      <Table>
        <tbody>
          {CTHEME.map((item, i) => {
            return (
              <tr key={i} style={{}}>
                <td>
                  <Group position="center" spacing="xs">
                    {swatches([
                      item.attributes.Theme.primary,
                      item.attributes.Theme.secondary,
                    ])}
                  </Group>
                </td>

                <td>
                  <Group>
                    <P
                      marginBottom={0}
                      color={
                        userAccount.attributes.theme.data.id === item.id ? 2 : 2
                      }
                      Copy={`${FindAccountLabel(userAccount)} `}
                    />
                    {userAccount.attributes.theme.data.id === item.id ? (
                      <Center>
                        <IconCircleCheck color={theme.colors.green[5]} />
                      </Center>
                    ) : (
                      false
                    )}
                  </Group>
                </td>
                <td style={{textAlign:'right'}}>
                  {userAccount.attributes.theme.data.id === item.id ? (
                    <BTN_ONCLICK
                      HANDLE={() => {
                        setCreateNew(true);
                      }}
                      LABEL={`Edit`}
                    />
                  ) : (
                  
                      <BTN_ONCLICK
                        HANDLE={() => {
                          StoreUSerChange(item);
                        }}
                        LABEL={`Select Theme`}
                      />
                   
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Space h={50} />
    </>
  );
};
