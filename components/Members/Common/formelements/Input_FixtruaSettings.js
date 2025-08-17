import {
  Button,
  Group,
  Box,
  Space,
  Loader,
  ActionIcon,
  useMantineTheme,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons';
import Cookies from 'js-cookie';

import { useState, useEffect } from 'react';
import { fetcher } from '../../../../lib/api';
import { PaperWithBorder, ShadowWrapper, Wrapper } from '../Containers';
import { FixturaLoading } from '../Loading';
import { P } from '../Type';
import { BTN_ONCLICK } from '../utils/Buttons';
import { useMediaQuery } from '@mantine/hooks';
import { useAccountDetails } from '@/context/userContext';

export const Input_FixturaSetting = ({
  Input,
  user,
  setHasUpdated,
  editingState = false,
  canCancel = true,
  onSelectionChange,
}) => {
  const { forceRefresh } = useAccountDetails();
  const [editing, setEditing] = useState(editingState);
  const [value, setValue] = useState(
    user?.attributes[Input.Field] ? user?.attributes[Input.Field] : ''
  );
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update internal value when user prop changes (e.g., after account data refresh)
  useEffect(() => {
    const newValue = user?.attributes[Input.Field] || '';

    if (newValue !== value && !editing) {
      console.log(
        `[Input_FixturaSetting] ${Input.Field} - updating value from`,
        value,
        'to',
        newValue
      );
      setValue(newValue);
    }
  }, [user?.attributes[Input.Field], value, editing, Input.Field]);

  const handleValueChange = event => {
    const newValue = event.target.value;
    setValue(newValue);

    for (const validator of Input.Validators) {
      const result = validator(newValue);
      if (result !== true) {
        setError(result);
        setDisabled(true);
        return;
      }
    }

    setError(null);
    setDisabled(false);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    console.log(
      `[Input_FixturaSetting] ${Input.Field} - starting save with value:`,
      value
    );

    try {
      // send the updates to Strapi
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${user.id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt')}`,
          },
          body: JSON.stringify({
            data: {
              [Input.Field]: value,
            },
          }),
        }
      );

      console.log(
        `[Input_FixturaSetting] ${Input.Field} - save response:`,
        response
      );

      // handle response
      if (response !== null) {
        setLoading(false);
        setHasUpdated(true);
        setEditing(false);
        setDisabled(true);

        console.log(
          `[Input_FixturaSetting] ${Input.Field} - calling ReRender()...`
        );
        // Wait for account data to refresh
        await forceRefresh();
        console.log(
          `[Input_FixturaSetting] ${Input.Field} - ReRender() completed`
        );

        // Call the onSelectionChange callback if provided (after data is refreshed)
        if (onSelectionChange) {
          console.log(
            `[Input_FixturaSetting] ${Input.Field} - calling onSelectionChange with value:`,
            value
          );
          onSelectionChange(value);
        }
      }
    } catch (error) {
      console.error(
        `[Input_FixturaSetting] ${Input.Field} - Error saving field:`,
        error
      );
      setLoading(false);
      setError('Failed to save. Please try again.');
    }
  };

  return (
    <>
      <LabelMe label={Input.Label} />

      <PaperWithBorder key={Input.Name}>
        <Group position='apart'>
          <Box>
            {!editing ? (
              <Group position='apart'>
                <Box
                  sx={theme => ({
                    padding: theme.spacing.md,
                    border: `1px solid ${theme.colors.members[1]}`,
                    background: theme.fn.linearGradient(
                      45,
                      theme.colors.blue[5],
                      theme.colors.cyan[5]
                    ),
                    borderRadius: '5px',
                    textAlign: 'right',
                  })}
                >
                  <P color={2} marginBottom={0}>
                    {user?.attributes[Input.Field] || 'Required'}
                  </P>
                </Box>
                {user?.attributes[Input.Field] ? (
                  <ActionIcon
                    variant='filled'
                    sx={theme => ({
                      backgroundColor: theme.colors.members[6],
                    })}
                  >
                    {' '}
                    <IconCheck size={18} />
                  </ActionIcon>
                ) : (
                  false
                )}
              </Group>
            ) : (
              <div className='form-group'>
                {loading ? (
                  <FixturaLoading />
                ) : (
                  <>
                    <input
                      type='text'
                      className='form-control'
                      value={value}
                      placeholder={value}
                      onChange={handleValueChange}
                    />
                    {error && (
                      <P
                        color={8}
                        size={'xs'}
                        lineHeight={`2em`}
                        marginBottom={0}
                        textAlign='center'
                      >
                        {error}
                      </P>
                    )}
                  </>
                )}
              </div>
            )}
          </Box>

          <Box>
            <Group position='right'>
              {!editing ? (
                <BTN_ONCLICK
                  LABEL='Edit'
                  HANDLE={() => setEditing(true)}
                  THEME='cta'
                />
              ) : (
                <>
                  {canCancel ? (
                    <BTN_ONCLICK
                      LABEL='Cancel'
                      HANDLE={() => setEditing(false)}
                      THEME='error'
                    />
                  ) : (
                    false
                  )}

                  <BTN_ONCLICK
                    LABEL='Save'
                    HANDLE={handleSubmit}
                    idDisabled={disabled}
                    THEME='success'
                  />
                </>
              )}
            </Group>
          </Box>
        </Group>
      </PaperWithBorder>

      <Space h={20} />
    </>
  );
};

const LabelMe = ({ label }) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return (
    <Wrapper px={mobile ? 0 : 'sm'}>
      <P
        color={7}
        Weight={900}
        marginBottom={0}
        size={mobile ? 'sm' : 'md'}
        textTransform={'uppercase'}
      >
        {label}
      </P>
    </Wrapper>
  );
};
