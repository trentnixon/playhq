import { P, PageTitle } from "../../../components/Members/Common/Type";
import Meta from "../../../components/Layouts/Meta";
import {
  IconBrandDaysCounter,
  IconCalendarEvent,
  IconColorSwatch,
  IconPhoto,
  IconSettings,
  IconTools,
} from "@tabler/icons-react";
import SecureRouteHOC from "../../../components/Layouts/members/security/SecureRouteHC";
import { Group, Paper, SimpleGrid, Text, ThemeIcon, rem } from "@mantine/core";

import { useStyles } from "../../../components/pages/members/index/Dashboard/DashboardCardStyles";
import { BTN_TOINTERALLINK } from "../../../components/Members/Common/utils/Buttons";
import { IconStack } from "@tabler/icons-react";
import { IconUsers } from "@tabler/icons";

//import { Settings_change_day_bundle_arrives } from "../../../components/pages/members/settings/change-day-bundle-arrives/Settings_change_day_bundle_arrives";
//import { Setting_GroupBy } from "../../../components/pages/members/settings/how-to-group-your-bundles/Settings_GroupBy";
//import { Setting_change_brand_logo } from "../../../components/pages/members/settings/change-brand-logo/Setting_change_brand_logo";
//import { Setting_change_brand_Colors } from "../../../components/pages/members/settings/change-brand-colors/Setting_change_brand_Colors";

const Settings = () => {
  const settingsComponents = [
    {
      title: "Asset Delivery",
      description: "Select a day you would like your bundles to arrive.",
      link: "/members/settings/change-day-bundle-arrives/",
      label: "Set Delivery Day",
      icon: <IconBrandDaysCounter size={40} stroke={1.5} />
    },
    {
      title: "Grouping Bundles",
      description: "Configure how your bundles are grouped.",
      link: "/members/settings/how-to-group-your-bundles/",
      label: "Group Bundles",
      icon: <IconStack size={40} stroke={1.5} />
    },
    {
      title: "Brand Logo",
      description: "Update your club's brand logo.",
      link: "/members/settings/change-brand-logo/",
      label: "Update Logo",
      icon: <IconPhoto size={40} stroke={1.5} />
    },
    {
      title: "Brand Colors",
      description: "Customize your brand's primary and secondary colors.",
      link: "/members/settings/change-brand-colors/",
      label: "Customize Colors",
      icon: <IconColorSwatch size={40} stroke={1.5} />
    },
    {
      title: "Sponsors",
      description: "Add or update your club's sponsors.",
      link: "/members/sponsors/",
      label: "Manage Sponsors",
      icon: <IconUsers size={40} stroke={1.5} />
    },
    {
      title: "Media/Images",
      description: "Manage your club's media and image libraries.",
      link: "/members/gallery/",
      label: "Update Media",
      icon: <IconPhoto size={40} stroke={1.5} />
    },
    {
      title: "Template Customization",
      description: "Customize templates for your digital assets and communications.",
      link: "/members/settings/template-customization/",
      label: "Customize Templates",
      icon: <IconTools size={40} stroke={1.5} />
    }
  ];
  

  return (
    <SecureRouteHOC>
      <Meta
        title="Member Settings - Fixtura: Personalize Your Experience"
        description="Personalize your experience on Fixtura by adjusting your member settings. Fine-tune your sports club's digital media preferences."
        keywords="Member settings, Fixtura personalization, sports media customization, club content settings, digital preferences"
      />
      <PageTitle Copy={"Settings"} ICON={<IconSettings size={40} />} />

      <SimpleGrid
        cols={4}
        spacing="xs"
        breakpoints={[
          { maxWidth: "62rem", cols: 3, spacing: "md" },
          { maxWidth: "48rem", cols: 2, spacing: "sm" },
          { maxWidth: "36rem", cols: 1, spacing: "sm" },
        ]}
      >
        {settingsComponents.map((item, index) => (
          <SettingsCard key={index} item={item} />
        ))}
      </SimpleGrid>
    </SecureRouteHOC>
  );
};

export default Settings;

const SettingsCard = ({ item }) => {
  const { title, description, link, label, icon } = item;
  const { classes } = useStyles();
  const ICON_SIZE = rem(60);

  return (
    <Paper
      radius="md"
      withBorder
      shadow="md"
      className={classes.card}
      style={{ marginTop: `calc(${ICON_SIZE} / 3)` }}
    >
      <ThemeIcon
        color="blue.5"
        className={classes.icon}
        size={ICON_SIZE}
        radius={ICON_SIZE}
      >
        {icon}
      </ThemeIcon>
      <P Weight={700} textAlign="center">
        {title}
      </P>

      <P Weight={400} textAlign="center" size={'sm'} color='6'>
        {description}
        </P>
      <Group position="center" my="md">
        <BTN_TOINTERALLINK LABEL={label} URL={link} />
      </Group>
    </Paper>
  );
};

/* <Settings_change_day_bundle_arrives />
        <Setting_GroupBy />
        <Setting_change_brand_logo />
        <Setting_change_brand_Colors /> */
