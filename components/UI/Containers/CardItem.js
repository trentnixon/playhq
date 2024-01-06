import { useMantineTheme } from "@mantine/core";
import { GradientTitle, P } from "../../Members/Common/Type";
import { trackButtonClick, trackCustomEvent } from "../../../lib/GA";

const CardItem = ({ item }) => {
  const theme = useMantineTheme();

  const handleCardClick = () => {
    trackButtonClick(`Clicked on ${item.title}`);
  };

  const handleCardHover = () => {
    trackCustomEvent(
      "Hover",
      `Hovered over ${item.title}`,
      "Fun Facts Section"
    );
  };
  return (
    <div
      className="col-lg-4 col-sm-6 "
      data-aos="fade-up"
      data-aos-duration="1200"
      onClick={() => handleCardClick(item.title)}
      onMouseEnter={() => handleCardHover(item.title)}
    >
      <div className="funfact-card">
        <item.icon size="4rem" stroke={1} color={theme.colors.blue[6]} />
        <GradientTitle 
          mb={20}
          ta='center'
          variant="gradient"
          gradient={{ from: "#339AF0", to: "#3BC9DB", deg: 45 }}
          title={item.title}
        >
          {item.title}
        </GradientTitle>
        <P color={0} textAlign={"center"}>
          {item.description}
        </P>
      </div>
    </div>
  );
};

export default CardItem;
