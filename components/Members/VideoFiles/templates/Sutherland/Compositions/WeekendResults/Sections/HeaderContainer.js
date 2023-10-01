import styled from 'styled-components';
import {getContrastColor, setOpacity} from '../../../../../utils/colors';
import {useCurrentFrame} from 'remotion';
import {interpolateOpacityByFrame} from '../../../../../Animation/interpolate';
import {FromMiddle, FromTopToBottom} from '../../../../../Animation/ClipWipe';
import { restrictString } from '../../../../../utils/copy';

const HeaderContainerStyles = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	height: 100px;

	padding: 5px;
	border-radius: 5px;
	border: 2px solid rgba(255, 255, 255, 0.1);
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(20px);

	position: absolute;
	transform: rotate(270deg);
	transform-origin: top left;
	bottom: -97px;
	left: 0px;
	flex-direction: column;
	width: 485px;
`;

const HeaderCopy = styled.p`
	font-family: ${(props) => props.fontFamily};
	font-style: normal;
	font-weight: 400;
	display: block;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	width: 100%;
	font-size: 1.8em;
	line-height: 1.2em;
	margin: 0;
`;

const HeaderItem = ({
	label,
	width,
	fontFamily,
	primaryColor,
	FPS_SCORECARD,
	frame,
	textAlign,
}) => {
	const commonStyles = {
		color: getContrastColor(primaryColor),
		clipPath: FromTopToBottom(30, 'Slow'),
		opacity: interpolateOpacityByFrame(
			frame,
			FPS_SCORECARD - 30,
			FPS_SCORECARD,
			1,
			0
		),
		textAlign: textAlign,
	};

	return (
		<HeaderCopy style={{...commonStyles, width}} fontFamily={fontFamily}>
			{label}
		</HeaderCopy>
	);
};

export const HeaderContainer = ({
	type,
	round,
	THEME,
	fontFamily,
	FPS_SCORECARD,
	gradeName,
}) => {
	const frame = useCurrentFrame();
	const primaryColor = THEME.primary;

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
			<HeaderItem
				label={restrictString(gradeName ? gradeName:'',30) }
				width="auto"
				fontFamily={fontFamily}
				primaryColor={primaryColor}
				FPS_SCORECARD={FPS_SCORECARD}
				frame={frame}
				textAlign="center"
			/>
			<HeaderItem
				label={type}
				width="auto"
				fontFamily={fontFamily}
				primaryColor={primaryColor}
				FPS_SCORECARD={FPS_SCORECARD}
				frame={frame}
				textAlign="left"
			/>

			{/* <HeaderItem
				label={round}
				width="auto"
				fontFamily={fontFamily}
				primaryColor={primaryColor}
				FPS_SCORECARD={FPS_SCORECARD}
				frame={frame}
				textAlign="center"
			/> */}
		</HeaderContainerStyles>
	);
};
