import {MatchContainer} from './MatchContainer';
import {HeaderContainer} from './HeaderContainer';
import {TeamsAndScores} from './TeamsAndScores';
import styled from 'styled-components';
import {useStylesContext} from '../../../../../../context/StyleContext';

export const CNSWFixtureBuild = (props) => {
	const {matchData} = props;
	return (
		<>
			<DisplayMatchResult Result={matchData.result} />

			<MatchContainer>
				<DisplayGradeName matchData={matchData} />
				<TeamsAndScores matchData={matchData} />
				<HeaderContainer matchData={matchData} />
			</MatchContainer>
		</>
	);
};

const GradeName = styled.h2`
	font-style: normal;
	font-weight: 400;
	font-size: 2em;
	line-height: 1em;
	letter-spacing: -0.085em;
	text-transform: uppercase;
	margin: 10px 0;
	text-align: right;
`;
const DisplayGradeName = (props) => {
	const {StyleConfig} = useStylesContext();
	const {Color} = StyleConfig;
	return (
		<GradeName
			style={{
				color: Color.Primary.Contrast,
				...StyleConfig.Font.Copy,
			}}
		>
			{props.matchData.gradeName}
		</GradeName>
	);
};

const MatchResult = styled.h2`
	font-style: normal;
	font-weight: 600;
	font-size: 3em;
	line-height: 1em;
	letter-spacing: -0.085em;
	text-transform: uppercase;
	margin: 10px 0;
	text-align: center;
`;
const DisplayMatchResult = (props) => {
	const {StyleConfig} = useStylesContext();
	const {Color} = StyleConfig;
	return (
		<MatchResult
			style={{
				color: Color.Primary.Contrast,
				...StyleConfig.Font.Copy,
			}}
		>
			{props.Result}
		</MatchResult>
	);
};
