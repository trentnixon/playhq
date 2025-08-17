// src/Common/utils/templateUtils.js

export const generateCategoryOptions = groupedTemplates => {
  return ['All', ...Object.keys(groupedTemplates)];
};

export const filterAndGroupTemplates = (templatesData, userAccount) => {
  if (Array.isArray(templatesData)) {
    const filterFn = template => {
      const isPublic = template.attributes.public;
      const isTemplateUserTemplate =
        userAccount.attributes.template_option?.data?.id === template.id;
      const onlyClub = template.attributes.onlyClub;
      const accountType = userAccount.attributes.accountType;
      if (onlyClub && accountType !== 'Club') {
        return false;
      }
      return userAccount.attributes.hasCustomTemplate
        ? isTemplateUserTemplate
        : isPublic;
    };
    const filteredTemplates = templatesData.filter(filterFn);
    const grouped = filteredTemplates.reduce((acc, template) => {
      let category = template.attributes?.Category;
      if (!category) {
        category = 'Uncategorized';
      }
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(template);
      return acc;
    }, {});
    return grouped;
  }
  return {};
};
