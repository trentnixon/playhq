import { Box, Center, Group, Image } from "@mantine/core";
import { BTN_ONCLICK } from "../../../../../Members/Common/utils/Buttons";

export const NewLogoImageAndStore = ({ image, saveLogoToAccount, setLogoPath }) => {
    return (
      <Box
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[0],
          textAlign: "center",
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          cursor: "pointer",
          width: "60%",
          margin: "20px auto",
          "&:hover": {
            backgroundColor: theme.colors.gray[1],
          },
        })}
      >
        <Center mb={20}>
          <Image src={image} width={200} />
        </Center>
        <Group position="center">
          <BTN_ONCLICK
            LABEL={`Save Logo`}
            THEME={`cta`}
            HANDLE={saveLogoToAccount}
          />
          <BTN_ONCLICK
            LABEL={`Cancel`}
            THEME={`error`}
            HANDLE={() => {
              setLogoPath(false);
            }}
          />
        </Group>
      </Box>
    );
  };