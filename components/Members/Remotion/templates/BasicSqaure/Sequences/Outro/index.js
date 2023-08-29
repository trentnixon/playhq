import {Sequence, Series, Img} from 'remotion';
import styled from 'styled-components';

import {useCurrentFrame} from 'remotion';

import {SpringToFrom} from '../../../../Animation/RemotionSpring';
import {interpolateOpacityByFrame} from '../../../../Animation/interpolate';
import {
	FromLeftToRight,
	FromTopToBottom,
} from '../../../../Animation/ClipWipe';
import {getContrastColor, darkenColor} from '../../../../utils/colors';
import {SponsorRows} from './SponsorRows';

export const OutroSequenceFrame = ({theme, fontFamily, DATA, FPS}) => {
	const frame = useCurrentFrame();
	return (
		<Sequence>
			<Series>
				<Series.Sequence durationInFrames={FPS} layout="none">
					<SponsorOuterContainer>
						<SponsorIntroContainer>
							<IntroCopy
								fontFamily={fontFamily}
								frame={frame}
								FPS={FPS}
								theme={theme}
							/>
						</SponsorIntroContainer>
						<SponsorLogoContainer
							style={{
								clipPath: FromLeftToRight(15, 'Wobbly'),
								opacity: interpolateOpacityByFrame(frame, FPS - 15, FPS, 1, 0),
							}}
						/>

						<SponsorRows
							DATA={DATA}
							fontFamily={fontFamily}
							theme={theme}
							FPS={FPS}
						/>
					</SponsorOuterContainer>

					<ClubLogo
						src={DATA.VIDEOMETA.Club.Logo}
						fontFamily={fontFamily}
						frame={frame}
						FPS={FPS}
					/>
					<ClubNameContainer>
						<ClubNameComponent
							name={DATA.VIDEOMETA.Club.Name}
							fontFamily={fontFamily}
							frame={frame}
							FPS={FPS}
							theme={theme}
						/>
					</ClubNameContainer>
				</Series.Sequence>
			</Series>
		</Sequence>
	);
};

const IntroCopy = ({fontFamily, frame, FPS, theme}) => (
	<SponsorsIntroCopy
		style={{
			fontFamily,
			clipPath: FromTopToBottom(15, 'Wobbly'),
			color: getContrastColor(darkenColor(theme.primary)),
			opacity: interpolateOpacityByFrame(frame, FPS - 15, FPS, 1, 0),
		}}
	>
		Made possible by our Sponsors
	</SponsorsIntroCopy>
);

const ClubLogo = ({src, fontFamily, frame, FPS}) => (
	<LogoContainer
		style={{
			fontFamily,
			transform: `scale(${SpringToFrom(
				25,
				0,
				1,
				'Wobbly'
			)}) scale(${SpringToFrom(FPS - 15, 1, 0, 'Slow')})`,
		}}
	>
		<Img src={src} width="100%" />
	</LogoContainer>
);

const ClubNameComponent = ({name, fontFamily, frame, FPS, theme}) => (
	<ClubName
		style={{
			fontFamily,
			clipPath: FromTopToBottom(25, 'Wobbly'),
			color: getContrastColor(darkenColor(theme.primary)),
			opacity: interpolateOpacityByFrame(frame, FPS - 15, FPS, 1, 0),
		}}
	>
		{name}
	</ClubName>
);
// Sponsors
const SponsorOuterContainer = styled.div`
	z-index: 2000;
`;
const SponsorIntroContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 133px;
	left: 0px;
	top: 40px;
`;
const SponsorsIntroCopy = styled.h1`
	font-weight: 400;
	font-size: 3em;
	line-height: 1em;
	text-align: center;
	text-transform: uppercase;
	margin: 0;
`;

const SponsorLogoContainer = styled.div`
	position: absolute;
	width: 1246px;
	height: 493px;
	left: 97px;
	top: 479px;
`;

const LogoContainer = styled.div`
	position: absolute;
	width: 150px;
	height: 150px;
	left: 653px;
	bottom: 80px;
	z-index: 2000;
	border-radius: 1000px;
`;

const ClubNameContainer = styled.div`
	position: absolute;
	width: 100%;
	left: 0;
	bottom: 10px;
	z-index: 2000;
`;

const ClubName = styled.h1`
	font-weight: 400;
	font-size: 3em;
	margin: 0;
	padding: 0;
	line-height: 1em;
	text-align: center;
	letter-spacing: -0.015em;
	text-transform: uppercase;
`;
