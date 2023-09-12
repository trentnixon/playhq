import styled from 'styled-components';
import {SpringToFrom} from '../../../../Animation/RemotionSpring';
import {EraseToMiddleFromTop} from '../../../../Animation/ClipWipe';
import {Img} from 'remotion';
export const HeaderLogo = ({FPS_MAIN, LOGO}) => {
	return (
		<Logo
			style={{
				transform: `translateY(${SpringToFrom(0, -100, 0, 'Springy100')}px)`,
				clipPath: EraseToMiddleFromTop(FPS_MAIN - 30, 'Wobbly'),
			}}
		>
			<Img src={LOGO} width="100%" />
		</Logo>
	);
};

const Logo = styled.div`
	width: 150px;
	height: 150px;
	border-radius: 100%;
`;
