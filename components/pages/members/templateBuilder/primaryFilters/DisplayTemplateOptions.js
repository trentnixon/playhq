import { FixturaCustomSelect } from '../../../../Members/Common/utils/Selects';

const getTemplateCategoryOptions = templateCategories => {
  if (!templateCategories || !templateCategories.data)
    return [{ label: 'None', value: '' }];
  return templateCategories.data
    .filter(category => !category.attributes.isPrivate)
    .map(category => ({
      label: category.attributes.Name, // Use correct property for label
      value: category.id, // Use id for value
      slug: category.attributes.slug,
    }));
};

export const Templates = props => {
  const {
    selectedDesignOptions,
    setSelectedDesignOptions,
    templateCategories,
  } = props;

  const handleChange = value => {
    const getItem = templateCategories?.data?.find(item => item.id === value);

    setSelectedDesignOptions({
      ...selectedDesignOptions,
      selectedCategory: {
        id: getItem.id,
        value: getItem.attributes.slug,
      },
    });
    return;
  };

  return (
    <div className='flex-1'>
      <FixturaCustomSelect
        label='Browse Templates'
        description='Select a template to preview below'
        placeholder='Select a template'
        data={getTemplateCategoryOptions(templateCategories)}
        value={selectedDesignOptions.selectedCategory.id || ''}
        onChange={handleChange}
        marginBottom={0}
      />
    </div>
  );
};
