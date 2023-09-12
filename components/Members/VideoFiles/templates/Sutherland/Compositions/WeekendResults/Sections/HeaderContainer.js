import styled from 'styled-components';
import {getContrastColor, darkenColor} from '../../../../../utils/colors';
import {useCurrentFrame} from 'remotion';
import {SpringToFrom} from '../../../../../Animation/RemotionSpring';
import {interpolateOpacityByFrame} from '../../../../../Animation/interpolate';
import {
	EraseToMiddleFromTop,
	FromMiddle,
	FromTopToBottom,
} from '../../../../../Animation/ClipWipe';
import { restrictString } from '../../../../../utils/copy';

const HeaderContainerStyles = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 60px;
	padding: 0 10px;

	background-color: ${(props) => darkenColor(props.THEME.secondary)};
`;

const HeaderCopy = styled.p`
	font-family: 'Anton';
	font-style: normal;
	font-weight: 400;
	display: block;
	letter-spacing: -0.015em;
	text-transform: uppercase;
	width: 100%;
	font-size: 1.3em;
`;

const GameType = styled(HeaderCopy)`
	width: 15%;
	font-weight: 900;
`;

const Ground = styled(HeaderCopy)`
	text-align: center;
	width: 60%;
`;

const Round = styled(HeaderCopy)`
	width: 25%;
	text-align: right;
`;

export const HeaderContainer = (props) => {
	const {type, round, THEME, fontFamily, FPS_SCORECARD, gradeName, ground} =
		props;
	const frame = useCurrentFrame();
	return (
		<HeaderContainerStyles
			THEME={THEME}
			style={{
				clipPath: FromMiddle(7, 'Wobbly'),
				opacity: interpolateOpacityByFrame(
					frame,
					FPS_SCORECARD - 30,
					FPS_SCORECARD,
					1,
					0
				),
			}}
		>
			{gradeName}
			<GameType>
				<HeaderCopy
					THEME={THEME}
					fontFamily={fontFamily}
					style={{
						color: getContrastColor(darkenColor(props.THEME.secondary)),
						clipPath: FromTopToBottom(30, 'Slow'),
						opacity: interpolateOpacityByFrame(
							frame,
							FPS_SCORECARD - 30,
							FPS_SCORECARD,
							1,
							0
						),
					}}
				>
					{type}
				</HeaderCopy>
			</GameType>
			<Ground>
				<HeaderCopy
					THEME={THEME}
					fontFamily={fontFamily}
					style={{
						color: getContrastColor(darkenColor(props.THEME.secondary)),
						clipPath: FromTopToBottom(30, 'Slow'),
						opacity: interpolateOpacityByFrame(
							frame,
							FPS_SCORECARD - 30,
							FPS_SCORECARD,
							1,
							0
						),
					}}
				>
					
					{restrictString(ground,50) }
				</HeaderCopy>
			</Ground>
			<Round>
				<HeaderCopy
					THEME={THEME}
					fontFamily={fontFamily}
					style={{
						color: getContrastColor(darkenColor(props.THEME.secondary)),
						clipPath: FromTopToBottom(30, 'Slow'),
						opacity: interpolateOpacityByFrame(
							frame,
							FPS_SCORECARD - 30,
							FPS_SCORECARD,
							1,
							0
						),
					}}
				>
					{round}
				</HeaderCopy>
			</Round>
		</HeaderContainerStyles>
	);
};
