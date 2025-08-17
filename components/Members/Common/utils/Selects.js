import { Select, createStyles } from '@mantine/core';
import PropTypes from 'prop-types';

const useStyles = createStyles(theme => ({
  select: {
    '&:hover': {
      borderColor: theme.colors.blue[6],
    },
    '&:focus': {
      borderColor: theme.colors.blue[6],
    },
  },
}));

export const FixturaCustomSelect = ({
  label = '',
  description,
  placeholder = 'Select...',
  data = [],
  value = '',
  onChange = null,
  marginBottom = 20,
  width = '100%',
}) => {
  const { classes } = useStyles();

  const handleChange = value => {
    try {
      if (onChange) {
        onChange(value);
      }
    } catch (error) {
      console.error('Error handling select change:', error);
    }
  };

  return (
    <Select
      label={label}
      description={description}
      placeholder={placeholder}
      data={data || []}
      value={value}
      onChange={handleChange}
      w={width}
      styles={theme => ({
        item: {
          '&[data-selected]': {
            '&, &:hover': {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.blue[9]
                  : theme.colors.blue[1],
              color:
                theme.colorScheme === 'dark'
                  ? theme.white
                  : theme.colors.blue[9],
            },
          },
          '&:hover': {
            backgroundColor: theme.colors.blue[0],
          },
        },
        input: {
          '&:hover': {
            borderColor: theme.colors.blue[6],
          },
          '&:focus': {
            borderColor: theme.colors.blue[6],
          },
        },
        label: {
          marginBottom: 0,
        },
      })}
      classNames={classes.select}
      sx={{ marginBottom: marginBottom }}
    />
  );
};

// PropTypes validation
FixturaCustomSelect.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
      }).isRequired
    ),
  ]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  marginBottom: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

// Documentation and Usage Example
/**
 * FixturaCustomSelect is a reusable select component styled with Mantine.
 *
 * @param {string} label - The label for the select component.
 * @param {string} placeholder - The placeholder text for the select component.
 * @param {array} data - The array of options for the select component. Can be either:
 *   - Array of strings: ["Option 1", "Option 2", "Option 3"]
 *   - Array of objects: [{label: "Option 1", value: "opt1"}, {label: "Option 2", value: 2}]
 * @param {string|number} value - The currently selected value.
 * @param {function} onChange - The function to call when the value changes.
 * @param {number} marginBottom - Bottom margin in pixels.
 * @param {string|number} width - Width of the select component.
 *
 * @example
 * import { FixturaCustomSelect } from './components/Selects';
 *
 * // Using string array
 * const categories = ["All", "Category 1", "Category 2"];
 *
 * // Using object array
 * const templateOptions = [
 *   { label: "Template 1", value: "template1" },
 *   { label: "Template 2", value: "template2" }
 * ];
 *
 * function MyComponent() {
 *   const [selectedCategory, setSelectedCategory] = useState("All");
 *
 *   return (
 *     <FixturaCustomSelect
 *       label="Filter by Category"
 *       placeholder="All/Clear"
 *       data={categories}
 *       value={selectedCategory}
 *       onChange={setSelectedCategory}
 *     />
 *   );
 * }
 */
