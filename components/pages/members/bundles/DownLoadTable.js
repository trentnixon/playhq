import { useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { BTN_TOEXTLINK } from '../../../Members/Common/utils/Buttons';
import {
  IconCalendarDue,
  IconCalendarStats,
  IconDownload,
  IconScoreboard,
} from '@tabler/icons-react';
import { IconIdBadge2 } from '@tabler/icons-react';
import {
  FormattReadableDateFormDownloadTable,
  isBefore2024,
  orderedArray,
} from '../../../../utils/helpers';
import { useAccountDetails } from '../../../../context/userContext';
import { FixturaLoading } from '../../../Members/Common/Loading';
const useStyles = createStyles(theme => ({
  header: {
    position: 'sticky',
    top: 0,
    textAlign: 'center',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },
  row: {
    textAlign: 'left',
  },
  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export function DownloadTable({ data, Token }) {
  const theme = useMantineTheme();

  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const rows = orderedArray(data).map((row, i) => (
    <TableRow key={i} row={row} Token={Token} />
  ));

  return (
    <>
      <ScrollArea
        sx={{ minheight: 1000 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table sx={{ minWidth: 700 }}>
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr className={cx(classes.row)}>
              <th className={cx(classes.row)}>
                <Tooltip
                  label='Render ID'
                  color={theme.colors.cyan[3]}
                  position='bottom-start'
                  withArrow
                >
                  <IconIdBadge2 size='1.5rem' color={theme.colors.cyan[5]} />
                </Tooltip>
              </th>
              <th className={cx(classes.row)}>
                <Tooltip
                  label='Date Created'
                  color={theme.colors.cyan[3]}
                  position='bottom-start'
                  withArrow
                >
                  <IconCalendarStats
                    size='1.5rem'
                    color={theme.colors.cyan[5]}
                  />
                </Tooltip>
              </th>
              <th>
                <Tooltip
                  label='Media Downloads'
                  color={theme.colors.cyan[3]}
                  position='bottom-start'
                  withArrow
                >
                  <IconDownload size='1.5rem' color={theme.colors.cyan[5]} />
                </Tooltip>
              </th>
              <th>
                <Tooltip
                  label='Fixture Results'
                  color={theme.colors.cyan[3]}
                  position='bottom-start'
                  withArrow
                >
                  <IconScoreboard size='1.5rem' color={theme.colors.cyan[5]} />
                </Tooltip>
              </th>
              <th>
                <Tooltip
                  label='Upcoming Fixture'
                  color={theme.colors.cyan[3]}
                  position='bottom-start'
                  withArrow
                >
                  <IconCalendarDue size='1.5rem' color={theme.colors.cyan[5]} />
                </Tooltip>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
}

const TableRow = ({ row, Token }) => {
  const { account } = useAccountDetails();
  const { classes, cx } = useStyles();
  const disableLink = isBefore2024(row.createdAt);
  return (
    <tr key={row.name} className={cx(classes.row)}>
      <td>{row.Processing ? <FixturaLoading /> : row.Name}</td>
      <td>{FormattReadableDateFormDownloadTable(row.createdAt)}</td>
      <td>{row.Processing ? '0' : row.downloads}</td>
      <td>{row.Processing ? '0' : row.game_results_in_renders}</td>
      <td>{row.Processing ? '0' : row.upcoming_games_in_renders}</td>
      <td>
        {row.Complete && !disableLink ? (
          <BTN_TOEXTLINK
            LABEL='Download'
            URL={`https://contentv2.fixtura.com.au/${
              account.id
            }/${account.attributes.Sport.toLowerCase()}/${
              row.id
            }?token=${Token}`}
            THEME='cta'
          />
        ) : (
          <BTN_TOEXTLINK LABEL='Unavailable' idDisabled={true} THEME='cta' />
        )}
      </td>
    </tr>
  );
};
