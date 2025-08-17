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
} from '@mantine/core';

import { BTN_ONCLICK } from '../../../utils/Buttons';
import { IconCircleCheck, IconEditCircle } from '@tabler/icons';

import { P } from '../../../Type';
import { IconEdit } from '@tabler/icons-react';
import { FindAccountLabel } from '../../../../../../lib/actions';
import { useMediaQuery } from '@mantine/hooks';

export const DisplayCustomTheme = props => {
  const { GetElement, userAccount, StoreUSerChange, setCreateNew } = props;

  //useEffect(()=>{},[userAccount])

  const CTHEME = GetElement.filter(
    item => item.attributes.CreatedBy === userAccount.id
  );

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const swatches = ARR => {
    return ARR.map(color => (
      <ColorSwatch
        key={color}
        color={color}
        size={mobile ? 14 : 25}
        radius='xl'
      />
    ));
  };
  if (CTHEME.length === 0)
    return (
      <Paper
        radius='md'
        withBorder
        p='sm'
        mb={20}
        sx={theme => ({
          backgroundColor: theme.white,
        })}
      >
        <Group position='apart'>
          <P marginBottom={0}>Create your own Theme!</P>
          <BTN_ONCLICK
            LABEL={'Create New'}
            THEME={'success'}
            HANDLE={() => {
              setCreateNew(true);
            }}
          />
        </Group>
      </Paper>
    );
  return (
    <>
      <Table>
        <tbody>
          {CTHEME.map((item, i) => {
            return (
              <tr key={i} style={{}}>
                <td>
                  <Group position='center' spacing='xs'>
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
                        userAccount.attributes.theme.data.id === item.id ? 6 : 7
                      }
                    >{`${FindAccountLabel(userAccount)} `}</P>
                    {userAccount.attributes.theme.data.id === item.id ? (
                      <Center>
                        <IconCircleCheck color={theme.colors.green[5]} />
                      </Center>
                    ) : (
                      false
                    )}
                  </Group>
                </td>
                <td style={{ textAlign: 'right' }}>
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
