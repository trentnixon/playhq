import { Img } from "remotion";
import { EraseToMiddleFromTop } from "../../../../Animation/ClipWipe";
import { SpringToFrom } from "../../../../Animation/RemotionSpring";
import { getContrastColor } from "../../../../utils/colors";
import styled from "styled-components";

export const PrincipalSponsor = ({fontFamily, FPS, DATA, theme}) => {
	const getPrimarySponsor = (sponsorList) => {
		console.log(sponsorList);
		return sponsorList?.find((sponsor) => sponsor.isPrimary === true);
	};
	const PrincipalSponsorIs = getPrimarySponsor(DATA.VIDEOMETA.Club.Sponsors);

	if (!PrincipalSponsorIs) return false;
	return (
		<PrincipalLogo
			style={{
				transform: `translateY(${SpringToFrom(0, 300, 0, 'Wobbly')}px)`,
				clipPath: EraseToMiddleFromTop(FPS - 20, 'Slow'),
			}}
		>
			<PrincipalLogoInner>
				<h1
					style={{
						fontFamily,
						textAlign: 'right',
						fontSize: '3em',
						lineHeight: '1em',
						fontWeight: '400',
						width: '100%',
						margin: '0 30px 0 0',
						fontFamily: 'Anton',
						padding: 0,
						color: getContrastColor(theme.primary),
					}}
				>
					{getPrimarySponsor(DATA.VIDEOMETA.Club.Sponsors)?.Name}
				</h1>
				<h1
					style={{
						fontFamily,
						textAlign: 'right',
						fontFamily: 'Anton',
						fontSize: '2.2em',
						lineHeight: '1em',
						fontWeight: '400',
						width: '100%',
						margin: '0 30px 0 0',
						padding: 0,
						color: getContrastColor(theme.primary),
					}}
				>
					{getPrimarySponsor(DATA.VIDEOMETA.Club.Sponsors).Tagline}
				</h1>
			</PrincipalLogoInner>
			<PrincipalLogoImg>
				<Img
					src={getPrimarySponsor(DATA.VIDEOMETA.Club.Sponsors).Logo}
					height="140px"
				/>
			</PrincipalLogoImg>
		</PrincipalLogo>
	);
};

const PrincipalLogo = styled.div`
	position: absolute;
	height: 200px;
	width: 100%;
	left: 0px;
	bottom: 5px;

	z-index: 2000;
	flex-direction: row;
	justify-content: center;
	display: flex;
	align-items: center;
`;

const PrincipalLogoImg = styled.div`
	flex-direction: column;
	justify-content: start;
	display: flex;
	align-items: start;
	width: auto;
`;const HeaderContainerStyles = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 60px;
padding: 0 10px;
margin-top: 50px;
background-color: ${(props) => darkenColor(props.THEME.secondary)};
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
width: 70%;
`;

const Round = styled(HeaderCopy)`
font-size: 1.4em;
width: 15%;
text-align: right;
`;

const PrincipalLogoInner = styled.div`
	flex-direction: column;
	justify-content: center;
	display: flex;
	align-items: center;
	width: auto;
`;

export const PrincipalSponsorAlwaysShow = ({fontFamily, FPS, DATA, theme}) => {
	const getPrimarySponsor = (sponsorList) => {
		console.log(sponsorList);
		return sponsorList?.find((sponsor) => sponsor.isPrimary === true);
	};
	const PrincipalSponsorIs = getPrimarySponsor(DATA.VIDEOMETA.Club.Sponsors);

	if (!PrincipalSponsorIs) return false;
	return (
		<PrincipalLogo>
			<PrincipalLogoInner>
				<h1
					style={{
						fontFamily,
						textAlign: 'right',
						fontSize: '2.5em',
						lineHeight: '1em',
						fontWeight: '400',
						width: '100%',
						margin: '0 30px 0 0',
						padding: 0,
						color: getContrastColor(theme.primary),
					}}
				>
					{getPrimarySponsor(DATA.VIDEOMETA.Club.Sponsors)?.Name}
				</h1>
				<h1
					style={{
						fontFamily,
						textAlign: 'right',
						fontSize: '2em',
						lineHeight: '1em',
						fontWeight: '400',
						width: '100%',
						margin: '0 30px 0 0',
						padding: 0,
						color: getContrastColor(theme.primary),
					}}
				>
					{getPrimarySponsor(DATA.VIDEOMETA.Club.Sponsors).Tagline}
				</h1>
			</PrincipalLogoInner>
			<PrincipalLogoImg>
				<Img
					src={getPrimarySponsor(DATA.VIDEOMETA.Club.Sponsors).Logo}
					height="120px"
				/>
			</PrincipalLogoImg>
		</PrincipalLogo>
	);
};