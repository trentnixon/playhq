import React, { forwardRef } from 'react';
import { Select, Group, Avatar, Text } from '@mantine/core';

const SelectItem = forwardRef(
  ({ image, label, description, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />
        <div>
          <Text size='sm'>{label}</Text>
          <Text size='xs' opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

SelectItem.displayName = 'SelectItem';

const SponsorSelection = ({
  selectedSponsor,
  handleSponsorChange,
  sponsors,
}) => {
  if (!sponsors) {
    console.error('Sponsors list is null or undefined');
    return null;
  }

  const data = sponsors.map(sponsor => ({
    value: sponsor.id,
    label: sponsor.attributes.Name,
    description: sponsor.attributes.Tagline || '',
    image:
      sponsor.attributes.Logo?.data?.attributes?.url ||
      sponsor.attributes.Logo ||
      '',
  }));

  return (
    <Select
      placeholder='Select Sponsor'
      value={selectedSponsor}
      onChange={handleSponsorChange}
      data={data}
      itemComponent={SelectItem}
      searchable
      maxDropdownHeight={400}
      nothingFound='No sponsors found'
      filter={(value, item) =>
        item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.description.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
  );
};

export default SponsorSelection;
