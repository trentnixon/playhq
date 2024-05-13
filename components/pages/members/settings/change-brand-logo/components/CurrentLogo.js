import { Box, Center, Image } from "@mantine/core";

export const CurrentLogo = ({ LOGO }) => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[1],
        textAlign: "center",
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: "pointer",
        margin: "20px auto",
      })}
    >
      <Center>
        <Image src={LOGO} width={200} radius={"md"} />
      </Center>
    </Box>
  );
};
