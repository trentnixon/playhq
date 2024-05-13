import hexRgb from "hex-rgb";
export const UseBaseColor = (SetColor) => {

  console.log("SetColor ", SetColor)
  const OBJ = SetColor
    ? SetColor
    : {
        r: "0",
        g: "0",
        b: "0",
        a: "1",
      };

  console.log("UseBaseColor FIRED", OBJ);
  return OBJ;
};

function rgbaToHex({ r, g, b, a }) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export const CreateANewTheme = (userInfo, Colors) => {
  const OBJ = {
    Theme: {
      primary: rgbaToHex(Colors.Primary),
      secondary: rgbaToHex(Colors.Secondary),
      dark: "#111",
      white: "#FFF",
    },
    CreatedBy: userInfo.id,
    isPublic: false,
    accounts: [userInfo.id],
    Name: `Custom Theme created by ${userInfo.FirstName}`,
  };

  return {
    Theme: OBJ,
  };
};
