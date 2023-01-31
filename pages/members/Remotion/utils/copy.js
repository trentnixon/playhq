export const calculateLetterSpacing = (containerWidth, fontSize, string='') => {
  const stringWidth = string.length * fontSize;
  return (containerWidth - stringWidth) / (string.length - 1);
};

export default calculateLetterSpacing;