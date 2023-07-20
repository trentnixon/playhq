import { Avatar, Container, Group, Space, Text, Title, useMantineTheme } from "@mantine/core";
import { Wrapper } from "./Containers";
import { useMediaQuery } from '@mantine/hooks';
export const PageTitle = (props) => {
  const { Copy, ICON } = props;

  const matches = useMediaQuery('(min-width: 48em)');
  return ( 
    <>
      <Group position={"apart"}>
        <Title
          order={matches ? 1 : 3}
          transform="uppercase"
          sx={(theme) => ({
            color: theme.colors.gray[8],
            fontFamily: theme.fontFamily,
          })}
        >
          {Copy}
        </Title>
        <Avatar color='blue.5' size={matches ? 60 : 40} radius={60}>
          {ICON}
        </Avatar>
      </Group>
      <Space h={10}/>
    </>
  );
};

export const SubHeaders = (props) => {
  const { Copy } = props;
  return (
    <Container fluid px={0} >
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
