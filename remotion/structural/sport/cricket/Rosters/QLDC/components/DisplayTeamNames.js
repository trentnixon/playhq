import styled from 'styled-components';
import {DisplayTeamName} from '../../../../../../templates/QLDC/Components/Common/DEPRECATED_CommonVariables';
import {useStylesContext} from '../../../../../../context/StyleContext';

const LogoContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 90%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	align-content: center;
	min-height: auto;
`;

export const DisplayTeamNames = (props) => {
	const {matchData} = props;
	const {teamAway, teamHome, isHomeTeam} = matchData;
	const {StyleConfig, TextStyles} = useStylesContext();
	const {Font, Color} = StyleConfig;

	const TeamNameStyles = {
		...Font.Copy,
		...TextStyles.copyMedium,
		color: Color.Primary.Contrast,
		width: '100%',
		margin: '15px 5px',
		textTransform: 'uppercase',
		textAlign: 'center',
	};
	return (
		<LogoContainer>
			<DisplayTeamName
				name={isHomeTeam ? teamHome : teamAway}
				customStyles={TeamNameStyles}
			/>

			<DisplayTeamName
				name={isHomeTeam ? teamAway : teamHome}
				customStyles={TeamNameStyles}
			/>
			<DisplayTeamName
				TEAM={isHomeTeam ? teamHome : teamAway}
				STYLE={{
					color: Color.Primary.Contrast,
				}}
			/>
			<DisplayTeamName
				TEAM={isHomeTeam ? teamAway : teamHome}
				STYLE={{
					color: Color.Primary.Contrast,
				}}
			/>
		</LogoContainer>
	);
};
