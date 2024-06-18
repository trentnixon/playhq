// src/Common/utils/templateUtils.js

export const generateCategoryOptions = (groupedTemplates) => {
    return ["All", ...Object.keys(groupedTemplates)];
  };
  