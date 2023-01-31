import React from 'react';
import styled from 'styled-components';
import {

	useCurrentFrame,

} from 'remotion';

import {SpringToFrom} from '../../../../Animation/RemotionSpring';
import {interpolateOpacityByFrame} from '../../../../Animation/interpolate';
import {EraseToMiddleFromTop, FromMiddle, FromTopToBottom} from '../../../../Animation/ClipWipe';
import {
	getContrastColor,
	lightenColor,
	darkenColor,
} from '../../../../utils/colors';
import {calculateLetterSpacing} from '../../../../utils/copy';

const LogoClubTitleHeader = ({THEME, fontFamily}) => {
	const frame = useCurrentFrame();

	return (
		<>
			<Logo
				style={{
					backgroundColor: getContrastColor(THEME.primary),
					transform: `translateY(${SpringToFrom(0, -100, 0, 'Springy100')}px)`,
					clipPath:EraseToMiddleFromTop(270,'Wobbly'),
				}}
			/>
			<ClubLabel
				style={{
					color: getContrastColor(THEME.primary),
					fontFamily,
					opacity: interpolateOpacityByFrame(frame, 0, 15, 0, 1),
					clipPath:EraseToMiddleFromTop(270,'Wobbly'),
				}}
			>
				Our Club Name
			</ClubLabel>

			<VideoTitle
				style={{
					color: THEME.secondary,
					fontSize: '200px',
					letterSpacing: `0px`,
					fontFamily,
				  clipPath:FromMiddle(7,'Wobbly'),
					opacity: interpolateOpacityByFrame(frame, 270, 300, 1, 0),
				}}
			>
				Leading
			</VideoTitle>
			<VideoCategory
				style={{
					color: THEME.secondary,
					fontFamily,
					fontSize: '100px',
					letterSpacing: `${calculateLetterSpacing(
						1220,
						100,
						'Run-Scorers'
					)}px`,
					clipPath:FromTopToBottom(15,'Slow'),
					opacity: interpolateOpacityByFrame(frame, 270, 300, 1, 0),
				}}
			>
				Run-Scorers
			</VideoCategory>
		</>
	);
};

export default LogoClubTitleHeader

const Logo = styled.div`
	position: absolute;
	width: 210px;
	height: 210px;
	left: 622px;
	top: 50px;
	border-radius: 170px;
`;

const ClubLabel = styled.h1`
position: absolute;
width: 100%;
height: auto;
left: 0px;
top: 260px;
margin:0;
font-style: normal;
font-weight: 300;
font-size: 50px;
line-height: 73px;
text-align: center;
letter-spacing: 0.02em;
text-transform: uppercase;
`;

const VideoTitle = styled.h1`
position: absolute;
	width: 1220px;
	height: auto;
	left: 110px;
	top: 315px;
	margin:0;
	font-weight: 900;
	text-align: center;
	text-transform: uppercase;
	line-height:1em;
`;
const VideoCategory = styled.h1`
position: absolute;
width: 1220px;
height: auto;
left: 110px;
top: 470px;
margin:0;
font-weight: 900;
text-align: center;
text-transform: uppercase;
`;
