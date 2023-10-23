import React, { useEffect, useState } from "react";
import { P, PageTitle, SubHeaders } from "../../components/Members/Common/Type";
import {
  IconLayoutDashboard,
  IconDownload,
  IconBrush,
  IconPhotoPlus,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import {
  MembersWrapper,
  PageCopyWrapper,
} from "../../components/Members/Common/Containers";
import { Container, Progress, SimpleGrid, Space } from "@mantine/core";
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

const DashBoard = () => {
  const { account } = useAccountDetails();
  const { user, loading } = useUser();

  useEffect(() => {
    console.log("Account details:", account);
  }, [account]);

  useEffect(() => {
    console.log(account);
  }, [account, user]);

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
          <PageTitle
            Copy={`Hi ${account.attributes.FirstName}`}
            ICON={<IconLayoutDashboard size={40} />}
          />
          <SubHeaders Copy="DashBoard" />
          <IsFreeTrialWelcome user={account} />
          <PageCopyWrapper>
            <P> Info About deliuvery day and how to change it</P>
          </PageCopyWrapper>

          <Space h={20} />
          <SubHeaders Copy="Account" />
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
          <SubHeaders Copy="Branding" />
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
          <Space h={50} />
         {/*  <SubHeaders Copy="Juniors" />
          <PageCopyWrapper>

            <Container fluid={true} mt={40}>
              <P>Settings for Juniors. Allow Junior Assets, Slpit Juniors and seniors. Opting out</P>
            </Container>
          </PageCopyWrapper> */}
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
