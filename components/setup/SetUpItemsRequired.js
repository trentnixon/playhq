import { List, Paper } from "@mantine/core";
import { P } from "../Members/Common/Type";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconMail,
  IconUser,
  IconBuilding,
  IconPalette,
  IconSettings,
  IconBrandStripe,
  IconShield,
  IconUsers,
} from "@tabler/icons-react";

export const SetUpItemsRequired = () => {
  const matches = useMediaQuery("(min-width: 48em)");
  return (
    <Paper shadow="sm" p="md" withBorder>
      <List spacing="xs" size="sm" center>
        <List.Item
          icon={<IconMail stroke={1.5} size="2rem" color={"#6699CC"} />}
        >
          <P Weight={600} marginBottom={0} color={7}>
            Email Delivery
          </P>
          {matches ? (
            <P>Email of the person to receive the asset email each week.</P>
          ) : (
            false
          )}
        </List.Item>
        <List.Item
          icon={<IconUser stroke={1.5} size="2rem" color={"#6699CC"} />}
        >
          <P Weight={600} marginBottom={0} color={7}>
            Recipient's Name
          </P>
          {matches ? (
            <P>Name of the person the email should be addressed to.</P>
          ) : (
            false
          )}
        </List.Item>
        <List.Item
          icon={<IconBuilding stroke={1.5} size="2rem" color={"#6699CC"} />}
        >
          <P Weight={600} marginBottom={0} color={7}>
            Organization Type
          </P>
          {matches ? (
            <P>Select the type of organization you represent.</P>
          ) : (
            false
          )}
        </List.Item>
        <List.Item
          icon={<IconUsers stroke={1.5} size="2rem" color={"#6699CC"} />}
        >
          <P Weight={600} marginBottom={0} color={7}>
            Association
          </P>
          {matches ? (
            <P>
              Choose the appropriate association, if multiple are applicable.
            </P>
          ) : (
            false
          )}
        </List.Item>
        <List.Item
          icon={<IconShield stroke={1.5} size="2rem" color={"#6699CC"} />}
        >
          <P Weight={600} marginBottom={0} color={7}>
            Club Name
          </P>
          {matches ? (
            <P>Provide the club name if applicable to your organization.</P>
          ) : (
            false
          )}
        </List.Item>
        <List.Item
          icon={<IconBrandStripe stroke={1.5} size="2rem" color={"#6699CC"} />}
        >
          <P Weight={600} marginBottom={0} color={7}>
            Organization Logo
          </P>
          {matches ? (
            <P>Upload the logo that represents your organization.</P>
          ) : (
            false
          )}
        </List.Item>
        <List.Item
          icon={<IconPalette stroke={1.5} size="2rem" color={"#6699CC"} />}
        >
          <P Weight={600} marginBottom={0} color={7}>
            Brand Colors
          </P>
          {matches ? (
            <P>
              Select the color scheme that aligns with your organization's
              branding.
            </P>
          ) : (
            false
          )}
        </List.Item>
      </List>
    </Paper>
  );
};
