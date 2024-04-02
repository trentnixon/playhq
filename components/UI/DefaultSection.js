import { Container, createStyles,getStylesRef } from "@mantine/core";
import SectionContainer from "./Containers/SectionContainer";
import { Paragraphs, TitleSection } from "./prebuilds/content";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  dark: {
    ref: getStylesRef('dark'),
    backgroundColor: theme.colors.dark[5],
    color: `${theme.colors.gray[2]} !important`,
  },
  grey: {
    ref: getStylesRef('grey'),
    backgroundColor: theme.colors.gray[3],
    color:`${theme.colors.gray[8]} !important`,
  },
  light: {
    ref: getStylesRef('light'),
    backgroundColor: theme.colors.gray[1],
    color:`${theme.colors.gray[7]} !important`,
  },
  primary: {
    ref: getStylesRef('primary'),
    backgroundColor: "#339AF0",
    color: `${theme.colors.gray[1]} !important`, // assuming you want a light text color for contrast
  },
  secondary: {
    ref: getStylesRef('secondary'),
    backgroundColor: "#3BC9DB",
    color: `${theme.colors.gray[7]} !important`, // assuming you want a light text color for contrast
  },
}));




const Section = ({ title, paragraphs, color = "light", children }) => {
  const { classes } = useStyles();
  const isMobile = useMediaQuery('(max-width: 768px)');
  // Adjust the font size based on whether it's a mobile device or not
  const padding = isMobile ? 0 : 'sm';
  return (
    <>
      <SectionContainer className={classes[color]}>
        <TitleSection title={title}  className={classes[color]}/> 
        <Container p={padding}> 
          <Paragraphs paragraphs={paragraphs} className={classes[color]}/>
        </Container>
        {children}
      </SectionContainer>
    </>
  );
}; 

export default Section; 
