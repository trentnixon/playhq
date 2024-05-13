import { Box, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/styles";
import { IconUpload } from "@tabler/icons";
import { P } from "../../../../../Members/Common/Type";

export const NewLogoCopy = ({ org }) => {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    return (
      <Group position="center">
        <IconUpload size={"4em"} color={theme.colors.blue[5]} />
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.gray[0],
            textAlign: "center",
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            cursor: "pointer",
            width: "60%",
            margin: "20px",
            "&:hover": {
              backgroundColor: theme.colors.gray[1],
            },
          })}
        >
          <P
            textAlign={`center`}
            Copy={`Let's get started by uploading a logo for ${org}.`}
          />
          {mobile ? (
            false
          ) : (
            <P
              textAlign={`center`}
              Copy={`This logo will be used in the digital assets we create for you, making them unique and personalized. Click the 'upload a logo' button to select a logo from your device.`}
            />
          )}
        </Box>
      </Group>
    );
  };