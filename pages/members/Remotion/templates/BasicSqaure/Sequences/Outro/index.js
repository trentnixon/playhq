import {Sequence, AbsoluteFill, Series, Video, Img} from 'remotion';
import styled from 'styled-components';

import {useCurrentFrame} from 'remotion';

import {SpringToFrom} from '../../../../Animation/RemotionSpring';
import {interpolateOpacityByFrame} from '../../../../Animation/interpolate';
import {
	EraseFromMiddle,
	FromLeftToRight,
	FromTopToBottom,
} from '../../../../Animation/ClipWipe';
import {
	getContrastColor,
	lightenColor,
	darkenColor,
} from '../../../../utils/colors';

const VIDEO = {
	mixBlendMode: 'luminosity',
	opacity: 0.1,
};

export const OutroSequenceFrame = ({theme, fontFamily}) => {
	const frame = useCurrentFrame();
	return (
		<>
			<Sequence>
				<Series>
					<Series.Sequence durationInFrames={90} layout="none">
						<SponsorpOuterContainer>
							<SponsorIntroContainer>
								<SponsorsIntroCopy 
                style={{
                  fontFamily,
                  clipPath: FromTopToBottom(15, 'Wobbly'),
                  opacity: interpolateOpacityByFrame(frame, 55, 65, 1, 0),
                }}>
									Made possible by our Sponsors
								</SponsorsIntroCopy>
							</SponsorIntroContainer>
							<SponsorLogoContainer
              style={{
                clipPath: FromLeftToRight(15, 'Wobbly'),
                opacity: interpolateOpacityByFrame(frame, 55, 65, 1, 0),
              }}>
								<Img />
							</SponsorLogoContainer>

							<SponsorsNameContianer>
								<SponsorsName
                style={{
                  fontFamily,
                  clipPath: FromTopToBottom(25, 'Wobbly'),
                  opacity: interpolateOpacityByFrame(frame, 55, 65, 1, 0),
                }}
                >Sponsor Name</SponsorsName>
							</SponsorsNameContianer>
						</SponsorpOuterContainer>

						<LogoContainer
							style={{
								fontFamily,
								backgroundColor: getContrastColor(darkenColor(theme.primary)),
								transform: `scale(${SpringToFrom(
									25,
									0,
									1,
									'Wobbly'
								)}) scale(${SpringToFrom(65, 1, 0, 'Slow')})`,
							}}
						/>
						<ClubNameContainer>
							<ClubName
								style={{
									fontFamily,
									clipPath: FromTopToBottom(25, 'Wobbly'),
									color: getContrastColor(darkenColor(theme.primary)),
									opacity: interpolateOpacityByFrame(frame, 55, 70, 1, 0),
								}}
							>
								Club Name
							</ClubName>
						</ClubNameContainer>
						<SqareBG
							style={{
								backgroundColor: darkenColor(theme.primary),
								height: `${SpringToFrom(0, 0, 1661, 'Wobbly')}px`,
								transform: `translateY(${SpringToFrom(
									0,
									-1920,
									0,
									'Wobbly'
								)}px)`,
								borderLeft: `5px solid ${lightenColor(theme.primary)}`,
								borderRight: `5px solid ${lightenColor(theme.primary)}`,
								clipPath: EraseFromMiddle(65, 'Slow'),
							}}
						/>
					</Series.Sequence>
				</Series>
			</Sequence>
			<AbsoluteFill>
				<Video
					startFrom={0}
					src="https://fixturaassets.s3.ap-southeast-2.amazonaws.com/introBGsequence.mp4"
					style={VIDEO}
				/>
			</AbsoluteFill>
		</>
	);
};

// Sponsors
const SponsorpOuterContainer = styled.div`
	z-index: 2000;
`;
const SponsorIntroContainer = styled.div`
	position: absolute;
	width: 1246px;
	height: 133px;
	left: 97px;
	top: 300px;
`;
const SponsorsIntroCopy = styled.h1`
	font-weight: 400;
	font-size: 80px;
	line-height: 1em;
	text-align: center;
	text-transform: uppercase;
	color: #ffffff;
  margin: 0;
`;

const SponsorLogoContainer = styled.div`
	position: absolute;
	width: 1246px;
	height: 493px;
	left: 97px;
	top: 479px;

	background: #d9d9d9;
`;

const SponsorsNameContianer = styled.div`
	position: absolute;
	width: 1246px;
	height: 132px;
	left: 97px;
	top: 1000px;
  
`;

const SponsorsName = styled.h1`

	font-weight: 400;
	font-size: 80px;
	text-align: center;
	letter-spacing: -0.015em;
	text-transform: uppercase;
  margin: 0;
	color: #ffffff;
`;

// End sponsors

const SqareBG = styled.div`
	position: absolute;
	width: 1246px;
	height: 1661px;
	left: 97px;
	top: 130px;
	z-index: 1000;
	background: #00aeef;
`;

const LogoContainer = styled.div`
	position: absolute;
	width: 273px;
	height: 273px;
	left: 583px;
	top: 1322px;

	z-index: 2000;
	background: #d9d9d9;
	border-radius: 1000px;
`;

const ClubNameContainer = styled.div`
position: absolute;
width: 1246px;
height: 132px;
left: 97px;
top: 1595px;
	z-index: 2000;

`;

const ClubName = styled.h1`
	position: absolute;
	width: 1246px;
	font-weight: 400;
	font-size: 100px;
	margin: 0;
	padding: 0;
	line-height: 1em;
	text-align: center;
	letter-spacing: -0.015em;
	text-transform: uppercase;

	color: #ffffff;
`;
