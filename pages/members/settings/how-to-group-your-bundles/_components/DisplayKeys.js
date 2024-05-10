import { Table } from "@mantine/core";
import {
  FindAccountType,
  FindAccountTypeOBJ,
} from "../../../../../lib/actions";

import { P } from "../../../../../components/Members/Common/Type";
import { useGetOrganizationDetails } from "../../../../../Hooks/useGetOrganizationDetails";
import { useAccountDetails } from "../../../../../lib/userContext";
import {
  categorizeTeamsByAgeGroup,
  categorizeTeamsBySeniorJunior,
  groupByCompetitionAndGrade,
  groupByCompetitionName,
} from "../../../../../utils/group_assets_by";
import { BundleGroupingWarning } from "./BundleGroupingWarning";

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
    <>
      <BundleGroupingWarning NumItems={keys.length} />
      <Table my={20} w={"70%"} mx={'15%'} >
        <thead>
          <tr>
            <th>
              How your Bundle will be grouped {keys.length} Bundle Categories
            </th>
          </tr>
        </thead>
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
    </>
  );
};
