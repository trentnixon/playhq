// Importing necessary libraries and functions
import styled from 'styled-components';
import {getBackgroundColor, getContrastColor} from '../../../../utils/colors';

// Styled components for player performances
const BestPlayersContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	padding: 0 10px;
`;

const PerformancesContainer = styled.div`
	display: flex;
	flex-direction: column; // Players are listed vertically within each team's column
	width: 50%; // Each team's performances take up half the container width
`;

const PlayerList = styled.ul`
	margin: 0;
	padding: 0;
	list-style: none;
`;

const PlayerItem = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${(props) => props.bgColor};
	border-radius: ${(props) => props.borderRadius};
	padding: 7px 10px;
	margin: 2px;
`;

const PlayerName = styled.span`
	font-size: 2em;
	color: ${(props) => props.color};
	flex: 3; // Name takes up more space to accommodate longer names
`;

// Main component updated to handle AFL player stats, separated into home and away
export const BestPlayersAsString = ({
	matchData,
	TemplateVariation,
	StyleConfig,
}) => {
	const {Font, Color} = StyleConfig;
	const {teams} = matchData;
	const totalPlayers = teams.home.bestPlayers.length + teams.away.bestPlayers.length;
	// Function to sort and render top 5 player performance items for each team
	const renderTopPerformers = (players) => {
		// Joining player names into a single string separated by commas
		const playerNamesString = players.join(', ');
		return (
			<PlayerItem
				style={{
					borderRadius: TemplateVariation.borderRadius,
					padding: '7px 10px',
					margin: '2px',
					...Font.Copy, // Apply the font styling
				}}
			>
				<PlayerName
					color={getContrastColor(
						getBackgroundColor(Color.Primary.Main, Color.Secondary.Main)
					)}
				>
					{playerNamesString}
				</PlayerName>
			</PlayerItem>
		);
	};

	
	if (!totalPlayers) return false;
	return (
		<>
			<BestPlayerLabel Font={Font} Color={Color} />

			<BestPlayersContainer>
				<PerformancesContainer>
					<PlayerList>
						{renderTopPerformers(
							matchData.teams.home.bestPlayers,
							Color.Primary.Main,
							Color.Primary.Contrast
						)}
					</PlayerList>
				</PerformancesContainer>
				<PerformancesContainer>
					<PlayerList>
						{renderTopPerformers(
							matchData.teams.away.bestPlayers,
							Color.Secondary.Main,
							Color.Secondary.Contrast
						)}
					</PlayerList>
				</PerformancesContainer>
			</BestPlayersContainer>
		</>
	);
};

const BestPlayerLabel = ({Font, Color}) => {
	return (
		<PlayerName
			style={{
				textAlign: 'center',
				fontSize: '1.5em',
				color: getContrastColor(
					getBackgroundColor(Color.Primary.Main, Color.Secondary.Main)
				),
				...Font.Copy,
			}}
		>
			Best Players
		</PlayerName>
	);
};
// Dev Notes:
// - Modified the PlayerPerformances component to split the display of home and away top goal scorers.
// - The component now features two separate lists for each team positioned side by side.
// - Updated the component to include player numbers in the key to avoid potential React key conflicts.
// - Each list highlights the top 5 players in terms of goals scored for their respective teams.

// LLM Notes:
// This PlayerPerformances component is now specialized for displaying top AFL player stats in a video format.
// It's used within a sports broadcasting application and designed to fit within the `components/PlayerPerformances` directory.
// The component is integrated with Remotion for video sequencing and uses styled-components for styles.
// It accepts a matchData prop with separate playerStats arrays for home and away teams, displaying the top 5 scorers from each.
