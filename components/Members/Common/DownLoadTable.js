import { useState } from "react";
import { createStyles, Table, ScrollArea, Button } from "@mantine/core";
import { BTN_TOEXTLINK } from "./utils/Buttons";
import { IconDownload } from "@tabler/icons";

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

export function DownloadTable({ data }) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const FormattDate = (formattDate) => {
    const dateString = formattDate;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return formattedDate;
  };

  const orderedArray = (array) => {
    const orderedArray = array.sort((a, b) => {
      const dateA = new Date(a.attributes.createdAt);
      const dateB = new Date(b.attributes.createdAt);
      return dateB - dateA;
    });
    return orderedArray;
  };

  
  const rows = orderedArray(data).map((row) => (
   
    <tr key={row.name}>
      <td><IconDownload /></td>
      <td>{row.attributes.Name}</td>
      <td>{row.attributes.downloads.data.length}</td>
      <td>{FormattDate(row.attributes.createdAt)}</td>
      <td>
        <BTN_TOEXTLINK LABEL="Download" URL={row.attributes.zipLocation} THEME='cta' />
      </td>
    </tr>
  ));

  return (
    <ScrollArea
      sx={{ minheight: 1000 }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ minWidth: 700 }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th></th>
            <th>Name</th>
            <th>FIles</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
