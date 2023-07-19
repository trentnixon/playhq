import { Box, Group } from "@mantine/core";
import { ShadowWrapper, Wrapper } from "./Common/Containers";
import { P } from "./Common/Type";
import { Input_FixturaSetting } from "./Common/formelements/Input_FixtruaSettings";
import { BTN_ONCLICK, BTN_TOINTERALLINK } from "./Common/utils/Buttons";
export const UserDetails = ({
  user,
  setHasUpdated,
  subscriptionTier,
  Value,
}) => {
  console.log(subscriptionTier);
  const INPUTS = [
    {
      Name: "Name",
      Label: "Account Holders Name",
      Field: "FirstName",
    },
    {
      Name: "Email",
      Label: "Email address for delivery",
      Field: "DeliveryAddress",
    },
  ];

  return (
    <>
      <Wrapper>
        <Group position="apart">
          <P
            color={4}
            Weight={900}
            marginBottom={0}
            textTransform={"uppercase"}
            Copy={`Plan`}
          />
          <BTN_TOINTERALLINK LABEL={"View Plan"} URL={`/members/myplan`} THEME="info" /> 
        </Group>
      </Wrapper>
      <ShadowWrapper>
        <Group position="apart">
          <Box
            sx={(theme) => ({
              padding: theme.spacing.md,
              border: `1px solid ${theme.colors.members[1]}`,
              background: theme.fn.linearGradient(
                45,
                theme.colors.blue[5],
                theme.colors.cyan[5]
              ),
              borderRadius: "5px",
              textAlign: "right",
            })}
          >
            <P
              color={0}
              Weight={400}
              marginBottom={0}
              textTransform={"uppercase"}
              Copy={subscriptionTier.Name}
            />
          </Box>

          <P
            color={2}
            Weight={400}
            marginBottom={0}
            textTransform={"uppercase"}
            Copy={Value}
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
