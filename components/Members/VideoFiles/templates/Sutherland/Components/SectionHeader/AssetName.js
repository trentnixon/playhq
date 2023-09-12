import styled from 'styled-components';
import {FromMiddle, FromTopToBottom} from '../../../../Animation/ClipWipe';
import {interpolateOpacityByFrame} from '../../../../Animation/interpolate';
import {calculateLetterSpacing} from '../../../../utils/copy';
import {useCurrentFrame} from 'remotion';

export const AssetName = ({THEME, FPS_MAIN, Name}) => {
	const frame = useCurrentFrame();
	return (
		<>
			<VideoTitle
				style={{
					color: THEME.secondary,
					fontFamily: 'Hurricane',
					letterSpacing: `0px`,
					clipPath: FromMiddle(7, 'Wobbly'),
					opacity: interpolateOpacityByFrame(
						frame,
						FPS_MAIN - 30,
						FPS_MAIN,
						1,
						0
					),
				}}
			>
				{Name[0]}
			</VideoTitle>
			<VideoCategory
				style={{
					color: THEME.secondary,
					
					fontFamily: 'Hurricane',
					letterSpacing: `${calculateLetterSpacing(
						1220,
						100,
						'Run-Scorers'
					)}px`,
					clipPath: FromTopToBottom(15, 'Slow'),
					opacity: interpolateOpacityByFrame(
						frame,
						FPS_MAIN - 30,
						FPS_MAIN,
						1,
						0
					),
				}}
			>
				{Name[1]}
			</VideoCategory>
		</>
	);
};

const VideoTitle = styled.h1`
	width: 100%;
	font-weight: 400;
	font-size: 8em;
	margin: 20px 0 10px 0;
	padding: 0;
	line-height: 0.8em;
	text-align: left;
	letter-spacing: -0.02em;
	text-transform: uppercase;

	z-index: 2000;
`;
const VideoCategory = styled.h1`
	width: 100%;
	font-weight: 400;
	font-size: 4em;
	margin: 0;
	padding: 0;
	line-height: 0.8em;
	text-align: left;
	letter-spacing: -0.02em;
	text-transform: uppercase;

	z-index: 2000;
`;
