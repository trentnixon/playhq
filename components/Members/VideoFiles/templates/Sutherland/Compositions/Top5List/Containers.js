import styled from 'styled-components';
import {useCurrentFrame} from 'remotion';
import {interpolateOpacityByFrame} from '../../../../Animation/interpolate';
import {SpringToFrom} from '../../../../Animation/RemotionSpring';
import {darkenColor, setOpacity} from '../../../../utils/colors';

const PlayerROW = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
	margin: 6% 1% 1%;

	border-radius: 5px;
	border: 2px solid rgba(255, 255, 255, 0.1);
	background: rgba(255, 255, 255, 0.09);
	backdrop-filter: blur(20px);

	padding: 5px;
`;

const LogoBox = styled.div`
	position: absolute;
	top: 0;
	left: 0;
`;

export const PlayerPerformance = (props) => {
	const {THEME, i, FPS_MAIN} = props;
	const frame = useCurrentFrame();
	return (
		<PlayerROW
			style={{
                borderRight:`5px solid ${THEME.primary}`,
				width: i === 0 ? '60%' : '46%',
				backgroundColor: i === 0 ? setOpacity(THEME.secondary,0.1)  : setOpacity(THEME.primary,0.1),
				opacity: interpolateOpacityByFrame(
					frame,
					15 * (5 - i + 1),
					40 * (5 - i + 1),
					0,
					1
				),
				transform: `translateY(${SpringToFrom(
					15 * (5 - i + 1),
					i === 0 ? -1440 : 1440,
					0,
					'Wobbly'
				)}px) translateY(${SpringToFrom(
					FPS_MAIN - 30 + i,
					0,
					i === 0 ? -1440 : 1440,
					'Wobbly'
				)}px)`,
			}}
		>
			{props.children}
		</PlayerROW>
	);
};

export const TeamLogoBox = (props) => {
	const {THEME, i} = props;
	return <LogoBox style={{}}>{props.children}</LogoBox>;
};
