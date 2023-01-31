import {
  ActionIcon,
  Center,
  ColorSwatch,
  Group,
  Paper,
  Space,
  Table,
  useMantineTheme,
} from "@mantine/core";

import { BTN_ONCLICK } from "../../../utils/Buttons";
import { IconCircleCheck, IconEditCircle } from "@tabler/icons";

import { P, SubHeaders } from "../../../Type";


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
      <SubHeaders Copy={`Your Custom Theme`} />

      <Table>
        <tbody>
          {CTHEME.map((item, i) => {
            return (
              <tr
                key={i}
                style={{
                  backgroundColor:
                    userAccount.attributes.theme.data.id === item.id
                      ? theme.colors.blue[8]
                      : theme.colors.members[0],
                }}
              >
                <td>
                  <Group>
                    <ActionIcon
                      onClick={() => {
                        setCreateNew(true);
                      }}
                    >
                      <IconEditCircle color={theme.colors.green[5]} />
                    </ActionIcon>
                    <P
                      marginBottom={0}
                      color={
                        userAccount.attributes.theme.data.id === item.id ? 0 : 2
                      }
                      Copy={item.attributes.Name}
                    />
                  </Group>
                </td>
                <td>
                  <Group position="center" spacing="xs">
                    {swatches([
                      item.attributes.Theme.primary,
                      item.attributes.Theme.secondary,
                    ])}
                  </Group>
                </td>
                <td>
                  {userAccount.attributes.theme.data.id === item.id ? (
                    <Center>
                      <IconCircleCheck color={theme.colors.gray[2]} />
                    </Center>
                  ) : (
                    <Center>
                      <BTN_ONCLICK
                        HANDLE={() => {
                          StoreUSerChange(item);
                        }}
                        LABEL={`Select Theme`}
                      />
                    </Center>
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
