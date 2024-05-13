import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconColorSwatch, IconPhoto } from "@tabler/icons";
import { IconBrandDaysCounter } from "@tabler/icons-react";
import Link from "next/link";
export const CTAIconBundle = () => {
  return (
    <Group position="center" spacing={2} mt={10}>
      <IconChangeLogo />
      <IconChangeBrand />
      <IconSelectDay />
    </Group>
  );
};

export const IconChangeBrand = () => {
  return (
    <TooltipIconLink
      icon={IconColorSwatch}
      title="Update Brand Colors"
      href="/members/settings/change-brand-colors/"
    />
  );
};

export const IconChangeLogo = () => {
  return (
    <TooltipIconLink
      icon={IconPhoto}
      title="Update Logo"
      href="/members/settings/change-brand-logo/"
    />
  );
};

export const IconSelectDay = () => {
  return (
    <TooltipIconLink
      icon={IconBrandDaysCounter}
      title="Update Delivery Day"
      href="/members/settings/change-day-bundle-arrives/"
    />
  );
};

const TooltipIconLink = ({ icon: Icon, title, href }) => {
  return (
    <Tooltip label={title} position="top" withArrow arrowPosition="center">
      <ActionIcon
        color="gray"
        radius="md"
        variant="filled"
        component={Link}
        title={title}
        aria-label={title}
        href={href}
        sx={(theme) => ({
          "&:hover": {
            backgroundColor: theme.colors.gray[9],
            color: theme.colors.gray[0],
          },
        })}
      >
        <Icon size="1.125rem" />
      </ActionIcon>
    </Tooltip>
  );
};
