import { P, PageTitle } from '../../../components/Members/Common/Type';
import Meta from '../../../components/Layouts/Meta';
import {
  IconBrandDaysCounter,
  IconCalendarEvent,
  IconColorSwatch,
  IconPhoto,
  IconSettings,
  IconTools,
  IconUserCircle,
  IconArrowsSort,
} from '@tabler/icons-react';
import SecureRouteHOC from '../../../components/Layouts/members/security/SecureRouteHC';
import {
  Group,
  Paper,
  Text,
  ThemeIcon,
  rem,
  Title,
  Stack,
  Table,
  Box,
  Button,
} from '@mantine/core';

import { BTN_TOINTERALLINK } from '../../../components/Members/Common/utils/Buttons';
import { IconStack } from '@tabler/icons-react';
import { IconUsers } from '@tabler/icons';
import { useRouter } from 'next/router';

//import { Settings_change_day_bundle_arrives } from "../../../components/pages/members/settings/change-day-bundle-arrives/Settings_change_day_bundle_arrives";
//import { Setting_GroupBy } from "../../../components/pages/members/settings/how-to-group-your-bundles/Settings_GroupBy";
//import { Setting_change_brand_logo } from "../../../components/pages/members/settings/change-brand-logo/Setting_change_brand_logo";
//import { Setting_change_brand_Colors } from "../../../components/pages/members/settings/change-brand-colors/Setting_change_brand_Colors";

const Settings = () => {
  const settingsCategories = [
    {
      category: 'Account & Profile',
      items: [
        {
          title: 'Account',
          description: 'View and manage your account settings and information.',
          link: '/members/settings/account/',
          label: 'Manage Account',
          icon: <IconUserCircle size={40} stroke={1.5} />,
        },
      ],
    },
    {
      category: 'Asset & Bundle Settings',
      items: [
        {
          title: 'Asset Delivery',
          description: 'Select a day you would like your bundles to arrive.',
          link: '/members/settings/change-day-bundle-arrives/',
          label: 'Set Delivery Day',
          icon: <IconBrandDaysCounter size={40} stroke={1.5} />,
        },
        {
          title: 'Bundle Setting',
          description: 'Configure your bundles.',
          link: '/members/settings/how-to-group-your-bundles/',
          label: 'Bundle Settings',
          icon: <IconStack size={40} stroke={1.5} />,
        },
        {
          title: 'Team and Grade Ordering',
          description: 'Adjust the sort order for your teams or grades.',
          link: '/members/settings/team-grade-ordering/',
          label: 'Manage Order',
          icon: <IconArrowsSort size={40} stroke={1.5} />,
        },
      ],
    },
    {
      category: 'Branding & Identity',
      items: [
        {
          title: 'Brand Logo',
          description: "Update your club's brand logo.",
          link: '/members/settings/change-brand-logo/',
          label: 'Update Logo',
          icon: <IconPhoto size={40} stroke={1.5} />,
        },
        {
          title: 'Brand Colors',
          description: "Customize your brand's primary and secondary colors.",
          link: '/members/settings/change-brand-colors/',
          label: 'Customize Colors',
          icon: <IconColorSwatch size={40} stroke={1.5} />,
        },
        {
          title: 'Sponsors',
          description: "Add or update your club's sponsors.",
          link: '/members/sponsors/',
          label: 'Manage Sponsors',
          icon: <IconUsers size={40} stroke={1.5} />,
        },
      ],
    },
    {
      category: 'Media & Customization',
      items: [
        {
          title: 'Media/Images',
          description: "Manage your club's media and image libraries.",
          link: '/members/gallery/',
          label: 'Update Media',
          icon: <IconPhoto size={40} stroke={1.5} />,
        },
        {
          title: 'Template Customization',
          description:
            'Customize templates for your digital assets and communications.',
          link: '/members/templateBuilder/',
          label: 'Customize Templates',
          icon: <IconTools size={40} stroke={1.5} />,
        },
      ],
    },
  ];

  return (
    <SecureRouteHOC>
      <Meta
        title='Member Settings - Fixtura: Personalize Your Experience'
        description="Personalize your experience on Fixtura by adjusting your member settings. Fine-tune your sports club's digital media preferences."
        keywords='Member settings, Fixtura personalization, sports media customization, club content settings, digital preferences'
      />
      <PageTitle Copy={'Settings'} ICON={<IconSettings size={40} />} />

      <Stack spacing='xl'>
        {settingsCategories.map((section, sectionIndex) => (
          <Box key={sectionIndex}>
            <Title order={3} mb='md' >
              {section.category}
            </Title>
            <Paper shadow='sm' radius='md' withBorder>
              <Table striped highlightOnHover>
                <tbody>
                  {section.items.map((item, itemIndex) => (
                    <SettingsRow key={itemIndex} item={item} />
                  ))}
                </tbody>
              </Table>
            </Paper>
          </Box>
        ))}
      </Stack>
    </SecureRouteHOC>
  );
};

export default Settings;

const SettingsRow = ({ item }) => {
  const { title, description, link, label, icon } = item;
  const router = useRouter();

  return (
    <tr>
      <td style={{ width: '40px' }}>
        <ThemeIcon color='blue.5' size={25} radius='md' variant='light'>
          {icon}
        </ThemeIcon>
      </td>
      <td>
        <Text weight={600} size='md'>
          {title}
        </Text>
        <Text size='sm' color='dimmed' mt={4}>
          {description}
        </Text>
      </td>
      <td style={{ width: '180px', textAlign: 'right' }}>
        <BTN_TOINTERALLINK LABEL={label} URL={link} />
      </td>
    </tr>
  );
};

/* <Settings_change_day_bundle_arrives />
        <Setting_GroupBy />
        <Setting_change_brand_logo />
        <Setting_change_brand_Colors /> */
