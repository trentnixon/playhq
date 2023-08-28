import { List, Paper } from "@mantine/core";
import { P } from "../Members/Common/Type";
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
    return (
      <Paper shadow="sm" p="md" withBorder>
        <List spacing="xs" size="sm" center>
          <List.Item
            icon={<IconMail stroke={1.5} size="2rem" color={"#6699CC"} />}
          >
            <P Weight={600} marginBottom={0} color={4}>
              Email Delivery
            </P>
            <P>Email of the person to receive the asset email each week.</P>
          </List.Item>
          <List.Item
            icon={<IconUser stroke={1.5} size="2rem" color={"#6699CC"} />}
          >
            <P Weight={600} marginBottom={0} color={4}>
              Recipient's Name
            </P>
            <P>Name of the person the email should be addressed to.</P>
          </List.Item>
          <List.Item
            icon={<IconBuilding stroke={1.5} size="2rem" color={"#6699CC"} />}
          >
            <P Weight={600} marginBottom={0} color={4}>
              Organization Type
            </P>
            <P>Select the type of organization you represent.</P>
          </List.Item>
          <List.Item
            icon={<IconUsers stroke={1.5} size="2rem" color={"#6699CC"} />}
          >
            <P Weight={600} marginBottom={0} color={4}>
              Association
            </P>
            <P>Choose the appropriate association, if multiple are applicable.</P>
          </List.Item>
          <List.Item
            icon={<IconShield stroke={1.5} size="2rem" color={"#6699CC"} />}
          >
            <P Weight={600} marginBottom={0} color={4}>
              Club Name
            </P>
            <P>Provide the club name if applicable to your organization.</P>
          </List.Item>
          <List.Item
            icon={<IconBrandStripe stroke={1.5} size="2rem" color={"#6699CC"} />}
          >
            <P Weight={600} marginBottom={0} color={4}>
              Organization Logo
            </P>
            <P>Upload the logo that represents your organization.</P>
          </List.Item>
          <List.Item
            icon={<IconPalette stroke={1.5} size="2rem" color={"#6699CC"} />}
          >
            <P Weight={600} marginBottom={0} color={4}>
              Brand Colors
            </P>
            <P>
              Select the color scheme that aligns with your organization's
              branding.
            </P>
          </List.Item>
        </List>
      </Paper>
    );
  };