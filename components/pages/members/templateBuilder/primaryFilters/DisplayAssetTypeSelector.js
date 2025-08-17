// Display Asset Type Selector
import { FixturaCustomSelect } from '../../../../Members/Common/utils/Selects';

const AssetTypes = [
  {
    name: 'Weekend Results',
    slug: 'CricketResults',
  },
  {
    name: 'Upcoming Fixtures',
    slug: 'CricketUpcoming',
  },
  {
    name: 'Ladder',
    slug: 'CricketLadder',
  },
  {
    name: 'Top 5 Batting',
    slug: 'CricketTop5Batting',
  },
  {
    name: 'Top 5 Bowling',
    slug: 'CricketTop5Bowling',
  },
  {
    name: 'Player Roster',
    slug: 'CricketRoster',
  },
];

const assetTypeOptions = AssetTypes.map(type => ({
  label: type.name,
  value: type.slug,
}));

export const AssetTypeSelector = ({
  selectedAssetType,
  setSelectedAssetType,
}) => {
  return (
    <FixturaCustomSelect
      label=''
      placeholder='Preview Asset Type'
      data={assetTypeOptions}
      value={selectedAssetType?.slug || ''}
      onChange={value => {
        const selected = AssetTypes.find(type => type.slug === value);
        setSelectedAssetType(selected);
      }}
      marginBottom={0}
    />
  );
};
