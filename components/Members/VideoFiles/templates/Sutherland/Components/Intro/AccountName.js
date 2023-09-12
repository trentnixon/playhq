import { useCurrentFrame } from "remotion";
import { FromTopToBottom } from "../../../../Animation/ClipWipe";
import { interpolateOpacityByFrame } from "../../../../Animation/interpolate";
import { getContrastColor } from "../../../../utils/colors";
import styled from "styled-components";

export const AccountName = ({ theme, DATA, FPS}) => {
	const frame = useCurrentFrame();
	return (
		<ClubNameContainer>
			<ClubName
				style={{
					fontFamily:'Anton',
					clipPath: FromTopToBottom(7, 'Wobbly'),
					color: getContrastColor(theme.primary),
					opacity: interpolateOpacityByFrame(frame, FPS - 30, FPS - 15, 1, 0),
				}}
			>
				{DATA.VIDEOMETA.Club.Name}
			</ClubName>
		</ClubNameContainer>
	);
};

const ClubNameContainer = styled.div`
	z-index: 2000;
	display: flex;
	align-items: flex-start;
`;

const ClubName = styled.h1`
	font-weight: 900;
	font-size: 4em;
	margin: 0px;
	padding: 0;
	line-height: 1.1em;
	text-align: left;
	letter-spacing: 0.05em;
	text-transform: uppercase;

`;