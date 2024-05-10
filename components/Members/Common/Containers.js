import { Box, Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
export const MembersWrapper = (props) => {
  return (
    <Container fluid pt={40} pb={100} px={0}>
      {props.children}
    </Container>
  );
};

export const Wrapper = (props) => {
  const { px = "sm", py = "xs" } = props;
  return (
    <Container size={"lg"} px={px} py={py}>
      {props.children}
    </Container>
  ); 
};

export const PageCopyWrapper = (props) => {
  const matches = useMediaQuery("(min-width: 48em)");
  return (
    <Box
      sx={(theme) => ({
        width: matches ? "80%" : "100%",
      })}
    >
      {props.children}
    </Box>
  );
};

export const ShadowWrapper = (props) => {
  const { BGColor = 0, mb = 40, p = 10 } = props;
  return (
    <Container
      size={"lg"}
      p={p}
      mb={mb}
      sx={(theme) => ({
        backgroundColor: theme.colors[theme.primaryColor][BGColor],
        borderRadius: "5px",
        boxShadow:
          "0 1px 3px rgba(0, 0, 0, 0.05),rgba(0, 0, 0, 0.05) 0px 36px 28px -7px,rgba(0, 0, 0, 0.04) 0px 17px 17px -7px",
        "@media (max-width: 565px)": { padding: "5px" },
      })}
    >
      {props.children}
    </Container>
  );
};
