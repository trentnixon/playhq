import { Select, createStyles } from "@mantine/core";
import PropTypes from 'prop-types';

const useStyles = createStyles((theme) => ({
  select: {
    "&:hover": {
      borderColor: theme.colors.blue[6],
    },
    "&:focus": {
      borderColor: theme.colors.blue[6],
    },
  },
}));

export const FixturaCustomSelect = ({ label, placeholder, data, value, onChange }) => {
  const { classes } = useStyles();

  const handleChange = (value) => {
    try {
      if (onChange) {
        onChange(value);
      }
    } catch (error) {
      console.error("Error handling select change:", error);
    }
  };

  return (
    <Select
      label={label}
      placeholder={placeholder}
      data={data || []}
      value={value}
      onChange={handleChange}
      styles={(theme) => ({
        item: {
          '&[data-selected]': {
            '&, &:hover': {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.blue[9] : theme.colors.blue[1],
              color: theme.colorScheme === 'dark' ? theme.white : theme.colors.blue[9],
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
        label:{
            marginBottom:0
        }
      })}
      classNames={classes.select}
      sx={{ marginBottom: 20 }}
    />
  );
};

// PropTypes validation
FixturaCustomSelect.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

// Default props
FixturaCustomSelect.defaultProps = {
  label: '',
  placeholder: 'Select...',
  value: '',
  onChange: null,
};

// Documentation and Usage Example
/**
 * FixturaCustomSelect is a reusable select component styled with Mantine.
 *
 * @param {string} label - The label for the select component.
 * @param {string} placeholder - The placeholder text for the select component.
 * @param {array} data - The array of options for the select component.
 * @param {string} value - The currently selected value.
 * @param {function} onChange - The function to call when the value changes.
 *
 * @example
 * import { FixturaCustomSelect } from './components/Selects';
 * 
 * const categories = ["All", "Category 1", "Category 2"];
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
