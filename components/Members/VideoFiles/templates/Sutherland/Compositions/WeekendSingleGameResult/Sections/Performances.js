import styled from 'styled-components';
import {
	getContrastColor,
	darkenColor,
	lightenColor,
	setOpacity,
} from '../../../../../utils/colors';

import {useCurrentFrame} from 'remotion';
import {restrictName, restrictString} from '../../../../../utils/copy';
const VideoContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	padding: 20px 10px;
`;

const PerformancesContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 50%;
	&:first-child {
		margin-right: 5px;
	}
	border-radius: 5px;
	border: 1px solid rgba(255, 255, 255, 0.2);
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(20px);
`;

const PerformanceList = styled.ul`
	font-family: 'Oswald';
	margin: 0px 0 0 0;
	padding: 0;
	list-style: none;
	width: 100%;
	letter-spacing: 0.02em;
`;
const PerformanceItem = styled.li`
	display: flex;
	align-items: center;
	//background-color: ${(props) => props.bgColor};
	padding: 4px 15px;
	margin-bottom: 0px;
	width: auto;
`;

const Name = styled.span`
	font-size: 2.1em;
	font-weight: 400;
	color: ${(props) => props.color};
	width: 70%;
	margin-right: 2px;
`;

const Performance = styled.span`
	font-size: 2em;
	font-weight: 400;
	color: ${(props) => props.color};
	text-align: right;
	width: 30%;
	margin-left: 10px;
`;
const LabelWrapper = styled.div`
	font-size: 1.6em;
	font-weight: 900;
	text-align: left;
	color: ${(props) => props.color};
	margin: 15px 10px 5px;
	
`;

export const PlayerPerformances = ({
	homeTeam,
	awayTeam,
	THEME,
	fontFamily,
	FPS_SCORECARD,
}) => {
	const frame = useCurrentFrame();
	return (
		<VideoContainer>
			<PerformancesContainer>
				<PerformanceList fontFamily={fontFamily}>
					<LabelWrapper color={darkenColor(THEME.secondary)}>
						Batting
					</LabelWrapper>
					{homeTeam.battingPerformances.map((performance, index) => (
						<PerformanceItem key={`home-batting-${index}`}>
							<Name color={getContrastColor(THEME.primary)}>
								{restrictName(performance.player, 20)}
							</Name>
							<Performance
								bgColor={setOpacity(THEME.secondary, 0.7)}
								color={getContrastColor(setOpacity(THEME.primary, 0.7))}
							>
								{`${performance.runs} (${performance.balls})`}
							</Performance>
						</PerformanceItem>
					))}
					<LabelWrapper color={darkenColor(THEME.primary)}>
						Bowling
					</LabelWrapper>

					{awayTeam.bowlingPerformances.map((performance, index) => (
						<PerformanceItem
							key={`away-bowling-${index}`}
							bgColor={setOpacity(THEME.primary, 0.7)}
						>
							<Name color={getContrastColor(THEME.primary)}>
								{restrictName(performance.player, 20)}
							</Name>
							<Performance
								color={getContrastColor(THEME.primary)}
								bgColor={setOpacity(darkenColor(THEME.primary), 0.6)}
							>
								{`${performance.wickets}/${performance.runs} (${performance.overs})`}
							</Performance>
						</PerformanceItem>
					))}
				</PerformanceList>
			</PerformancesContainer>

			<PerformancesContainer>
				<PerformanceList fontFamily={fontFamily}>
					<LabelWrapper color={darkenColor(THEME.secondary)}>
						Batting
					</LabelWrapper>
					{awayTeam.battingPerformances.map((performance, index) => (
						<PerformanceItem key={`away-batting-${index}`}>
							<Name color={getContrastColor(darkenColor(THEME.primary))}>
								{restrictName(performance.player, 20)}
							</Name>
							<Performance
								color={getContrastColor(THEME.primary)}
								bgColor={setOpacity(THEME.secondary, 0.8)}
							>
								{`${performance.runs} (${performance.balls})`}
							</Performance>
						</PerformanceItem>
					))}
					<LabelWrapper color={darkenColor(THEME.primary)}>
						Bowling
					</LabelWrapper>
					{homeTeam.bowlingPerformances.map((performance, index) => (
						<PerformanceItem key={`home-bowling-${index}`}>
							<Name color={getContrastColor(darkenColor(THEME.primary))}>
								{restrictName(performance.player, 20)}
							</Name>
							<Performance
								color={getContrastColor(darkenColor(THEME.primary))}
								bgColor={setOpacity(darkenColor(THEME.primary), 0.6)}
							>
								{`${performance.wickets}/${performance.runs} (${performance.overs})`}
							</Performance>
						</PerformanceItem>
					))}
				</PerformanceList>
			</PerformancesContainer>
		</VideoContainer>
	);
};
