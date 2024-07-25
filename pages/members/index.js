import React, { useEffect } from "react";
import { PageTitle } from "../../components/Members/Common/Type";
import { IconLayoutDashboard } from "@tabler/icons-react";
import { Space } from "@mantine/core";
import { useAccountDetails } from "../../context/userContext";
import { useUser } from "../../context/authContext";
import { IsFreeTrialFeedback } from "../../components/Members/Account/userIsFreeTrial";

import { PreviewGallery } from "../../components/pages/members/index/Dashboard/userPreview/PreviewGallery";
import SecureRouteHOC from "../../components/Layouts/members/security/SecureRouteHC";
import { PageMetaData } from "../../components/Layouts/members/Meta/pageMetaData";
import { Cards_Account } from "../../components/pages/members/index/Dashboard/Account_Cards/Account_Cards";
import { Cards_Branding } from "../../components/pages/members/index/Dashboard/BrandingCards/Branding_Cards";
import { FixturaLoading } from "../../components/Members/Common/Loading";

const DashBoard = () => {
  const { ReRender, account } = useAccountDetails();
  const { user } = useUser();

  useEffect(() => {
    if (account === null || account.attributes === null) {
      ReRender();
    }
  }, [account, user]);

  if (account === null || account.attributes === null) {
    return <FixturaLoading />;
  }

  const commonProps = {
    Theme: account.attributes.theme.data.attributes.Theme,
    AccountID: account.id,
  };

  const MetaOBJ = {
    title: "Member Dashboard - Fixtura: Your Control Center",
    description:
      "Access your member dashboard on Fixtura to manage and overview your sports club's digital media activities.",
    keywords:
      "Member dashboard, Fixtura control panel, sports media overview, club content management, digital hub",
  };

  return (
    <SecureRouteHOC conditions={[user, account]}>
      <PageMetaData MetaOBJ={MetaOBJ} />

      <PageTitle
        Copy={`Hi ${account.attributes.FirstName || ""}`}
        ICON={<IconLayoutDashboard size={40} />}
      />

      <PreviewGallery />
      <Space h={20} />
      <Cards_Account commonProps={commonProps} />

      <Space h={30} />
      <Cards_Branding commonProps={commonProps} />

      <Space h={50} />

      <IsFreeTrialFeedback />
    </SecureRouteHOC>
  );
};

export default DashBoard;
