import { Box, Image } from "@mantine/core";
import { BTN_ONCLICK } from "../../../../Members/Common/utils/Buttons";

export const DisplaySponsorsLogo = ({ LOGO, setLogoPath }) => {
  const USELOGO =
    LOGO?.attributes?.height === undefined ? LOGO[0] : LOGO.attributes;

  const calculateImageDimensions = (USELOGO) => {
    const aspectRatio = USELOGO.width / USELOGO.height;
    let newHeight, newWidth;
    if (USELOGO.width > USELOGO.height) {
      newWidth = 200;
      newHeight = 200 / aspectRatio;
    } else {
      newHeight = 200;
      newWidth = 200 * aspectRatio;
    }

    return { newHeight, newWidth };
  };

  const { newHeight, newWidth } = calculateImageDimensions(USELOGO);

  return (
    <Box
      sx={(theme) => ({
        textAlign: "center",
      })}
    >
      <div
        style={{
          width: 200,
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "10px",
        }}
      >
        <Image
          src={USELOGO.url}
          width={newWidth}
          height={newHeight}
          radius={10}
        />
      </div>
      <BTN_ONCLICK        LABEL={`Change`}
        HANDLE={() => {
          setLogoPath(false);
        }}
      />
    </Box>
  );
};
