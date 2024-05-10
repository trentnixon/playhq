import { P, PageTitle } from "../../../components/Members/Common/Type";
import {
  MembersWrapper,
  Wrapper,
} from "../../../components/Members/Common/Containers";
import Meta from "../../../components/Layouts/Meta";
import { IconSettings } from "@tabler/icons-react";
import { Setting_GroupBy } from "../../../components/pages/members/settings/how-to-group-your-bundles/Settings_GroupBy";

const Settings = () => {
  return (
    <MembersWrapper>
      <Meta
        title="Member Settings - Fixtura: Personalize Your Experience"
        description="Personalize your experience on Fixtura by adjusting your member settings. Fine-tune your sports club's digital media preferences."
        keywords="Member settings, Fixtura personalization, sports media customization, club content settings, digital preferences"
      />
      <PageTitle Copy={"Settings"} ICON={<IconSettings size={40} />} />
      <P>
        Adjust your bundle grouping settings to organize account bundles by
        categories—clubs can sort by age, while associations can organize by
        competition or grade, ensuring streamlined access and management
        tailored to your specific needs.
      </P>
      <Wrapper px={'5%'}>
          <Setting_GroupBy />
        </Wrapper>
    </MembersWrapper>
  );
};

export default Settings;
