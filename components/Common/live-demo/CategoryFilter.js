import { Group } from "@mantine/core";
import { FixturaCustomSelect } from "../../Members/Common/utils/Selects";

const CategoryFilter = ({
  categoryOptions,
  selectedCategory,
  onSelectCategory,
}) => (
  <Group position="right">
    <FixturaCustomSelect
      label="Filter by Category"
      placeholder="All/Clear"
      data={categoryOptions}
      value={selectedCategory}
      onChange={(value) => onSelectCategory(value)}
    />
  </Group>
);

export default CategoryFilter;
