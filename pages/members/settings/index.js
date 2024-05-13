import { PageTitle } from "../../../components/Members/Common/Type";
import Meta from "../../../components/Layouts/Meta";
import { IconSettings } from "@tabler/icons-react";
import { Setting_GroupBy } from "../../../components/pages/members/settings/how-to-group-your-bundles/Settings_GroupBy";
import SecureRouteHOC from "../../../components/Layouts/members/security/SecureRouteHC";
import { Settings_change_day_bundle_arrives } from "../../../components/pages/members/settings/change-day-bundle-arrives/Settings_change_day_bundle_arrives";
import { Divider } from "@mantine/core";
import { Setting_change_brand_logo } from "../../../components/pages/members/settings/change-brand-logo/Setting_change_brand_logo";
import { Setting_change_brand_Colors } from "../../../components/pages/members/settings/change-brand-colors/Setting_change_brand_Colors";

const Settings = () => {
  return (
    <SecureRouteHOC>
      <Meta
        title="Member Settings - Fixtura: Personalize Your Experience"
        description="Personalize your experience on Fixtura by adjusting your member settings. Fine-tune your sports club's digital media preferences."
        keywords="Member settings, Fixtura personalization, sports media customization, club content settings, digital preferences"
      />
      <PageTitle Copy={"Settings"} ICON={<IconSettings size={40} />} />
      {/*  <SubHeaders Copy={"Bundles"} /> */}
      <Settings_change_day_bundle_arrives />
      <Divider my={25} />
      <Setting_GroupBy />
      <Divider my={25} />
      <Setting_change_brand_logo />
      <Divider my={25} />
      <Setting_change_brand_Colors />
    </SecureRouteHOC>
  );
};

export default Settings;
