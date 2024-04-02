import React, { useEffect, useState } from "react";
import { P, PageTitle, SubHeaders } from "../../components/Members/Common/Type";
import {
  IconLayoutDashboard,
  IconDownload,
  IconBrush,
  IconPhotoPlus,
  IconCurrencyDollar,
  IconCarouselHorizontalFilled,
  IconUserCircle,
  IconColorSwatch,
  IconSettings,
} from "@tabler/icons-react";
import {
  MembersWrapper,
  PageCopyWrapper,
} from "../../components/Members/Common/Containers";
import {
  Center,
  Container,
  Group,
  Paper,
  Progress,
  SimpleGrid,
  Space,
  useMantineTheme,
} from "@mantine/core";
import { LoadingStateWrapper } from "../../components/Members/Account/HOC/LoadingStateWrapper";

import { useAccountDetails } from "../../lib/userContext";
import { DashBoardRenders } from "../../components/Members/Dashboard/Renders";
import { DashBoardTheme } from "../../components/Members/Dashboard/Theme";
import { DashBoardGalleryItems } from "../../components/Members/Dashboard/GalleryItems";
import { DashBoardSponsoredItems } from "../../components/Members/Dashboard/SponsorItems";
import { DashBoardTrackingItems } from "../../components/Members/Dashboard/TrackingItems";
import { DashBoardSubscriptionItems } from "../../components/Members/Dashboard/SubscriptionItems";
import SetupCheck from "../../components/Members/Account/HOC/SetupCheck";
import { useUser } from "../../lib/authContext";
import { DashBoardAssets } from "../../components/Members/Dashboard/Assets";
import { IsFreeTrialFeedback } from "../../components/Members/Account/userIsFreeTrial";
import { IsFreeTrialWelcome } from "../../components/Members/Account/components/isTrialNotifications.js/FreeTrialMessaging";
import Meta from "../../components/Layouts/Meta";
import { GroupBySwitch } from "../../components/Members/Account/components/Settings/GroupBySwitch";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { PreviewGallery } from "../../components/Members/Dashboard/PreviewGallery";
import { BTN_TOINTERALLINK } from "../../components/Members/Common/utils/Buttons";

const DashBoard = () => {
  const { account } = useAccountDetails();
  const { user, loading } = useUser();

  useEffect(() => {}, [account]);

  useEffect(() => {}, [account, user]);

  if (!account || !account.attributes) {
    return (
      <MembersWrapper>
        <SetupCheck>
          <LoadingStateWrapper conditions={[user, account]}>
            <PageTitle
              Copy="Fetching Details"
              ICON={<IconLayoutDashboard size={40} />}
            />
            <PageCopyWrapper>
              <P>Please wait whilst we build your dashboard</P>
            </PageCopyWrapper>
          </LoadingStateWrapper>
        </SetupCheck>
      </MembersWrapper>
    );
  } 

  const commonProps = {
    Theme: account.attributes.theme.data.attributes.Theme,
    AccountID: account.id,
  };

  const dashboardConfig = [
    {
      title: "Subscriptions",
      component: DashBoardSubscriptionItems,
      icon: IconCurrencyDollar,
      extraProps: { user: account },
    },
    {
      title: "Downloads",
      component: DashBoardRenders,
      icon: IconDownload,
      extraProps: { schedulerID: account.attributes.scheduler.data.id },
    },
    {
      title: "Sponsors",
      component: DashBoardSponsoredItems,
      icon: IconCurrencyDollar,
      extraProps: { sponsors: account.attributes.sponsors.data },
    },
    {
      title: "Tracking",
      component: DashBoardTrackingItems,
      icon: IconCurrencyDollar,
      extraProps: {},
    },
  ];

  const brandingConfig = [
    {
      title: "Gallery",
      component: DashBoardGalleryItems,
      icon: IconPhotoPlus,
      extraProps: {},
    },
    {
      title: "Theme",
      component: DashBoardTheme,
      icon: IconBrush,
      extraProps: {
        theme: account.attributes.theme.data.attributes.Theme,
      },
    },
    {
      title: "Assets",
      component: DashBoardAssets,
      icon: IconBrush,
      extraProps: {
        template: account.attributes.template.data,
      },
    },
  ];

  return (
    <MembersWrapper>
      <SetupCheck>
        <LoadingStateWrapper conditions={[user, account]}>
          <Meta
            title="Member Dashboard - Fixtura: Your Control Center"
            description="Access your member dashboard on Fixtura to manage and overview your sports club's digital media activities."
            keywords="Member dashboard, Fixtura control panel, sports media overview, club content management, digital hub"
          />
           {/* <IsFreeTrialWelcome user={account} /> */}
          <PageTitle
            Copy={`Hi ${account.attributes.FirstName}`}
            ICON={<IconLayoutDashboard size={40} />}
          />
         

          <SubHeaders
            Copy="Preview"
            ICON={<IconCarouselHorizontalFilled size={30} />}
          />
          <P>
            Preview your assets here with our sample data. For a look that
            perfectly fits your brand, don't forget to visit our customization
            section
          </P>
          <PreviewGallery account={account} />
          <Group position="right">
            <BTN_TOINTERALLINK
              LABEL={"Customizer"}
              URL={"/members/customizer/"}
            />
          </Group>

          {/*   <SubHeaders Copy="DashBoard" /> */}

          <Space h={20} />
          <SubHeaders Copy="Account" ICON={<IconUserCircle size={30} />} />
          <SimpleGrid
            cols={4}
            spacing="xs"
            breakpoints={[
              { maxWidth: "62rem", cols: 3, spacing: "md" },
              { maxWidth: "48rem", cols: 2, spacing: "sm" },
              { maxWidth: "36rem", cols: 1, spacing: "sm" },
            ]}
          >
            {dashboardConfig.map((item, index) => {
              const Component = item.component;
              return (
                <div key={index}>
                  <Component
                    IconComponent={item.icon}
                    {...commonProps}
                    {...item.extraProps}
                  />
                </div>
              );
            })}
          </SimpleGrid>
          <Space h={50} />
          <SubHeaders Copy="Branding" ICON={<IconColorSwatch size={30} />} />
          <SimpleGrid
            cols={3}
            spacing="lg"
            breakpoints={[
              { maxWidth: "62rem", cols: 3, spacing: "md" },
              { maxWidth: "48rem", cols: 2, spacing: "sm" },
              { maxWidth: "36rem", cols: 1, spacing: "sm" },
            ]}
          >
            {brandingConfig.map((item, index) => {
              const Component = item.component;
              return (
                <div key={index}>
                  <Component
                    IconComponent={item.icon}
                    {...commonProps}
                    {...item.extraProps}
                  />
                </div>
              );
            })}
          </SimpleGrid>
        {/*   <Space h={50} />
          <SubHeaders Copy="Settings" ICON={<IconSettings size={30} />} />
          <GroupBySwitch account={account} /> */}
          <Space h={50} />
          <IsFreeTrialFeedback />
        </LoadingStateWrapper>
      </SetupCheck>
    </MembersWrapper>
  );
};

export default DashBoard;

function AccountProgress({ progress }) {
  return (
    <Progress value={progress} label="Set up progress" size="xl" radius="xl" />
  );
}
