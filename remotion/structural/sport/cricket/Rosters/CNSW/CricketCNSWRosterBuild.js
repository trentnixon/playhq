import styled from 'styled-components';
import { RosterTitleHeader } from '../../../../../templates/CNSW/Components/Header/LogoClubTitleHeader';
import { RosterContainer } from './components/RosterContainer';
import { DisplayRosterData } from './components/DisplayRosterData';
import { RosterSponsors } from './components/RosterSponsors';

export const CricketCNSWRosterBuild = props => {
  return (
    <RosterContainer>
      <RosterTitleHeader />
      <ColumnContainer>
        <DisplayRosterData {...props} />
        <RosterSponsors {...props} />
      </ColumnContainer>
    </RosterContainer>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  max-width: 100%;
  margin-bottom: 0px;
`;
