import { Button } from "@mantine/core";
import Link from "next/link";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
  standard: {
    borderColor: theme.colors.members[4],
    color: theme.colors.members[4],
    "&:hover": {
      backgroundColor: theme.colors.members[3],
      color: theme.colors.members[0],
      transition: "background-color 0.5s, color 0.5s",
    },
  },
  error: {
    borderColor: theme.colors.members[8],
    color: theme.colors.members[8],
    "&:hover": {
      backgroundColor: theme.colors.members[8],
      color: theme.colors.members[0],
      transition: "background-color 0.5s, color 0.5s",
    },
  },
  
  white: {
    borderColor: theme.colors.members[0],
    color: theme.colors.members[0],
    "&:hover": {
      backgroundColor: theme.colors.members[0],
      color: theme.colors.members[2],
      transition: "background-color 0.5s, color 0.5s",
    },
  },
  success: {
    borderColor: theme.colors.members[6],
    color: theme.colors.members[6],
    "&:hover": {
      backgroundColor: theme.colors.members[6],
      color: theme.colors.members[0],
      transition: "background-color 0.5s, color 0.5s",
    },
  },
  cta: {
    borderColor: theme.colors.members[3],
    color: theme.colors.members[3],
    "&:hover": {
      backgroundColor: theme.colors.members[3],
      color: theme.colors.members[0],
      transition: "background-color 0.5s, color 0.5s",
    },
  },
}));

/**
 * Generates a button component with the specified label, onClick handler, and theme.
 *
 * @param {Object} params - An object containing the LABEL, HANDLE, idDisabled, and THEME properties.
 * @return {JSX.Element} The button component with the specified properties.
 */
export const BTN_ONCLICK = ({
  LABEL,
  HANDLE,
  idDisabled = false,
  THEME = "standard",
}) => {
  const { classes } = useStyles();
  return (
    <Button
      type="button"
      variant="outline"
      onClick={HANDLE} 
      disabled={idDisabled}
      className={classes[THEME]}
    >
      {LABEL}
    </Button>
  );
};

export const BTN_TOINTERALLINK = ({
  LABEL,
  URL,
  idDisabled = false,
  THEME = "standard",
}) => {
  const { classes } = useStyles();
  return (
    <Link legacyBehavior href={URL} target="_blank">
      <Button
        disabled={idDisabled}
        variant="outline"
        className={classes[THEME]}
      >
        {LABEL}
      </Button>
    </Link>
  );
};

export const BTN_TOEXTLINK = ({
  LABEL,
  URL,
  idDisabled = false,
  THEME = "standard",
  target = "_blank",
}) => {
  const { classes } = useStyles();
  return (
    <Button
      component="a"
      target={target}
      rel="noopener noreferrer"
      href={URL}
      disabled={idDisabled}
      variant="outline"
      className={classes[THEME]}
    >
      {LABEL}
    </Button>
  );
};
