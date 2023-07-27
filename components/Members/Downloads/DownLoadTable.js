import { useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  Button,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { BTN_TOEXTLINK } from "../Common/utils/Buttons";
import {
  IconCalendarDue,
  IconCalendarStats,
  IconDownload,
  IconScoreboard,
} from "@tabler/icons-react";
import Cookies from "js-cookie";
import { IconIdBadge2 } from "@tabler/icons-react";
import { ShadowWrapper } from "../Common/Containers";
import {
  FormattDateFormDownloadTable,
  orderedArray,
} from "../../Downloads/helpers";
import { useAccountDetails } from "../../../lib/userContext";
const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
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
    <ShadowWrapper>
      <ScrollArea
        sx={{ minheight: 1000 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table sx={{ minWidth: 700 }}>
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>
                <Tooltip
                  label="Render ID"
                  color={theme.colors.cyan[3]}
                  position="bottom-start"
                  withArrow
                >
                  <IconIdBadge2 size="1.5rem" color={theme.colors.cyan[5]} />
                </Tooltip>
              </th>
              <th>
                <Tooltip
                  label="Date Created"
                  color={theme.colors.cyan[3]}
                  position="bottom-start"
                  withArrow
                >
                  <IconCalendarStats
                    size="1.5rem"
                    color={theme.colors.cyan[5]}
                  />
                </Tooltip>
              </th>
              <th>
                <Tooltip
                  label="Media Downloads"
                  color={theme.colors.cyan[3]}
                  position="bottom-start"
                  withArrow
                >
                  <IconDownload size="1.5rem" color={theme.colors.cyan[5]} />
                </Tooltip>
              </th>
              <th>
                <Tooltip
                  label="Fixture Results"
                  color={theme.colors.cyan[3]}
                  position="bottom-start"
                  withArrow
                >
                  <IconScoreboard size="1.5rem" color={theme.colors.cyan[5]} />
                </Tooltip>
              </th>
              <th>
                <Tooltip
                  label="Upcoming Fixture"
                  color={theme.colors.cyan[3]}
                  position="bottom-start"
                  withArrow
                >
                  <IconCalendarDue size="1.5rem" color={theme.colors.cyan[5]} />
                </Tooltip>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </ShadowWrapper>
  );
}

const TableRow = ({ row, Token }) => {
  const { account } = useAccountDetails();

  return (
   
    <tr key={row.name}>
      <td>{row.Name}</td>
      <td>{FormattDateFormDownloadTable(row.createdAt)}</td>
      <td>{row.downloads}</td>
      <td>{row.game_results_in_renders}</td>
      <td>{row.upcoming_games_in_renders}</td>
      <td>
        <BTN_TOEXTLINK
          LABEL="Visit"
          URL={`https://content.fixtura.com.au/${account.id}/${
            row.id
          }?token=${Token}`}
          THEME="cta"
        />
      </td>
    </tr>
  );
};
