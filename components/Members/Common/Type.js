import { Avatar, Container, Group, Space, Text, Title, useMantineTheme } from "@mantine/core";
import { Wrapper } from "./Containers";
export const PageTitle = (props) => {
  const { Copy, ICON } = props;
  const theme = useMantineTheme()
  return (
    <Wrapper>
      <Group position={"apart"}>
        <Title
          order={1}
          transform="uppercase"
          sx={(theme) => ({
            color: theme.colors.gray[8],
            fontFamily: theme.fontFamily,
          })}
        >
          {Copy}
        </Title>
        <Avatar color='blue.5' size={60} radius={60}>
          {ICON}
        </Avatar>
      </Group>
      <Space h={10}/>
    </Wrapper>
  );
};

export const SubHeaders = (props) => {
  const { Copy } = props;
  return (
    <Container size={"lg"} >
      <Title
        order={3}
        transform="uppercase"
        sx={(theme) => ({
          color: theme.colors.gray[8],
          fontFamily: theme.fontFamily,
        })}
      >
        {Copy}
      </Title>
    </Container>
  );
};

export const P = (props) => {
  const {
    Copy,
    color = 2,
    Weight = 400,
    size = "md",
    marginBottom = "14px",
    textAlign = "left",
    lineHeight = "1.2em",
    textTransform = "normal", 
    fontStyle='normal'
  } = props;
  return (
    <Text
      size={size}
      sx={(theme) => ({
        color: theme.colors[theme.primaryColor][color],
        fontFamily: theme.fontFamily,
        fontWeight: Weight,
        lineHeight: lineHeight,
        textTransform: textTransform,
        marginBottom: marginBottom,
        textAlign: textAlign,
        fontStyle:fontStyle
      })}
    >
      {Copy}
    </Text>
  );
};
