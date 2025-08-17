import { Box, Group } from '@mantine/core';
import { ShadowWrapper, Wrapper } from './Common/Containers';
import { P } from './Common/Type';
import { Input_FixturaSetting } from './Common/formelements/Input_FixtruaSettings';
import { BTN_TOINTERALLINK } from './Common/utils/Buttons';

export const UserDetails = ({
  user,
  setHasUpdated,
  subscriptionTier,
  Value,
}) => {
  //console.log(subscriptionTier);
  const INPUTS = [
    {
      Name: 'Name',
      Label: 'Who would you like the emails addressed to?',
      Field: 'FirstName',
      Validators: [value => value.length > 0 || 'Name is required'],
    },
    {
      Name: 'Email',
      Label: 'Email address for delivery',
      Field: 'DeliveryAddress',
      Validators: [
        value => value.length > 0 || 'Email is required',
        value => value.includes('@') || 'Email must contain @',
      ],
    },
  ];

  return (
    <>
      <Wrapper>
        <Group position='apart'>
          <P
            color={4}
            Weight={900}
            marginBottom={0}
            textTransform={'uppercase'}
          >
            Plan
          </P>
          <P
            color={6}
            Weight={900}
            marginBottom={0}
            textTransform={'uppercase'}
          >
            {Value}
          </P>
        </Group>
      </Wrapper>
      <ShadowWrapper>
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
            <P
              color={6}
              Weight={400}
              marginBottom={0}
              textTransform={'uppercase'}
            >
              {subscriptionTier?.Name}
            </P>
          </Box>
          <BTN_TOINTERALLINK
            LABEL={'View Plan'}
            URL={`/members/myplan`}
            THEME='info'
          />
        </Group>
      </ShadowWrapper>

      {INPUTS.map((Input, i) => {
        return (
          <Input_FixturaSetting
            key={i}
            Input={Input}
            user={user}
            setHasUpdated={setHasUpdated}
          />
        );
      })}
    </>
  );
};

export const UserDetailsForSetup = ({
  user,
  setHasUpdated,
  updateLocalProgress,
}) => {
  const INPUTS = [
    {
      Name: 'Name',
      Label: 'Who would you like the Content email addressed to?',
      Field: 'FirstName',
      Validators: [value => value.length > 0 || 'Name is required'],
    },
    {
      Name: 'Email',
      Label: 'Email address for delivery',
      Field: 'DeliveryAddress',
      Validators: [
        value => value.length > 0 || 'Email is required',
        value => value.includes('@') || 'Email must contain @',
      ],
    },
  ];

  return (
    <>
      {INPUTS.map((Input, i) => {
        return (
          <Input_FixturaSetting
            key={i}
            Input={Input}
            user={user}
            setHasUpdated={setHasUpdated}
            editingState={true}
            canCancel={false}
            onSelectionChange={value =>
              updateLocalProgress &&
              updateLocalProgress({ [Input.Field]: value })
            }
          />
        );
      })}
    </>
  );
};
