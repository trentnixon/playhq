import { useEffect, useState } from 'react';
import { Center, Group, Paper, Table, useMantineTheme } from '@mantine/core';
import {
  UserCreateTheme,
  UserUpdateTheme,
} from '../../../../../../Hooks/useCustomizer';
import { BTN_ONCLICK } from '../../../utils/Buttons';
import { P } from '../../../Type';
import SketchExample from './ColorPicker';
import { IconCircleCheck } from '@tabler/icons';
import { FixturaLoading } from '../../../../Common/Loading';
import { useMediaQuery } from '@mantine/hooks';
import { UseBaseColor } from '../../../../../pages/members/settings/change-brand-colors/components/createNewTheme/functions';
import { useAccountDetails } from '../../../../../../context/userContext';

/**
 * CreateNewTheme Component
 *
 * Allows users to create or update custom themes with primary and secondary colors.
 * This component is used in the onboarding flow and theme customization.
 *
 * Key Features:
 * - Color picker interface for primary and secondary colors
 * - Automatic initialization with current theme colors
 * - Create new themes or update existing custom themes
 * - Responsive design for mobile and desktop
 * - Integration with account context for data persistence
 *
 * @param {Object} props - Component props
 * @param {Object} props.userAccount - Current user account data
 * @param {Function} props.setCreateNew - Function to toggle create new theme mode
 * @param {Function} props.ReRender - Function to trigger account re-render (legacy)
 * @param {Array} props.GetElement - Array of available themes
 *
 * State Management:
 * - Primary/Secondary: Color objects with r,g,b,a values
 * - disabled: Controls button state based on color selection
 * - IsLoading: Shows loading state during theme operations
 *
 * @returns {JSX.Element} Theme creation interface
 */
export const CreateNewTheme = props => {
  const { userAccount, setCreateNew, ReRender, GetElement } = props;
  const { forceRefresh } = useAccountDetails();

  // Color state management
  const [Primary, SetPrimary] = useState(null);
  const [Secondary, SetSecondary] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [IsLoading, setIsLoading] = useState(false);

  // Theme creation hooks
  const [THEME, CreateTHEME] = UserCreateTheme();
  const [UPDATE, UpdateTHEME] = UserUpdateTheme();

  // UI helpers
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  // Filter themes created by current user
  const CTHEME = GetElement.filter(
    item => item.attributes.CreatedBy === userAccount.id
  );

  /**
   * Converts hex color string to RGBA object for color picker
   * @param {string} hexColor - Hex color string (e.g., "#FF0000")
   * @returns {Object} RGBA object with r,g,b,a values
   */
  const hexToRgba = hexColor => {
    if (!hexColor || !hexColor.startsWith('#')) {
      return { r: 0, g: 0, b: 0, a: 1 };
    }

    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return { r, g, b, a: 1 };
  };

  /**
   * Gets current theme color for initialization
   * Priority: Custom theme > User's current theme > Default
   * @param {string} colorType - 'primary' or 'secondary'
   * @returns {Object} RGBA color object
   */
  const getCurrentThemeColor = colorType => {
    // First check if user has a custom theme
    if (CTHEME[0]?.attributes?.Theme) {
      const hexColor = CTHEME[0].attributes.Theme[colorType];
      if (hexColor) {
        return hexToRgba(hexColor);
      }
    }

    // Fallback to user's current theme
    if (userAccount?.attributes?.theme?.data?.attributes?.Theme) {
      const hexColor =
        userAccount.attributes.theme.data.attributes.Theme[colorType];
      if (hexColor) {
        return hexToRgba(hexColor);
      }
    }

    // Default fallback
    return { r: 0, g: 0, b: 0, a: 1 };
  };

  /**
   * Converts RGBA object to hex string for API
   * @param {Object} rgba - RGBA object with r,g,b,a values
   * @returns {string} Hex color string
   */
  const rgbaToHex = ({ r, g, b, a }) => {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  // Initialize colors with current theme values on component mount
  useEffect(() => {
    if (!Primary && !Secondary) {
      SetPrimary(getCurrentThemeColor('primary'));
      SetSecondary(getCurrentThemeColor('secondary'));
    }
  }, [userAccount, CTHEME]);

  // Update disabled state based on color selection
  useEffect(() => {
    const hasValidColors =
      Primary &&
      Secondary &&
      typeof Primary === 'object' &&
      typeof Secondary === 'object';
    setDisabled(!hasValidColors);
  }, [Primary, Secondary]);

  // Handle theme creation/update completion
  useEffect(() => {
    if (THEME || UPDATE) {
      forceRefresh(); // Refresh account context with new theme data
      setIsLoading(false);
      setCreateNew(false);
    }
  }, [THEME, UPDATE]);

  /**
   * Creates or updates a custom theme
   * Handles both new theme creation and existing theme updates
   */
  const CreateANewTheme = () => {
    const themeObject = {
      Theme: {
        primary:
          Primary && typeof Primary === 'object'
            ? rgbaToHex(Primary)
            : '#000000',
        secondary:
          Secondary && typeof Secondary === 'object'
            ? rgbaToHex(Secondary)
            : '#FFFFFF',
        dark: '#111',
        white: '#FFF',
      },
      CreatedBy: userAccount.id,
      isPublic: false,
      accounts: [userAccount.id],
      Name: `Custom Theme created by ${userAccount.attributes.FirstName}`,
    };

    // Update existing theme or create new one
    if (CTHEME[0]?.attributes?.Theme && typeof UpdateTHEME === 'function') {
      UpdateTHEME(themeObject, CTHEME[0].id);
    } else if (typeof CreateTHEME === 'function') {
      CreateTHEME(themeObject);
    }

    setIsLoading(true);
  };

  // Show loading state during theme operations
  if (IsLoading) return <FixturaLoading />;

  return (
    <>
      <Paper
        radius='md'
        mb={20}
        p='lg'
        sx={theme => ({ backgroundColor: theme.white })}
      >
        <P size={'xs'}>
          Tip: To make your assets stand out, set the darker color as the
          primary.
        </P>

        <Table>
          <tbody>
            {/* Primary Color Row */}
            <tr>
              {!mobile && (
                <td>
                  <SelectLabel Selector={Primary} LABEL='Primary Color' />
                </td>
              )}

              <td style={{ textAlign: 'right' }}>
                <SketchExample
                  SetColor={SetPrimary}
                  UsersTheme={Primary || UseBaseColor('primary')}
                />
              </td>

              {mobile && (
                <td>
                  <SelectLabel Selector={Primary} LABEL='Primary Color' />
                </td>
              )}
            </tr>

            {/* Secondary Color Row */}
            <tr>
              {!mobile && (
                <td>
                  <SelectLabel Selector={Secondary} LABEL='Secondary Color' />
                </td>
              )}

              <td style={{ textAlign: 'right' }}>
                <SketchExample
                  SetColor={SetSecondary}
                  UsersTheme={Secondary || UseBaseColor('secondary')}
                />
              </td>

              {mobile && (
                <td>
                  <SelectLabel Selector={Secondary} LABEL='Secondary Color' />
                </td>
              )}
            </tr>
          </tbody>
        </Table>

        {/* Action Buttons */}
        <Group position='apart' mt={20}>
          <BTN_ONCLICK
            LABEL='Back'
            THEME='error'
            HANDLE={() => setCreateNew(false)}
          />
          <BTN_ONCLICK
            LABEL={CTHEME[0]?.attributes ? 'Update' : 'Create'}
            HANDLE={CreateANewTheme}
            idDisabled={disabled}
          />
        </Group>
      </Paper>
    </>
  );
};

/**
 * SelectLabel Component
 *
 * Displays a label with a checkmark indicator for color selection status
 *
 * @param {Object} props - Component props
 * @param {Object} props.Selector - Color object to check if selected
 * @param {string} props.LABEL - Label text to display
 * @returns {JSX.Element} Label with checkmark
 */
const SelectLabel = ({ Selector, LABEL }) => {
  const theme = useMantineTheme();
  const isSelected = Selector && typeof Selector === 'object';

  return (
    <Group>
      <Center>
        <IconCircleCheck
          color={isSelected ? theme.colors.green[6] : theme.colors.gray[1]}
        />
      </Center>
      <P marginBottom={0} Weight={900} textTransform='uppercase'>
        {LABEL}
      </P>
    </Group>
  );
};
