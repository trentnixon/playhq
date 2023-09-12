import styled from 'styled-components';
import {getContrastColor, darkenColor, setOpacity} from '../../../../../utils/colors';
import {useCurrentFrame} from 'remotion';
import {SpringToFrom} from '../../../../../Animation/RemotionSpring';
import {interpolateOpacityByFrame} from '../../../../../Animation/interpolate';
import {
	EraseToMiddleFromTop,
	FromMiddle,
	FromTopToBottom,
} from '../../../../../Animation/ClipWipe';

const HeaderContainerStyles = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 40px;
	border-radius:0.5em;
	padding: 0 10px;
	background-color: ${(props) => setOpacity(darkenColor(props.THEME.secondary),0.7) };
`;

const HeaderCopy = styled.p`
	font-family: ${(props) => props.fontFamily};
	font-style: normal;
	font-weight: 400;
	display: block;
	letter-spacing: -0.015em;
	text-transform: uppercase;
	width: 100%;
`;

const GameType = styled(HeaderCopy)`
	font-size: 1.4em;
	width: 15%;
	font-weight: 900;
`;

const Ground = styled(HeaderCopy)`
	font-size: 1.4em;
	text-align: center;
	width: 60%;
`;

const Round = styled(HeaderCopy)`
	font-size: 1.4em;
	width: 20%;
	text-align: right;
	
`;

export const HeaderContainer = (props) => {
	const {type, ground, round, THEME, fontFamily,gradeName, FPS_SCORECARD} = props;
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
					{gradeName}
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
