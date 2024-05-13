import { Group } from "@mantine/core";
import { P } from "../../../../Members/Common/Type";
import { BTN_TOINTERALLINK } from "../../../../Members/Common/utils/Buttons";
import { useAccountDetails } from "../../../../../lib/userContext";
import { FindAccountType } from "../../../../../lib/actions";
import { RoundedSectionContainer } from "../../../../UI/Containers/SectionContainer";

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
    <RoundedSectionContainer
      headerContent="Bundle Groupings"
      topContent={<ContainerTopSection />}
      bottomContent={
        <ContainerBottomSection
          string={settings[AccType].descriptions[GroupByValue]}
        />
      }
    />
  );
};

const ContainerTopSection = () => {
  return (
    <Group position="apart">
      <P Weight={600} marginBottom={0}>
        Select how your weekly bundles will be grouped
      </P>
      <BTN_TOINTERALLINK
        LABEL={"Group by"}
        URL={"/members/settings/how-to-group-your-bundles/"}
      />
    </Group>
  );
};

const ContainerBottomSection = ({ string }) => {
  return (
    <>
      <P marginBottom={0}>{string}</P>
    </>
  );
};
