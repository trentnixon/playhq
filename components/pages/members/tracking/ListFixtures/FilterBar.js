import { useState } from 'react';
import { TextInput, Group, Button, Paper } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconSearch, IconX } from '@tabler/icons-react';
import { P } from '../../../../Members/Common/Type';

export const FilterBar = ({ onFilterChange, totalFilteredGames }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);

  // Check if any filters are active
  const hasActiveFilters = searchTerm || dateRange[0] || dateRange[1];

  // Clear filters function
  const clearFilters = () => {
    setSearchTerm('');
    setDateRange([null, null]);
    onFilterChange({ searchTerm: '', dateRange: [null, null] });
  };

  // Handle search change
  const handleSearchChange = e => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onFilterChange({ searchTerm: newSearchTerm, dateRange });
  };

  // Handle date range change
  const handleDateRangeChange = value => {
    const newDateRange = value || [null, null];
    setDateRange(newDateRange);
    onFilterChange({ searchTerm, dateRange: newDateRange });
  };

  return (
    <Paper p='0' mb='md' shadow='none'>
      <Group position='left' align='flex-start' spacing='sm'>
        <TextInput
          placeholder='Search by team or grade...'
          icon={<IconSearch size={14} />}
          value={searchTerm}
          onChange={handleSearchChange}
          size='sm'
          style={{ width: 250 }}
        />
        <DatePickerInput
          type='range'
          placeholder='Pick date range'
          // @ts-expect-error Mantine type issue with date range
          value={dateRange}
          onChange={handleDateRangeChange}
          size='sm'
          style={{ width: 250 }}
          clearable
        />
        {hasActiveFilters && (
          <Button
            variant='subtle'
            color='gray'
            size='sm'
            leftIcon={<IconX size={14} />}
            onClick={clearFilters}
          >
            Clear
          </Button>
        )}
      </Group>
      {hasActiveFilters && (
        <Group position='right'>
          <P marginBottom={0} size={12} color={6} style={{ marginTop: 4 }}>
            Showing {totalFilteredGames} filtered fixtures
          </P>
        </Group>
      )}
    </Paper>
  );
};
