import styled from 'styled-components';
import {
	darkenColor,
	getContrastColor,
	getForegroundColor,
	lightenColor,
	setOpacity,
} from '../../../../../utils/colors';
import {Img, useCurrentFrame} from 'remotion';
import {interpolateOpacityByFrame} from '../../../../../Animation/interpolate';
import {FromLeftToRight} from '../../../../../Animation/ClipWipe';
import useImageDimensions from '../../../../../hooks/useImageDimensions';
import {useState} from 'react';
import {ImageWithFallback} from '../../../Components/Common/ImageWithFallback';
import {restrictString} from '../../../../../utils/copy';
import {SpringToFrom} from '../../../../../Animation/RemotionSpring';

const LadderPositionContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-content: center;
	align-items: center;
	margin: 2px auto;
	padding: 5px 10px;
	width: 100%;
	height: ${(props) => props.Height}px;
	background-color: white;
	font-family: ${(props) => props.fontFamily};
	background-color: ${(props) => props.bgColor};
`;

const MetaContainer = styled.div`
	background-color: ${(props) => props.bgColor};
	width: 30%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 5px 0;
`;
const ImgContainer = styled.div``;

const Name = styled.span`
	font-size: 1.6em;
	font-weight: 400;
	color: ${(props) => props.color};
	width: 60%;
	margin-left: 10px;
`;

const Performance = styled.span`
	font-size: 1.4em;
	font-weight: 400;
	color: ${(props) => props.color};
	text-align: center;
	max-width: 20%;
	min-width: 20%;
`;

export const LadderPosition = (props) => {
	const {
		LadderItem,
		THEME,
		fontFamily,
		LADDERINT,
		isTeam,
		FPS_LADDER,
		Ladder,
		TemplateVariation,
	} = props;
	const {TIE, L, W, P, position, PTS, teamName, teamLogo} = LadderItem;
	const frame = useCurrentFrame();
	const NumTeams = Ladder.League.length + 1;
	//console.log(LadderItem);
	const useTHEMECOLOR = isTeam ? THEME.secondary : lightenColor(THEME.primary);

	const ContainerHeight = 950;
	const IMGSIZING = [
		ContainerHeight / NumTeams / 1.5,
		ContainerHeight / NumTeams / 1.5,
		ContainerHeight / NumTeams / 1.5,
	];
	const TemLogoStyles = useImageDimensions(teamLogo, IMGSIZING);

	return (
		<LadderPositionContainer
			style={{
				borderRadius: TemplateVariation.borderRadius,
				width: `${SpringToFrom(LADDERINT * 1, 0, 100, 'Wobbly')}%`,
				paddingLeft: `${SpringToFrom(LADDERINT * 1, 0, 10, 'Wobbly')}px`,
				paddingRight: `${SpringToFrom(LADDERINT * 1, 0, 10, 'Wobbly')}px`,
				/* clipPath: FromLeftToRight(30 + INT * 3, 'Slow'), */
				opacity: interpolateOpacityByFrame(
					frame,
					FPS_LADDER - 30,
					FPS_LADDER,
					1,
					0
				),
			}}
			fontFamily={fontFamily}
			bgColor={useTHEMECOLOR}
			Height={ContainerHeight / NumTeams - 4}
		>
			<ImgContainer
				style={{
					width: `${ContainerHeight / NumTeams / 1.5}px`,
					textAlign: 'center',
					opacity: interpolateOpacityByFrame(frame, LADDERINT * 2, LADDERINT * 2 + 30, 0, 1),
				}}
			>
				<ImageWithFallback
					fallbackSrc="https://fixtura.s3.ap-southeast-2.amazonaws.com/Default_ICON_171b58a21b.png" // Replace with your fallback image URL
					src={teamLogo}
					style={{...TemLogoStyles, borderRadius: '100%'}}
				/>
			</ImgContainer>
			<Name
				color={getContrastColor(useTHEMECOLOR)}
				style={{clipPath: FromLeftToRight(30 + LADDERINT * 3, 'Slow')}}
			>
				{position}. {restrictString(teamName, 38)}
			</Name>
			<MetaContainer bgColor={darkenColor(THEME.primary)} style={{clipPath: FromLeftToRight(15 + LADDERINT * 2, 'Slow')}}>
				<Performance
					color={getContrastColor(THEME.primary)}
					style={{clipPath: FromLeftToRight(30 + LADDERINT * 3, 'Slow')}}
				>
					{P}
				</Performance>
				<Performance
					color={getContrastColor(THEME.primary)}
					style={{clipPath: FromLeftToRight(30 + LADDERINT * 3, 'Slow')}}
				>
					{W}
				</Performance>
				<Performance
					color={getContrastColor(THEME.primary)}
					style={{clipPath: FromLeftToRight(30 + LADDERINT * 3, 'Slow')}}
				>
					{L}
				</Performance>
				<Performance
					color={getContrastColor(THEME.primary)}
					style={{clipPath: FromLeftToRight(30 + LADDERINT * 3, 'Slow')}}
				>
					{TIE}
				</Performance>
				<Performance
					color={getContrastColor(THEME.primary)}
					style={{clipPath: FromLeftToRight(30 + LADDERINT * 3, 'Slow')}}
				>
					{PTS}
				</Performance>
			</MetaContainer>
		</LadderPositionContainer>
	);
};
