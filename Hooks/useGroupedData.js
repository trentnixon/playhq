import { useMemo } from 'react';
import { useGetOrganizationDetails } from './useGetOrganizationDetails';
import { useAccountDetails } from '../context/userContext';

const useGroupedData = switchValue => {
  const { account } = useAccountDetails();
  const AccType = FindAccountType(account);
  const accountId = FindAccountTypeOBJ(account).id;
  const { data: organizationDetails, loading } = useGetOrganizationDetails(
    AccType,
    accountId
  );

  const currentDate = new Date();
  const filteredComps = useMemo(() => {
    return (
      organizationDetails?.data?.attributes?.competitions?.data || []
    ).filter(comp => new Date(comp.attributes.endDate) > currentDate);
  }, [organizationDetails]);

  const groupedComps = useMemo(() => {
    if (AccType === 'Club') {
      return switchValue
        ? categorizeTeamsByAgeGroup(
            organizationDetails?.data?.attributes?.teams?.data
          )
        : categorizeTeamsBySeniorJunior(
            organizationDetails?.data?.attributes?.teams?.data
          );
    } else {
      return switchValue
        ? groupByCompetitionAndGrade(filteredComps)
        : groupByCompetitionName(filteredComps);
    }
  }, [switchValue, filteredComps, organizationDetails, AccType]);

  return { groupedComps, loading, AccType };
};
