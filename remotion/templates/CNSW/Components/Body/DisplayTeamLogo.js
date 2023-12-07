import styled from 'styled-components';
import {ImageWithFallback} from '../Common/ImageWithFallback';
import {interpolate, useCurrentFrame} from 'remotion';
import {interpolateOpacityByFrame} from '../../../../Animation/interpolate';
import { EraseToMiddleFromTop } from '../../../../Animation/ClipWipe';

const LogoHolder = styled.div`
	margin: -1.8em 0 0 0em;
	position: absolute;
	z-index: 100;
`;

const generateLogoStyle = (FPS_SCORECARD) => {
	const frame = useCurrentFrame();
	const translateX = interpolate(frame, [7, 30], [-15, 0], {
		extrapolateRight: 'clamp',
	});
	return {
		left: 0,
		transform: `translateY(${translateX}px)`,
		opacity: interpolateOpacityByFrame(frame, 7, 30, 0, 1),
		clipPath: EraseToMiddleFromTop(FPS_SCORECARD-30, 'Slow'),
	};
};

export const DisplayTeamLogo = ({logoUrl, imgStyles, FPS_SCORECARD}) => (
	<LogoHolder style={generateLogoStyle(FPS_SCORECARD)}>
		<ImageWithFallback
			src={logoUrl}
			fallbackSrc="https://fallback.url/image.png"
			style={{
				...imgStyles,
				borderRadius: '100%',
				height: '90px',
				width: '90px',
				objectFit: 'cover',
			}}
		/>
	</LogoHolder>
);
