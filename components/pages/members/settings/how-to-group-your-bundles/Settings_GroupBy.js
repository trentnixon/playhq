import { Group } from "@mantine/core";
import { ShadowWrapper } from "../../../../Members/Common/Containers";
import { P,SubHeaders } from "../../../../Members/Common/Type";
import { BTN_TOINTERALLINK } from "../../../../Members/Common/utils/Buttons";
import { useAccountDetails } from "../../../../../lib/userContext";
import { FindAccountType } from "../../../../../lib/actions";

export const Setting_GroupBy = () => {
  const { account } = useAccountDetails();

  if (!account?.attributes) return;
  //console.log(account.attributes.group_assets_by);
  const AccType = FindAccountType(account);

  const GroupByValue = account?.attributes.group_assets_by;
  const settings = {
    Association: {
      label: "How would you like your Competitions Grouped?",
      descriptions: {
        true: "Your assets are currently grouped by Grade, ensuring that each grade within every competition has its own distinct set of assets.",
        false:
          "Your assets are currently grouped by Competition Name, meaning all grades within a specific competition will be consolidated, allowing for a comprehensive assessment of the entire competition as a unified entity.",
      },
      true: "Grade",
      false: "Competition Name",
    },
    Club: {
      label: "How would you like your Teams Grouped?",
      descriptions: {
        true: "Your assets are currently grouped by Age Group, distinguishing between Juniors, Seniors, Masters, and others.",
        false:
          "Your assets are currently grouped under Juniors and Seniors, with Masters and Special included in Seniors.",
      },
      true: "All Age groups",
      false: "Junior/Senior",
    },
  };

  return (
    <>
      <SubHeaders Copy={"Bundle Grouping"} />
      <P>{settings[AccType].descriptions[GroupByValue]}</P>
      <ShadowWrapper>
        <Group position="apart">
          <P marginBottom={0}>Select how your weekly bundles will be grouped</P>
          <BTN_TOINTERALLINK
            LABEL={"Change"}
            URL={"/members/settings/how-to-group-your-bundles/"}
          />
        </Group>
      </ShadowWrapper>
    </>
  );
};
