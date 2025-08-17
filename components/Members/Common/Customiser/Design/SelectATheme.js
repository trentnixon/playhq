import { useEffect, useState } from 'react';
import { FixturaLoading } from '../../Loading';
import {
  ColorSwatch,
  Group,
  Paper,
  Table,
  useMantineTheme,
} from '@mantine/core';
import {
  useAssignDesignElement,
  useGETDesignElement,
} from '../../../../../Hooks/useCustomizer';
import { BTN_ONCLICK } from '../../utils/Buttons';
import { IconCircleCheck } from '@tabler/icons';
import { useAccountDetails } from '../../../../../context/userContext';
import { P, SubHeaders } from '../../Type';
import { DisplayCustomTheme } from './Components/DisplayCustomTheme';
import { CreateNewTheme } from './Components/CreateNewTheme';
import { useMediaQuery } from '@mantine/hooks';
import { IconColorSwatch, IconFileDownload } from '@tabler/icons-react';
import { RoundedSectionContainer } from '../../../../UI/Containers/SectionContainer';
import { StepHeaderandDescription } from '../../../../pages/members/setup/phases/SetupSteps/Steps/StepHeaderandDescription';

/**
 * SelectATheme Component
 *
 * Main theme selection interface that allows users to choose from predefined themes
 * or create custom themes. Used in both onboarding flow and general theme customization.
 *
 * Key Features:
 * - Display of public themes with color previews
 * - Custom theme creation interface
 * - Theme selection with immediate application
 * - Responsive design for mobile and desktop
 * - Integration with account context for data persistence
 *
 * @param {Object} props - Component props
 * @param {Function} props.onThemeSelect - Callback function when theme is selected (for onboarding)
 * @param {boolean} props.isOnboarding - Whether component is used in onboarding flow
 *
 * State Management:
 * - userAccount: Local copy of account data for UI updates
 * - loading: Loading state during theme operations
 * - createNew: Toggle for custom theme creation mode
 *
 * @returns {JSX.Element} Theme selection interface
 */
export const SelectATheme = ({ onThemeSelect, isOnboarding = false }) => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setuserAccount] = useState(account);
  const [loading, setLoading] = useState(false);
  const [createNew, setCreateNew] = useState(false);

  // Theme management hooks
  const [DesignElement, CreateDesignElement] = useAssignDesignElement();
  const [GetElement, FetchElement] = useGETDesignElement();

  // Fetch themes on component mount
  useEffect(() => {
    FetchElement({ COLLECTIONID: 'themes' });
  }, []);

  // Update local account state when account context changes
  useEffect(() => {
    FetchElement({ COLLECTIONID: 'themes' });
    setuserAccount(account);
    setLoading(false);
  }, [account]);

  /**
   * Handles theme selection and saves it to the user's account
   * @param {Object} item - Selected theme object
   */
  const StoreUSerChange = item => {
    const themeUpdateObject = {
      CollectionSaveTo: 'accounts',
      Body: [item.id],
      COLLECTIONID: userAccount.id,
      RelationProperty: 'theme',
    };

    setLoading(true);
    CreateDesignElement(themeUpdateObject);

    // If this is being used in onboarding, call the callback immediately
    if (isOnboarding && onThemeSelect) {
      onThemeSelect(item);
    }
  };

  // Handle design element save completion
  useEffect(() => {
    if (DesignElement !== true) {
      setLoading(false);
    }
  }, [DesignElement]);

  // Show loading state during theme operations
  if (
    loading ||
    GetElement === true ||
    GetElement === null ||
    userAccount === false
  ) {
    return (
      <>
        <SubHeaders
          Copy='Storing New Theme'
          ICON={<IconFileDownload size={30} />}
        />
        <Paper
          radius='md'
          shadow='md'
          mb={20}
          p='xs'
          sx={theme => ({ backgroundColor: theme.white })}
        >
          <FixturaLoading />
        </Paper>
      </>
    );
  }

  return (
    <>
      <RoundedSectionContainer
        headerContent=''
        topContent={
          <StepHeaderandDescription
            Header='Organisation Branding'
            Description="Choose your brand colors to personalize your assets. Select from
                predefined themes or create a custom theme that reflects your
                club's unique personality."
          />
        }
        bottomContent={
          createNew ? (
            <CreateNewTheme
              userAccount={userAccount}
              setCreateNew={setCreateNew}
              ReRender={ReRender}
              GetElement={GetElement}
            />
          ) : (
            <ColorTable
              GetElement={GetElement}
              userAccount={userAccount}
              StoreUSerChange={StoreUSerChange}
              setCreateNew={setCreateNew}
            />
          )
        }
      />
    </>
  );
};

/**
 * ColorTable Component
 *
 * Displays a table of available themes with color previews and selection options
 *
 * @param {Object} props - Component props
 * @param {Array} props.GetElement - Array of available themes
 * @param {Object} props.userAccount - Current user account data
 * @param {Function} props.StoreUSerChange - Function to handle theme selection
 * @param {Function} props.setCreateNew - Function to toggle custom theme creation
 * @returns {JSX.Element} Theme selection table
 */
const ColorTable = props => {
  const { GetElement, userAccount, StoreUSerChange } = props;

  return (
    <Paper
      radius='md'
      p={0}
      sx={theme => ({
        backgroundColor: theme.white,
      })}
    >
      {/* Custom theme display section */}
      <DisplayCustomTheme {...props} />

      {/* Public themes section */}
      <SubHeaders Copy='Public Themes' ICON={<IconColorSwatch size={30} />} />

      <Table>
        <tbody>
          {GetElement.map((item, i) => (
            <TableRow
              key={i}
              item={item}
              userAccount={userAccount}
              StoreUSerChange={StoreUSerChange}
            />
          ))}
        </tbody>
      </Table>

      <P
        size='xs'
        textAlign='right'
        color={7}
        Copy='Brand settings can be changed via your admin panel after setup.'
      />
    </Paper>
  );
};

/**
 * TableRow Component
 *
 * Individual theme row with color swatches, name, and selection button
 * Only displays public themes (filters out private themes)
 *
 * @param {Object} props - Component props
 * @param {Object} props.item - Theme object to display
 * @param {Object} props.userAccount - Current user account data
 * @param {Function} props.StoreUSerChange - Function to handle theme selection
 * @returns {JSX.Element|null} Theme row or null if not public
 */
const TableRow = ({ item, userAccount, StoreUSerChange }) => {
  const theme = useMantineTheme();

  // Only show public themes
  if (!item.attributes.isPublic) return null;

  const isSelected = userAccount.attributes.theme.data.id === item.id;

  return (
    <tr>
      <td>
        <Group position='center' spacing='xs'>
          <Swatches
            colors={[
              item.attributes.Theme.primary,
              item.attributes.Theme.secondary,
            ]}
          />
        </Group>
      </td>
      <td>
        <P marginBottom={0} color={isSelected ? 6 : 7}>
          {item.attributes.Name}
        </P>
      </td>
      <td style={{ textAlign: 'right' }}>
        <SelectButton
          isSelected={isSelected}
          onClick={() => StoreUSerChange(item)}
          label='Select'
        />
      </td>
    </tr>
  );
};

/**
 * Swatches Component
 *
 * Displays color swatches for theme preview
 *
 * @param {Object} props - Component props
 * @param {Array} props.colors - Array of hex color strings
 * @returns {JSX.Element} Color swatches
 */
const Swatches = ({ colors }) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <>
      {colors.map(color => (
        <ColorSwatch
          key={color}
          color={color}
          size={mobile ? 14 : 25}
          radius='xl'
        />
      ))}
    </>
  );
};

/**
 * SelectButton Component
 *
 * Displays either a checkmark for selected themes or a select button
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isSelected - Whether the theme is currently selected
 * @param {Function} props.onClick - Click handler for theme selection
 * @param {string} props.label - Button label text
 * @returns {JSX.Element} Select button or checkmark
 */
const SelectButton = ({ isSelected, onClick, label }) => {
  const theme = useMantineTheme();

  if (isSelected) {
    return <IconCircleCheck color={theme.colors.green[5]} />;
  }

  return <BTN_ONCLICK HANDLE={onClick} LABEL={label} />;
};
