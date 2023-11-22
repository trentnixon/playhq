import {
  Avatar,
  Container,
  Group,
  Space,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Wrapper } from "./Containers";
import { useMediaQuery } from "@mantine/hooks";
import { Gradient } from "../../../utils/Gradient";
export const PageTitle = (props) => {
  const { Copy, ICON } = props;

  const matches = useMediaQuery("(min-width: 48em)");
  return (
    <>
      <Group noWrap position={"apart"}>
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
        <Avatar color="blue.5" size={matches ? 60 : 40} radius={60}>
          {ICON}
        </Avatar>
      </Group>
      <Space h={10} />
    </>
  );
};

export const SubHeaders = (props) => {
  const { Copy } = props;
  return (
    <Container fluid px={0}>
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

export const H = (props) => {
  const {
    size = "h1",
    weight = 900,
    align = "center",
    color = "gray.8",
    className = {},
    lh = "1em",
    mb = "40px",
  } = props;

  return (
    <Title
      order={1}
      size={size}
      lh={lh}
      mb={mb}
      weight={weight}
      align={align}
      color={color}
      className={className}
    >
      {props.children}
    </Title>
  );
};

export const GradientTitle = ({ title, mb, gradient, size = "h1" }) => {
  return (
    <Title mb={mb}  size={size} variant="gradient" gradient={gradient}>
      {title}
    </Title>
  );
};

export const P = (props) => {
  const {
    Copy,
    color = "gray.8",
    Weight = 400,
    size = "md",
    marginBottom = "14px",
    textAlign = "left",
    lineHeight = "1.3em",
    textTransform = "normal",
    fontStyle = "normal",
    className = {},
  } = props;
  return (
    <Text
      size={size}
      className={className}
      sx={(theme) => ({
        fontFamily: theme.fontFamily,
        fontWeight: Weight,
        lineHeight: lineHeight,
        textTransform: textTransform,
        marginBottom: marginBottom,
        textAlign: textAlign,
        fontStyle: fontStyle,
        color: color,
      })}
    >
      {props.children || Copy}
    </Text>
  );
};
