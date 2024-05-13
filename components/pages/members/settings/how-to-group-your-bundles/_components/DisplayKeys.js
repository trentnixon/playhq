import { Table } from "@mantine/core";
import {
  FindAccountType,
  FindAccountTypeOBJ,
} from "../../../../../../lib/actions";

import { P, SectionHeaders } from "../../../../../Members/Common/Type";
import { useGetOrganizationDetails } from "../../../../../../Hooks/useGetOrganizationDetails";
import { useAccountDetails } from "../../../../../../lib/userContext";
import {
  categorizeTeamsByAgeGroup,
  categorizeTeamsBySeniorJunior,
  groupByCompetitionAndGrade,
  groupByCompetitionName,
} from "../../../../../../utils/group_assets_by";
import { BundleGroupingWarning } from "./BundleGroupingWarning";
import { Wrapper } from "../../../../../Members/Common/Containers";
import { RoundedSectionContainer } from "../../../../../UI/Containers/SectionContainer";

export const DisplayKeys = ({ switchValue }) => {
  const { account } = useAccountDetails();
  const AccType = FindAccountType(account);
  const accountId = FindAccountTypeOBJ(account).id;

  const {
    data: organizationDetails,
    loading: loadingOrgDetails,
    error,
  } = useGetOrganizationDetails(AccType, accountId);

  if (loadingOrgDetails) return null;

  console.log(
    "organizationDetails ",
    organizationDetails?.data?.attributes?.teams?.data
  );
  // Ensuring useComps is consistently defined
  const useComps =
    organizationDetails?.data?.attributes?.competitions?.data || [];
  const useTeams = organizationDetails?.data?.attributes?.teams?.data;
  // Using useMemo to memoize and filter competitions with future endDate

  const currentDate = new Date();
  const filteredComps = useComps.filter(
    (comp) => new Date(comp.attributes.endDate) > currentDate
  );

  console.log("AccType ", AccType);
  let groupedComps;
  if (AccType === "Club") {
    groupedComps = switchValue
      ? categorizeTeamsByAgeGroup(useTeams)
      : categorizeTeamsBySeniorJunior(useTeams);
  } else {
    groupedComps = switchValue
      ? groupByCompetitionAndGrade(filteredComps)
      : groupByCompetitionName(filteredComps);
  }

  // Using useMemo to memoize the keys extracted from groupedComps
  const keys = Object.keys(groupedComps);

  return (
    <RoundedSectionContainer
      headerContent="Expected Grouping"
      topContent={<ContainerTopSection keys={keys} />}
      bottomContent={<ContainerBottomSection keys={keys} />}
    />
  );
};

const ContainerTopSection = ({ keys }) => {
  return (
    <>
      <P marginBottom={0}>
        How your Bundle will be grouped {keys.length} Bundle Categories
      </P>
      <BundleGroupingWarning NumItems={keys.length} />
    </>
  );
};

const ContainerBottomSection = ({ keys }) => {
  return (
    <Wrapper px="xl">
      <Table my={0}>
        <tbody>
          {keys.map((key, index) => (
            <tr key={index}>
              <td>
                <P textAlign="left" marginBottom={0}>
                  {decodeURIComponent(key)}
                </P>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};
